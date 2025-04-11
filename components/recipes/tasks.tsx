// Phase 3: Image Upload
// Install Image Upload Library (Optional):
// Install react-dropzone if desired for a better UX: pnpm install react-dropzone.
// State for Image File:
// In CreateRecipeForm.tsx, add useState to hold the selected image File object (e.g., const [imageFile, setImageFile] = useState<File | null>(null);).
// Image Input UI:
// Add a dedicated section in the form for image upload.
// Implement either:
// A standard <input type="file" accept="image/*" onChange={handleImageChange} />.
// Or integrate react-dropzone to provide a drag-and-drop area.
// Create the handleImageChange function (or use onDrop from react-dropzone) to update the imageFile state with the selected file.
// Image Preview (Optional):
// If an imageFile exists, use URL.createObjectURL(imageFile) to generate a temporary URL.
// Display an <img> tag with the generated URL as the src to show a preview. Remember to revoke the object URL on unmount or when the file changes using useEffect.
// Clear Image Button (Optional):
// Add a button to allow the user to clear the selected image (sets imageFile back to null).
// Client-Side Validation (Optional):
// In the handleImageChange or onDrop function, add checks for file type (e.g., file.type.startsWith('image/')) and file size (e.g., file.size < 5 * 1024 * 1024 for 5MB limit). Show an error (e.g., using toast) if validation fails and don't update the state.
// Phase 4: Submission Logic and API Interaction
// Update onSubmit Function:
// Ensure the onSubmit function is async.
// Image Upload Logic (within onSubmit):
// Check if imageFile state is not null.
// If an image exists:
// Create a FormData object: const formData = new FormData();.
// Append the file: formData.append('file', imageFile);.
// Make a POST request using fetch or axios to your image upload API endpoint (e.g., /api/upload). (Need to know/create this endpoint).
// Handle the response:
// Success: Extract the returned image URL (e.g., from Cloudinary or Vercel Blob). Store it in a variable (e.g., uploadedImageUrl).
// Failure: Show an error toast (toast.error), log the error, and potentially return from onSubmit to stop the recipe creation.
// Construct Recipe Payload (within onSubmit):
// Get the validated form data from the onSubmit parameter.
// Create the final payload object for the recipe API.
// Include the uploadedImageUrl (if it exists) in the payload.
// Ensure the structure matches the expected API request body (especially for nested ingredients/instructions).
// Recipe Creation API Call (within onSubmit):
// Make a POST request using fetch or axios to your recipe creation API endpoint (e.g., /api/recipes). (Need to know/create this endpoint).
// Set Content-Type: application/json header.
// Send the constructed recipe payload in the request body (JSON.stringify(payload)).
// Handle API Response (within onSubmit):
// Check the response status code.
// Success (e.g., 201 Created):
// Show a success toast (toast.success('Recipe created successfully!')).
// Optionally, parse the response to get the new recipe ID.
// Optionally, use useRouter from next/navigation to redirect the user (e.g., router.push(\/recipes/\${newRecipeId}\)).
// Optionally, reset the form using reset() from useForm.
// Failure (e.g., 4xx, 5xx):
// Try to parse an error message from the response body.
// Show an error toast (toast.error('Failed to create recipe: ' + (errorMessage || 'Unknown error'))).
// Log the full error.
// Integrate Loading State:
// The submit button is already disabled using isSubmitting from useForm. Ensure this covers the entire onSubmit async operation (including image upload and recipe creation). Consider potentially adding react-hook-form's isSubmitting state manually if the built-in doesn't cover async operations fully (though usually it does).
// Phase 5: UX Refinements
// Loading Indicator:
// Enhance the submit button text during loading (e.g., "Creating Recipe...") or add a spinner icon next to the text.
// Toast Notifications:
// Import toast from react-hot-toast.
// Ensure all success and error messages (validation, image upload, API calls) use toast.success() or toast.error() for consistent feedback.
// Accessibility:
// Review all added inputs and buttons. Ensure labels have correct htmlFor attributes.
// Ensure buttons (especially icon-only remove buttons) have clear aria-label attributes.
// Check color contrast for text and error messages.
// Form Reset:
// If not already done after successful submission in Phase 4, call reset() from useForm to clear the form fields. Reset the imageFile state as well.
// Select Components (Optional):
// If difficulty or cuisineType should have predefined options, refactor the Input fields to use a Select component (likely from @/components/ui/select if using Shadcn). Update the Zod schema if necessary (e.g., using z.enum).
// Styling & Layout:
// Review the overall form layout and styling. Adjust padding, margins, grid columns, etc., for better visual appearance and responsiveness.
// Confirmation Modals (Optional):
// Consider adding a confirmation dialog (e.g., using @radix-ui/react-alert-dialog) before removing an ingredient or instruction step, especially if the fields might contain significant user input.