// app/api/instacart/generate-link/route.ts

import { NextResponse } from 'next/server';

// Define the expected structure of the request body from the frontend
interface RequestBody {
  recipe_title: string;
  ingredients: string[]; // Array of ingredient description strings
}

// Define the structure expected by the Instacart API
interface InstacartIngredient {
  text: string;
}
interface InstacartRecipePayload {
  recipe: {
    title: string;
    ingredients: InstacartIngredient[];
  };
}

// Define the structure of the successful response from the Instacart API
interface InstacartSuccessResponse {
    recipe_page_url: string;
    recipe_page_token: string; // We don't use this currently, but it's part of the response
    // potentially other fields...
}

export async function POST(request: Request) {
  console.log("Instacart API route hit");

  // 1. Get Client ID and Secret from environment variables
  const clientId = process.env.INSTACART_CLIENT_ID;
  const clientSecret = process.env.INSTACART_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Instacart API credentials missing from environment variables.");
    return NextResponse.json({ error: "Server configuration error: Missing Instacart credentials." }, { status: 500 });
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

  // 3. Format the payload for the Instacart API
  const instacartPayload: InstacartRecipePayload = {
    recipe: {
      title: recipe_title,
      // Map the array of strings to the array of objects Instacart expects
      ingredients: ingredients.map(desc => ({ text: desc })),
    },
  };
  console.log("Formatted payload for Instacart:", JSON.stringify(instacartPayload, null, 2));


  // 4. Prepare for the Instacart API call
  const instacartApiUrl = 'https://api.instacart.com/v1/products/recipe_page'; // Verify this URL if needed

  // Create Basic Auth credentials
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // 5. Make the API call to Instacart
  try {
    console.log(`Calling Instacart API: ${instacartApiUrl}`);
    const response = await fetch(instacartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${basicAuth}`, // Basic Auth header
      },
      body: JSON.stringify(instacartPayload),
    });

    console.log(`Instacart API response status: ${response.status}`);

    // Check if the request was successful (Instacart uses 201 Created for this endpoint)
    if (response.status === 201) {
      const data: InstacartSuccessResponse = await response.json();
      console.log("Instacart API success response:", data);

      if (data.recipe_page_url) {
        // Return the URL to the frontend
        return NextResponse.json({ instacartUrl: data.recipe_page_url });
      } else {
        console.error("Instacart API success response missing 'recipe_page_url'.");
        return NextResponse.json({ error: "Instacart API returned an unexpected successful response." }, { status: 500 });
      }
    } else {
      // Handle errors from the Instacart API
      let errorBody = {};
      try {
        errorBody = await response.json(); // Try to parse error details
        console.error("Instacart API error response body:", errorBody);
      } catch (_e) {
        console.error("Could not parse Instacart API error response body.");
         errorBody = { detail: await response.text() }; // Fallback to raw text
      }
      return NextResponse.json({
        error: `Instacart API Error (${response.status})`,
        details: errorBody // Include details from Instacart if available
      }, { status: response.status }); // Forward Instacart's error status
    }
  } catch (error) {
    console.error("Network or other error calling Instacart API:", error);
    return NextResponse.json({ error: "Failed to communicate with Instacart API.", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
