// app/api/import-recipe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai'; // Import OpenAI library
import { v2 as cloudinary } from 'cloudinary'; // <-- Added Cloudinary import

// --- Added Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure secure URLs are used
});
// --- End Cloudinary Configuration ---

// Define the expected request body schema (only URL needed now)
const ImportRequestSchema = z.object({
  url: z.string().url({ message: "Invalid URL provided." }),
});

// Define the structure we EXPECT the AI to return in case of SUCCESS
interface ImportedRecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  description?: string;
  imageUrl?: string;
  servings?: string;
  totalTime?: string;
}

// Define a type for the AI error response structure from the prompt
interface ImportErrorData {
    error: string;
}

// Define a type for the potential API error structure from OpenRouter/OpenAI lib
interface ApiErrorResponse {
    error?: {
        message?: string;
        // other potential error fields
    };
    // other potential top-level fields in an error response
}

// Initialize OpenRouter Client
const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Get key from environment
});

// Define the model to use (get from env or default)
// Using Meta Llama 4 Scout (free) based on OpenRouter availability and large context
const modelName = process.env.OPENROUTER_MODEL_NAME || "meta-llama/llama-4-scout";

export async function POST(req: NextRequest) {
  let url: string | undefined = undefined;

  try {
    const body = await req.json();
    const validation = ImportRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid URL provided', details: validation.error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    url = validation.data.url;
    console.log(`[AI_IMPORT_RECIPE] Received request for: ${url}`);

    if (!process.env.OPENROUTER_API_KEY) {
        console.error("[AI_IMPORT_RECIPE] OpenRouter API key not configured.");
        return NextResponse.json({ error: "AI service is not configured." }, { status: 500 });
    }

    // --- Fetch URL Content ---
    let htmlContent: string;
    try {
      console.log(`[AI_IMPORT_RECIPE] Fetching HTML from: ${url}`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
         signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        let errorDetail = `Status: ${response.status} ${response.statusText}`;
        if (response.status === 404) errorDetail = "Page not found (404)";
        if (response.status === 403) errorDetail = "Access forbidden (403)";
        if (response.status >= 500) errorDetail = "Server error on recipe site";
        throw new Error(`Fetch failed: ${errorDetail}`);
      }
      htmlContent = await response.text();
      console.log(`[AI_IMPORT_RECIPE] Fetched HTML (Length: ${htmlContent.length})`);

    } catch (fetchError: unknown) {
        let errorMessage = 'Failed to retrieve the recipe from the provided URL.';
        let errorDetails = '';
        let status = 400;

        if (fetchError instanceof Error) {
            errorDetails = fetchError.message;
            if (fetchError.name === 'AbortError') {
                errorMessage = 'The request to the recipe URL timed out.';
                status = 408;
            } else if (errorDetails.includes('Fetch failed:')) {
                 errorMessage = errorDetails;
            }
        }
        console.error(`[AI_IMPORT_RECIPE] Fetch Error for ${url}: ${errorMessage} ${errorDetails ? '('+errorDetails+')' : ''}`, fetchError);
        return NextResponse.json({ error: errorMessage, details: errorDetails || undefined }, { status });
    }

    // --- Call AI Model ---
    try {
      console.log(`[AI_IMPORT_RECIPE] Sending content to AI model: ${modelName}`);

      const prompt = `
        Analyze the following HTML content from a recipe webpage (${url}).
        Extract the primary recipe details. Provide the output ONLY as a valid JSON object
        adhering strictly to the following structure:
        {
          "title": "The main recipe title (string)",
          "description": "A brief description of the recipe (string, optional)",
          "ingredients": ["An array of strings, each representing one ingredient line (array of strings)"],
          "instructions": ["An array of strings, each representing one instruction step (array of strings)"],
          "imageUrl": "The primary image URL for the recipe (string, optional, absolute URL if possible)",
          "servings": "The recipe yield or number of servings (string, optional, e.g., '4 servings', 'Makes 12')",
          "totalTime": "The total time (prep + cook) if available (string, optional, e.g., '1 hour 30 minutes', 'PT1H30M')"
        }

        If you cannot find a specific field, omit the key or set its value to null (for optional string fields).
        Ensure ingredients and instructions are arrays of strings.
        Focus on the main recipe content and ignore boilerplate, ads, comments, etc.
        If the page doesn't seem to contain a recipe, return a JSON object like: {"error": "No recipe found on page"}.

        HTML Content:
        \`\`\`html
        ${htmlContent.substring(0, 300000)}
        \`\`\`
      `; // Increased substring limit slightly for larger context model

      // Make the API call
      const completion = await openRouter.chat.completions.create({
        model: modelName,
        messages: [
          { role: "system", content: "You are an expert recipe extraction assistant. Your output must be only valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      });

      // --- Check for API-level error object BEFORE accessing choices ---
      const completionResponse = completion as unknown as ApiErrorResponse;
      if (completionResponse.error && completionResponse.error.message) {
          console.error("[AI_IMPORT_RECIPE] API returned error object:", completionResponse.error);
          throw new Error(`AI API Error: ${completionResponse.error.message}`);
      }
      // --- End API error check ---

      // Log the object only if it's not an obvious API error
      console.log("[AI_IMPORT_RECIPE] Full AI Completion Object:", JSON.stringify(completion, null, 2));

      // Now safely attempt to access choices
      const responseText = completion.choices?.[0]?.message?.content; // Added optional chaining on choices
      console.log("[AI_IMPORT_RECIPE] Raw AI Response Text:", responseText);

      if (!responseText) {
        // This might happen if the API returned success but no content (unlikely with JSON mode)
        // Or if the API error check above failed to catch an unusual error format
        throw new Error("AI model returned an empty or invalid response structure.");
      }

      // --- Added Check: Ensure response looks like JSON before parsing ---
      if (!responseText.trim().startsWith('{')) {
        console.error("[AI_IMPORT_RECIPE] AI response does not start with '{', likely not JSON:", responseText);
        throw new Error("AI did not return valid JSON content.");
      }
      // --- End Added Check ---

      // Parse JSON
      let parsedResponse: unknown;
      try {
          parsedResponse = JSON.parse(responseText);
      } catch (_jsonError) {
          console.error("[AI_IMPORT_RECIPE] Failed to parse AI JSON response:", responseText);
          throw new Error("AI returned invalid JSON response.");
      }

      // Type guard for error structure within the AI's generated JSON
      const isErrorResponse = (res: unknown): res is ImportErrorData => {
          return typeof res === 'object' && res !== null && 'error' in res && typeof res.error === 'string';
      };

      if (isErrorResponse(parsedResponse)) {
          throw new Error(`AI indicated failure: ${parsedResponse.error}`);
      }

      // Assert expected structure
      const aiResponseJson = parsedResponse as ImportedRecipeData;

      // Validate mandatory fields
      if (!aiResponseJson.title || !Array.isArray(aiResponseJson.ingredients) || !Array.isArray(aiResponseJson.instructions) || aiResponseJson.ingredients.length === 0 || aiResponseJson.instructions.length === 0) {
        console.warn("[AI_IMPORT_RECIPE] AI response missing mandatory fields or has empty arrays:", aiResponseJson);
        throw new Error("AI failed to extract mandatory recipe fields (title, ingredients, instructions).");
      }

      // --- Process and Upload Image to Cloudinary (if imageUrl exists) ---
      let finalImageUrl = aiResponseJson.imageUrl; // Start with the URL from AI
      if (finalImageUrl && typeof finalImageUrl === 'string' && finalImageUrl.startsWith('http')) {
        console.log(`[AI_IMPORT_RECIPE] Attempting to upload image from: ${finalImageUrl}`);
        try {
          // Ensure Cloudinary is configured
          if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.warn("[AI_IMPORT_RECIPE] Cloudinary credentials missing. Skipping image upload.");
          } else {
            const uploadResult = await cloudinary.uploader.upload(finalImageUrl, {
              folder: "recipe_imports", // Optional: Organize uploads in Cloudinary
              // You could use allowed_formats, transformation, etc. here if needed
            });
            finalImageUrl = uploadResult.secure_url; // Use the new Cloudinary URL
            console.log(`[AI_IMPORT_RECIPE] Successfully uploaded image to Cloudinary: ${finalImageUrl}`);
          }
        } catch (imageError: unknown) {
          console.error(`[AI_IMPORT_RECIPE] Failed to fetch or upload image from ${aiResponseJson.imageUrl}:`, imageError);
          finalImageUrl = undefined; // Clear the image URL if upload failed
        }
      } else {
        // If no valid imageUrl from AI, ensure it's cleared
        finalImageUrl = undefined;
      }

      // Update the response object with the final image URL (Cloudinary or undefined)
      aiResponseJson.imageUrl = finalImageUrl;
      // --- End Image Processing ---

      console.log(`[AI_IMPORT_RECIPE] Successfully parsed recipe from AI for: ${url}`);
      return NextResponse.json({ data: aiResponseJson }, { status: 200 });

    } catch (aiError: unknown) {
      console.error(`[AI_IMPORT_RECIPE] AI Processing Error for ${url}:`, aiError);
      let errorMessage = 'Failed to process recipe data using AI.';
      if (aiError instanceof Error) {
          // Check for more specific error messages
          if (aiError.message.startsWith("AI API Error:") || aiError.message.includes("AI indicated failure") || aiError.message.includes("AI failed to extract") || aiError.message.includes("empty response") || aiError.message.includes("invalid JSON")) {
               errorMessage = aiError.message;
          }
          // TODO: Add more specific checks for OpenAI/OpenRouter error types if needed
          // Example: if (aiError instanceof OpenAI.APIError) { ... }
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

  } catch (error: unknown) {
    const errorUrl = url || 'unknown URL';
    console.error(`[AI_IMPORT_RECIPE_API_ERROR - General] for ${errorUrl}:`, error);
    const message = 'An unexpected internal server error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}