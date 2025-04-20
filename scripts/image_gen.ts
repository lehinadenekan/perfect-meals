// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const default_api: any;
import path from 'path';
// Assume the recipe data is exported from this file
// OR: Check if it's a default export: import recipes from '../prisma/seed-data/recipes';
// OR: Check the actual export name: import { recipeData as recipes } from '../prisma/seed-data/recipes';
// import { recipes } from '../prisma/seed-data/recipes'; // Keep original for now, user must verify export
// ^^^ ERROR: Module '"../prisma/seed-data/recipes"' has no exported member 'recipes'.
// TODO: Fix this error by:
// 1. Going to 'prisma/seed-data/recipes.ts' and ensuring the array is exported (e.g., `export const recipes = [...]`).
// 2. OR, if it's exported differently (e.g., `export default recipes` or `export const recipeData`), update the import statement below accordingly.
// For now, declare a placeholder to allow the rest of the script to type-check:
// const recipes: Recipe[] = []; // Placeholder - REMOVE THIS once the import is fixed

// Corrected Import:
import { seedRecipes as recipes } from '../prisma/seed-data/recipes';

// --- Type Definitions (Basic Assumptions) ---
// Inferring Recipe type from SeedRecipeRecipe if possible, or keeping basic
// interface Recipe {
//     title: string;
//     instructions?: string[];
//     // Add other expected properties if known
// }
// Assuming SeedRecipeRecipe type is implicitly used now via the import.
// If SeedRecipeRecipe is not defined in the scope of image_gen.ts,
// you might need to explicitly import its type definition as well, e.g.:
// import type { SeedRecipeRecipe as Recipe } from '../prisma/seed-data/recipes';

// --- Wrapper functions for Playwright clarity (Optional but helps readability) ---
async function browser_navigate(args: { url: string }): Promise<void> {
  console.log(`MCP: Navigating to ${args.url}`);
  await default_api.mcp_playwright_mcp_browser_navigate({ url: args.url });
}

async function browser_type(args: { element: string; ref: string; text: string; submit?: boolean }): Promise<void> {
  console.log(`MCP: Typing into ${args.element} (ref ${args.ref})`);
  await default_api.mcp_playwright_mcp_browser_type({
      element: args.element,
      ref: args.ref,
      text: args.text,
      submit: args.submit
  });
}

async function browser_click(args: { element: string; ref: string }): Promise<void> {
  console.log(`MCP: Clicking ${args.element} (ref ${args.ref})`);
  await default_api.mcp_playwright_mcp_browser_click({
      element: args.element,
      ref: args.ref
  });
}

async function browser_wait(args: { time: number }): Promise<void> {
  console.log(`MCP: Waiting for ${args.time} seconds`);
  await default_api.mcp_playwright_mcp_browser_wait({ time: args.time });
}

// --- Main Script Logic ---

const RECIPE_NAME = "Quinoa Buddha Bowl";
const TARGET_IMAGE_DIR = "/Users/lehinadenekan/Desktop/SaaS/public/recipe_step_images";
const USER_DOWNLOADS_DIR = "/Users/lehinadenekan/Downloads"; // Default Downloads directory
const CHATGPT_URL = "https://chatgpt.com/"; // Assuming image gen is available here

// --- !!! IMPORTANT PLACEHOLDERS FOR CHATGPT UI !!! ---
const CHATGPT_PROMPT_INPUT_REF = "prompt-textarea-ref"; // FIXME: Update with actual ref from snapshot
const CHATGPT_GENERATE_BUTTON_REF = "generate-button-ref"; // FIXME: Update with actual ref from snapshot
const CHATGPT_DOWNLOAD_BUTTON_REF = "download-button-ref"; // FIXME: Update with actual ref from snapshot
const CHATGPT_GENERATION_WAIT_SECONDS = 30; // Adjust as needed
const CHATGPT_DOWNLOAD_WAIT_SECONDS = 15; // Adjust as needed (allow time for file write)


async function findLatestFileInDownloads(): Promise<string | null> {
  console.log(`Checking directory: ${USER_DOWNLOADS_DIR}`);
  try {
    const listResult = await default_api.mcp_filesystem_list_directory({ path: USER_DOWNLOADS_DIR });
    const files = listResult.results; // Adjust based on actual tool output format

    if (!files || files.length === 0) {
      console.log("Downloads directory is empty.");
      return null;
    }

    let latestFile: string | null = null;
    let latestModTime = 0;

    for (const fileEntry of files) {
      let filePath = '';
      if (typeof fileEntry === 'string') {
         if (fileEntry.startsWith('[FILE]')) {
            const fileName = fileEntry.split(' ').slice(1).join(' ');
             filePath = path.join(USER_DOWNLOADS_DIR, fileName);
         } else {
             continue;
         }
      } else if (typeof fileEntry === 'object' && fileEntry !== null && fileEntry.type === 'file') {
         filePath = path.join(USER_DOWNLOADS_DIR, fileEntry.name);
      } else {
          console.warn("Unrecognized file entry format:", fileEntry);
          continue;
      }

      try {
        const fileInfo = await default_api.mcp_filesystem_get_file_info({ path: filePath });
        // Assuming fileInfo.results contains { modificationTime: number } (timestamp)
        const modTime = fileInfo.results.modificationTime; // Adjust based on actual tool output format

        if (modTime > latestModTime) {
          latestModTime = modTime;
          latestFile = filePath;
        }
      } catch (infoError) {
        console.warn(`Could not get info for file ${filePath}:`, infoError);
      }
    }

    if (latestFile) {
      console.log(`Found latest file: ${latestFile} (Modified: ${new Date(latestModTime).toISOString()})`);
      const timeDiffSeconds = (Date.now() - latestModTime) / 1000;
      if (timeDiffSeconds > 60) {
          console.warn(`Latest file found (${latestFile}) seems too old (${timeDiffSeconds.toFixed(1)}s). Download might have failed or file finding logic is flawed.`);
          return null;
      }
    } else {
        console.log("Could not determine the latest file in downloads.");
    }

    return latestFile;
  } catch (error) {
    console.error(`Error listing downloads directory ${USER_DOWNLOADS_DIR}:`, error);
    return null;
  }
}


