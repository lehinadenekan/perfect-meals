// app/api/instacart/generate-link/route.ts

import { NextResponse } from 'next/server';

// Define the expected structure of the request body from the frontend
interface RequestBody {
  recipe_title: string;
  ingredients: string[]; // Array of ingredient description strings
}

// Define the structure expected by the instacart API
interface instacartIngredient {
  text: string;
}
interface instacartRecipePayload {
  recipe: {
    title: string;
    ingredients: instacartIngredient[];
  };
}

// Define the structure of the successful response from the instacart API
interface instacartSuccessResponse {
    recipe_page_url: string;
    recipe_page_token: string; // We don't use this currently, but it's part of the response
    // potentially other fields...
}

export async function POST(request: Request) {
  console.log("instacart API route hit");

  // 1. Get Client ID and Secret from environment variables
  const clientId = process.env.instacart_CLIENT_ID;
  const clientSecret = process.env.instacart_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("instacart API credentials missing from environment variables.");
    return NextResponse.json({ error: "Server configuration error: Missing instacart credentials." }, { status: 500 });
  }

  // 2. Parse the request body from the frontend
  let requestBody: RequestBody;
  try {
    requestBody = await request.json();
    console.log("Received request body:", requestBody);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { recipe_title, ingredients } = requestBody;

  // Basic validation
  if (!recipe_title || !Array.isArray(ingredients) || ingredients.length === 0) {
    return NextResponse.json({ error: "Missing recipe title or ingredients." }, { status: 400 });
  }

  // 3. Format the payload for the instacart API
  const instacartPayload: instacartRecipePayload = {
    recipe: {
      title: recipe_title,
      // Map the array of strings to the array of objects instacart expects
      ingredients: ingredients.map(desc => ({ text: desc })),
    },
  };
  console.log("Formatted payload for instacart:", JSON.stringify(instacartPayload, null, 2));


  // 4. Prepare for the instacart API call
  const instacartApiUrl = 'https://api.instacart.com/v1/products/recipe_page'; // Verify this URL if needed

  // Create Basic Auth credentials
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // 5. Make the API call to instacart
  try {
    console.log(`Calling instacart API: ${instacartApiUrl}`);
    const response = await fetch(instacartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${basicAuth}`, // Basic Auth header
      },
      body: JSON.stringify(instacartPayload),
    });

    console.log(`instacart API response status: ${response.status}`);

    // Check if the request was successful (instacart uses 201 Created for this endpoint)
    if (response.status === 201) {
      const data: instacartSuccessResponse = await response.json();
      console.log("instacart API success response:", data);

      if (data.recipe_page_url) {
        // Return the URL to the frontend
        return NextResponse.json({ instacartUrl: data.recipe_page_url });
      } else {
        console.error("instacart API success response missing 'recipe_page_url'.");
        return NextResponse.json({ error: "instacart API returned an unexpected successful response." }, { status: 500 });
      }
    } else {
      // Handle errors from the instacart API
      let errorBody = {};
      try {
        errorBody = await response.json(); // Try to parse error details
        console.error("instacart API error response body:", errorBody);
      } catch (_e) {
        console.error("Could not parse instacart API error response body.");
         errorBody = { detail: await response.text() }; // Fallback to raw text
      }
      return NextResponse.json({
        error: `instacart API Error (${response.status})`,
        details: errorBody // Include details from instacart if available
      }, { status: response.status }); // Forward instacart's error status
    }
  } catch (error) {
    console.error("Network or other error calling instacart API:", error);
    return NextResponse.json({ error: "Failed to communicate with instacart API.", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
