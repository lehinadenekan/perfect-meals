import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
// import { auth } from "@/auth"; // Using v5 style - incorrect based on memory.ts
import { getServerSession } from "next-auth/next"; // Import for v4
import { authOptions } from "@/auth"; // Assuming authOptions are exported from here for v4
import OpenAI from 'openai'; // Import the OpenAI library

// Define the expected input schema using Zod
const generateRecipeSchema = z.object({
  ingredients: z.string().min(3, { message: "Please list at least one ingredient." }),
  excludedIngredients: z.string().nullable().optional(),
  dietaryPreference: z.string().nullable().optional(),
  cuisineType: z.string().nullable().optional(),
  mealType: z.string().nullable().optional(),
});

// Define the expected output structure (matches frontend type)
// Updated Ingredient structure
type IngredientObject = {
  name: string;
  amount: number; // Use 0 if no specific amount
  unit: string; // e.g., "cup", "tsp", "gram", "N/A"
};

// Define the structure for nutrition info (matching frontend)
type NutritionInfo = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  potassium?: number;
  calcium?: number;
  noteworthy_nutrients?: string[];
};

type GeneratedRecipe = {
  title: string;
  ingredients: IngredientObject[]; // Now expects an array of objects
  instructions: string[];
  timeEstimate?: string; // Optional: e.g., "Approx. 45 minutes"
  difficulty?: string; // Optional: e.g., "Easy", "Medium", "Hard"
  nutrition?: NutritionInfo; // Add nutrition field
};

// Configure OpenAI client for OpenRouter
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', // Use env var or fallback
    "X-Title": "SaaS Recipe Generator", // Replace with your app name if desired
  },
});

// Define Zod schema for the nutrition object (all fields optional)
const nutritionSchema = z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    fiber: z.number().optional(),
    sugar: z.number().optional(),
    sodium: z.number().optional(),
    potassium: z.number().optional(),
    calcium: z.number().optional(),
    noteworthy_nutrients: z.array(z.string()).optional()
}).optional(); // The entire nutrition object is optional

