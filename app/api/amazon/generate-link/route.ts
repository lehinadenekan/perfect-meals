// app/api/amazon/generate-link/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define the expected shape of the request body using Zod for validation
const RequestBodySchema = z.object({
  ingredients: z.array(z.string().min(1, "Ingredient name cannot be empty")).min(1, "Ingredients list cannot be empty"),
});

// Define an interface based on the Zod schema for type safety
interface RequestBody {
  ingredients: string[];
}

export async function POST(request: Request) {
  console.log("Received request for Amazon link generation");

  let requestBody: RequestBody;
  try {
    const json = await request.json();
    requestBody = RequestBodySchema.parse(json);
    console.log("Request body parsed successfully:", requestBody);
  } catch (error) {
    console.error("Error parsing request body:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to parse request body" }, { status: 400 });
  }

  const { ingredients } = requestBody;
  const amazonAssociateTag = process.env.AMAZON_ASSOCIATES_TAG;

  if (!amazonAssociateTag) {
      console.error("AMAZON_ASSOCIATES_TAG environment variable is not set.");
      return NextResponse.json({ error: 'Server configuration error: Amazon Associates Tag is missing.' }, { status: 500 });
  }

  try {
    console.log("Looking up ingredient mappings for:", ingredients);
    // Query the database to find mappings for the provided ingredients
    // We look for mappings where 'ingredientQuery' is similar to the input ingredient names
    // Note: This simple 'in' query might need refinement for better matching (e.g., fuzzy search, lowercasing)
    const mappings = await prisma.ingredientMapping.findMany({
      where: {
        ingredientQuery: {
          in: ingredients.map(name => name.toLowerCase()), // Normalize input for matching
          mode: 'insensitive', // Case-insensitive matching
        }
      },
      select: {
        ingredientQuery: true, // Select the original query for mapping back if needed
        amazonSearchTerm: true, // Select the term to use in the Amazon URL
      }
    });

    console.log("Found mappings:", mappings);

    // --- Implement Fallback Logic ---

    // Create a map for quick lookup of found mappings (lowercase query -> amazonSearchTerm)
    const mappingMap = new Map<string, string>();
    mappings.forEach(mapping => {
        mappingMap.set(mapping.ingredientQuery.toLowerCase(), mapping.amazonSearchTerm);
    });

    // Process requested ingredients: use mapped term or fallback
    const finalSearchTerms: string[] = ingredients.map(originalIngredient => {
        const lowerCaseIngredient = originalIngredient.toLowerCase();
        const mappedTerm = mappingMap.get(lowerCaseIngredient);

        if (mappedTerm) {
            // Use the specific term from our mapping table
            return mappedTerm;
        } else {
            // Fallback: Use the original ingredient name (could add more cleaning later)
            // Log that a fallback was used (important for Phase 5)
            // Add a distinct prefix for easier filtering/processing
            console.log(`MISSING_MAPPING: No mapping found for query derived from: "${originalIngredient}". Using fallback term.`);
            // Basic fallback: just use the original name, maybe cleaned slightly.
            // Consider more advanced keyword extraction here later if desired.
            return originalIngredient.trim(); // Simple trim as a basic fallback
        }
    });

    // Ensure we always have terms, even if they are all fallbacks
    if (finalSearchTerms.length === 0) {
        console.error("[API POST /amazon/generate-link] Failed to generate any search terms (mapped or fallback).");
        // This case should ideally not happen if 'ingredients' array is not empty
        return NextResponse.json({ error: 'Failed to process ingredients for search.' }, { status: 500 });
    }

    // Construct the Amazon Fresh search URL using the combined terms
    const encodedSearchQuery = finalSearchTerms.map(term => encodeURIComponent(term)).join('+');
    const amazonUrl = `https://www.amazon.com/s?k=${encodedSearchQuery}&i=amazonfresh&tag=${amazonAssociateTag}`;
    // Alternatively, for a general grocery search:
    // const amazonUrl = `https://www.amazon.com/s?k=${encodedSearchQuery}&i=grocery&tag=${amazonAssociateTag}`;

    console.log("Generated Amazon URL:", amazonUrl);

    return NextResponse.json({ url: amazonUrl });

  } catch (error) {
    console.error('Error generating Amazon link:', error);
    return NextResponse.json({ error: 'Failed to generate Amazon link due to a server error.' }, { status: 500 });
  } finally {
    // Ensure Prisma Client is disconnected after the request is handled
    await prisma.$disconnect();
  }
}