async function generateRecipeImages() {
  console.log(`Starting image generation for recipe: ${RECIPE_NAME}`);

  // 1. Find the recipe data
  // Use the correctly imported 'recipes' alias (originally seedRecipes)
  // The type annotation might be unnecessary now if SeedRecipeRecipe is known
  const recipe = recipes.find((r) => r.title === RECIPE_NAME); 
  if (!recipe) {
    console.error(`Error: Recipe "${RECIPE_NAME}" not found in seed data or recipes variable is undefined.`);
    return;
  }
  if (!recipe.instructions || recipe.instructions.length === 0) {
    console.error(`Error: No instructions found for recipe "${RECIPE_NAME}".`);
    return;
  }
  console.log(`Found ${recipe.instructions.length} instruction steps.`);

  // 2. Ensure target directory exists
  try {
    console.log(`Ensuring directory exists: ${TARGET_IMAGE_DIR}`);
    // Use direct API call for filesystem
    await default_api.mcp_filesystem_create_directory({ path: TARGET_IMAGE_DIR });
  } catch (error) {
    console.error(`Error creating target directory ${TARGET_IMAGE_DIR}:`, error);
    return;
  }

  // 3. Navigate to ChatGPT (do this once)
  try {
    console.log(`Navigating to ${CHATGPT_URL}...`);
    await browser_navigate({ url: CHATGPT_URL }); // Use wrapper
    await browser_wait({ time: 5 }); // Use wrapper
    console.log("Navigation complete.");
  } catch (error) {
    console.error(`Error navigating to ${CHATGPT_URL}:`, error);
    return;
  }

  // 4. Loop through instructions and generate images
  for (let i = 0; i < recipe.instructions.length; i++) {
    const stepIndex = i + 1;
    const instruction = recipe.instructions[i];
    console.log(`\n--- Processing Step ${stepIndex} ---`);
    console.log(`Instruction: ${instruction}`);

    // --- IMPORTANT: Get a fresh browser snapshot BEFORE interacting for refs ---
    // await default_api.mcp_playwright_mcp_browser_snapshot({ random_string: 'get fresh state' });
    // Then use the refs from the *new* snapshot for the type/click calls below.

    const prompt = `Generate a photorealistic image illustrating this cooking step for a Quinoa Buddha Bowl: "${instruction}"`;
    const baseFilename = `quinoa-buddha-bowl-step-${stepIndex}`;
    const finalFilename = `${baseFilename}.png`;
    const finalPath = path.join(TARGET_IMAGE_DIR, finalFilename);

    try {
      // a. Enter prompt
      console.log("Entering prompt...");
      await browser_type({ // Use wrapper
        element: "ChatGPT Prompt Input",
        ref: CHATGPT_PROMPT_INPUT_REF, // FIXME: Get actual ref from snapshot
        text: prompt,
        submit: false
      });
      await browser_wait({ time: 2 }); // Use wrapper

      // b. Click generate button
      console.log("Clicking generate button...");
      await browser_click({ // Use wrapper
        element: "Generate Image Button",
        ref: CHATGPT_GENERATE_BUTTON_REF // FIXME: Get actual ref from snapshot
      });

      // c. Wait for generation
      console.log(`Waiting ${CHATGPT_GENERATION_WAIT_SECONDS} seconds for image generation...`);
      await browser_wait({ time: CHATGPT_GENERATION_WAIT_SECONDS }); // Use wrapper

      // d. Click download button
      console.log("Clicking download button...");
      // --- IMPORTANT: Get a fresh browser snapshot BEFORE clicking download ---
      // await default_api.mcp_playwright_mcp_browser_snapshot({ random_string: 'get state before download' });
      // Then use the ref from the *new* snapshot for the click call below.
      await browser_click({ // Use wrapper
        element: "Download Image Button",
        ref: CHATGPT_DOWNLOAD_BUTTON_REF // FIXME: Get actual ref from snapshot
      });

      // e. Wait for download
      console.log(`Waiting ${CHATGPT_DOWNLOAD_WAIT_SECONDS} seconds for download...`);
      await browser_wait({ time: CHATGPT_DOWNLOAD_WAIT_SECONDS }); // Use wrapper

      // f. Find the latest downloaded file
      const downloadedFilePath = await findLatestFileInDownloads();
      if (!downloadedFilePath) {
          throw new Error("Could not reliably determine the downloaded file path.");
      }
      console.log(`Found downloaded file: ${downloadedFilePath}`);

      // g. Move/Rename the downloaded file
      console.log(`Moving downloaded file to ${finalPath}...`);
      // Use direct API call for filesystem
      await default_api.mcp_filesystem_move_file({ source: downloadedFilePath, destination: finalPath });

      console.log(`Successfully generated and saved: ${finalFilename}`);

    } catch (error) {
      console.error(`Error processing step ${stepIndex}:`, error);
      console.log("Attempting to continue with the next step...");
      await browser_wait({ time: 5 }); // Use wrapper
    }

    // Add a small delay between steps
    await browser_wait({ time: 3 }); // Use wrapper
  }

  console.log("\n--- Image generation process finished ---");
}

// Execute the main function
generateRecipeImages().catch(console.error);