// Update Zod schema for validating the AI's JSON output
const aiResponseSchema = z.object({
    title: z.string().min(1),
    ingredients: z.array(z.object({
        name: z.string().min(1),
        amount: z.number(),
        unit: z.string()
    })).min(1),
    instructions: z.array(z.string()).min(1),
    timeEstimate: z.string().optional(),
    difficulty: z.string().optional(),
    nutrition: nutritionSchema // Use the nutrition schema here
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication Check (Using NextAuth v4 style)
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      // Depending on requirements, you might allow unauthenticated users
      // For now, let's require login
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // console.log("User:", session.user.id); // Optional: log user ID

    // 2. Parse and Validate Request Body
    const body = await request.json();
    const validationResult = generateRecipeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input.', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { ingredients, excludedIngredients, dietaryPreference, cuisineType, mealType } = validationResult.data;

    // 3. Construct AI Prompt (Updated for excluded ingredients)
    let prompt = `Generate a recipe that primarily uses the following ingredients: ${ingredients}.`;
    if (excludedIngredients) {
      prompt += ` Please strictly avoid using these ingredients: ${excludedIngredients}.`;
    }
    if (dietaryPreference) {
      prompt += ` The recipe should be ${dietaryPreference}.`;
    }
    if (cuisineType) {
      prompt += ` The recipe should be in the style of ${cuisineType} cuisine.`;
    }
    if (mealType) {
      prompt += ` It should be suitable for ${mealType}.`;
    }
    prompt += ` \n\nPlease format the response strictly as a JSON object with the following keys:
- "title": (string) The name of the recipe.
- "ingredients": (array of objects) Each object must have keys: "name" (string), "amount" (number, use 0 or 1 if not applicable/quantifiable like 'pinch' or 'to taste'), and "unit" (string, e.g., 'cup', 'tsp', 'gram', 'cloves', 'N/A').
- "instructions": (array of strings) The steps to make the recipe.
- "timeEstimate": (string, optional) An estimated total cooking/prep time (e.g., "Approx. 30 minutes").
- "difficulty": (string, optional) A difficulty rating (e.g., "Easy", "Medium", "Hard").
- "nutrition": (object, optional) Estimated nutritional details.

Only return the JSON object, with no additional text, comments, or formatting before or after it. Ensure ingredient details and instructions are clear.`;

    // 4. Call AI Service (OpenRouter - Gemini 2.5 Pro Experimental Free)
    console.log('Calling OpenRouter with prompt...');
    const response = await openrouter.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct:free', // Using the free Mistral model
      messages: [
        { role: 'system', content: 'You are a helpful recipe generator. You will be given ingredients to use, potentially ingredients to exclude, and preferences. You must return a recipe formatted strictly as a JSON object with keys: title, ingredients (array of objects with name, amount, unit), instructions, timeEstimate (optional string), difficulty (optional string), and nutrition (optional object with estimated nutritional details...). Avoid any ingredients specified for exclusion.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000, // Increased max_tokens
    });

    // 5. Process AI Response & Return (Updated Parsing)
    const aiContent = response.choices[0]?.message?.content;
    if (!aiContent) { throw new Error('AI did not return any content.'); }
    console.log("AI Raw Response:", aiContent);

    // --- Clean up potential non-JSON text --- 
    let cleanedContent = aiContent.trim();
    // 1. Handle potential markdown ```json ... ``` blocks
    const jsonMarkdownMatch = cleanedContent.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMarkdownMatch && jsonMarkdownMatch[1]) {
        cleanedContent = jsonMarkdownMatch[1].trim(); // Trim extracted content too
    } else {
        // 2. Fallback: Find the first '{' and the last '}' as a rough boundary
        const firstBrace = cleanedContent.indexOf('{');
        const lastBrace = cleanedContent.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            cleanedContent = cleanedContent.substring(firstBrace, lastBrace + 1);
        } else {
             console.warn("Could not reliably extract JSON object boundaries from AI response.");
             // Proceed with the possibly non-JSON string, parsing will likely fail
        }
    }
    
    // 3. Attempt to fix common syntax error: "value" (extra text) -> "value (extra text)"
    // This specifically targets the error seen with unit: "can" (14 oz)
    try {
        // Regex explanation:
        // "([^"\\\n]*)" : Match and capture a standard JSON string value (handling escaped quotes)
        // \s*\(        : Match optional whitespace and an opening parenthesis
        // ([^)\\]*)     : Match and capture the text inside the parentheses (extra text)
        // \)           : Match the closing parenthesis
        // (?=\s*[,}\]]) : Positive lookahead to ensure it's followed by optional whitespace and then ',', '}', or ']'
        const syntaxFixRegex = /"([^"\\\n]*)"\s*\(([^)\\]*)\)(?=\s*[,}\]])/g;
        cleanedContent = cleanedContent.replace(syntaxFixRegex, '"$1 ($2)"' );
        console.log("Content after syntax fix attempt:", cleanedContent);
    } catch (regexError) {
        console.error("Regex syntax fix failed:", regexError);
        // Continue with the potentially unfixable content
    }
    // --- End cleanup ---

    console.log("Final Cleaned Content for Parsing:", cleanedContent);

    // Define a more specific type for the parsed JSON before preprocessing
    type ParsedJson = {
        ingredients?: Array<Partial<IngredientObject> & { amount?: number | string }>, // Allow amount to be string initially
        nutrition?: Partial<NutritionInfo> & { [key: string]: unknown }, // Allow other string values initially
        [key: string]: unknown; // Allow other properties
    };

    try {
      // Attempt to parse the CLEANED and potentially syntax-fixed JSON string
      const parsedJson: ParsedJson = JSON.parse(cleanedContent);

      // --- Preprocess ingredient amounts before Zod validation ---
      if (parsedJson && Array.isArray(parsedJson.ingredients)) {
        parsedJson.ingredients.forEach((ingredient) => { // No need for 'any' if ParsedJson is typed
          if (ingredient && typeof ingredient.amount === 'string') {
            console.warn(`Replacing string amount "${ingredient.amount}" with 0 for ingredient "${ingredient.name}"`);
            ingredient.amount = 0;
          }
        });
      }
      // --- End ingredient preprocessing ---

      // --- Preprocess nutrition values before Zod validation ---
      if (parsedJson && typeof parsedJson.nutrition === 'object' && parsedJson.nutrition !== null) {
        console.log("Preprocessing nutrition data...");
        const nutritionData = parsedJson.nutrition; // Use inferred type
        for (const key in nutritionData) {
          if (Object.prototype.hasOwnProperty.call(nutritionData, key) && typeof nutritionData[key] === 'string') {
            if (key === 'noteworthy_nutrients') continue;
            const valueStr = nutritionData[key] as string; // Assert as string here
            const numberMatch = valueStr.match(/\d+(\.\d+)?/);
            if (numberMatch) {
              const extractedNumber = parseFloat(numberMatch[0]);
              console.warn(`Replacing string nutrition "${valueStr}" with number ${extractedNumber} for key "${key}"`);
               // Assigning to potentially unknown key, needs type assertion or better typing
              (nutritionData as Record<string, unknown>)[key] = extractedNumber;
            } else {
               console.warn(`Could not extract number from nutrition string "${valueStr}" for key "${key}". Setting to undefined.`);
               (nutritionData as Record<string, unknown>)[key] = undefined;
            }
          }
        }
      }
      // --- End nutrition preprocessing ---

      // Validate the PREPROCESSED JSON against the schema
      const validation = aiResponseSchema.safeParse(parsedJson);

      if (!validation.success) {
        console.error("AI response structure validation failed:", validation.error.flatten());
        console.error("Attempted to parse:", cleanedContent);
        throw new Error('AI response is not in the expected JSON format or structure after cleanup.');
      }

      // Use the validated data
      const generatedRecipe: GeneratedRecipe = validation.data;
      return NextResponse.json(generatedRecipe);

    } catch (parseOrValidationError) {
      console.error("Failed to parse or validate AI response:", parseOrValidationError);
      console.error("Original raw content was:", aiContent);
      console.error("Cleaned content was:", cleanedContent);
      const errorMessage = parseOrValidationError instanceof SyntaxError
        ? 'Failed to parse cleaned AI response as JSON.'
        : 'Cleaned AI response failed structure validation.';
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error("Error in /api/generate-recipe:", error);
    let errorMessage = 'Failed to generate recipe.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Check for specific OpenAI/OpenRouter error types if needed
    // e.g., if (error instanceof OpenAI.APIError) { ... }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 