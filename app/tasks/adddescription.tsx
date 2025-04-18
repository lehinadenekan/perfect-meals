// Tasks for Adding/Editing Album Description Functionality

// 1. [COMPLETED] Modify Album Cover Modal UI (components/albums/AlbumCoverModal.tsx):
//    - Add a new button/option to the modal content.
//    - Determine the button text dynamically: "Add Description" if the album's current description is empty/null, "Edit Description" otherwise. (This requires passing the current description to the modal).
//    - Add an `onClick` handler to this new button.
//    - This handler should call a function (passed via props, e.g., `onOpenDescriptionEditor`) to signal the parent component to open the description editing modal.

// 2. [COMPLETED] Create Description Edit Modal Component (e.g., components/albums/EditDescriptionModal.tsx):
//    - Create a new modal component.
//    - Define its props: `isOpen`, `onClose`, `albumId`, `currentDescription`, `onSuccess` (callback for successful save).
//    - Include a `<textarea>` element for description input, pre-filled with `currentDescription`.
//    - Add "Save" and "Cancel" buttons.
//    - Implement state management for the textarea input and submission loading state.

// 3. [COMPLETED] Implement API Call Logic (in components/albums/EditDescriptionModal.tsx):
//    - Add an `onSubmit` handler for the Save button/form.
//    - Inside the handler, set loading state.
//    - Make a `PUT` or `PATCH` request to `/api/albums/{albumId}`.
//    - The request body should contain the updated description (e.g., `{ description: newDescription }`).
//    - Handle the API response:
//      - On success: Show success toast, call the `onSuccess` prop function, call `onClose`.
//      - On error: Show error toast, reset loading state.

// 4. [COMPLETED] Update Backend API Route (app/api/albums/[albumId]/route.ts):
//    - Add or modify the `PUT` (or `PATCH`) request handler.
//    - Get session/authenticate user.
//    - Get `albumId` from route parameters.
//    - Parse request body to get the new `description` (validate if necessary).
//    - Verify the user making the request owns the album (`prisma.album.findUnique({ where: { id: albumId, userId: session.user.id } })`).
//    - If ownership verified, update the album using `prisma.album.update({ where: { id: albumId }, data: { description: newDescription } })`.
//    - Return appropriate success (e.g., updated album data) or error JSON responses with status codes.

// 5. [COMPLETED] Connect Modals & Refresh Logic (in the component rendering AlbumCoverModal, likely components/albums/AlbumManager.tsx):
//    - Add state to manage the visibility of `EditDescriptionModal` (e.g., `isDescriptionModalOpen`).
//    - Add state to potentially store the album being edited for description (if not already available).
//    - Create a function `handleOpenDescriptionEditor` that closes `AlbumCoverModal` and opens `EditDescriptionModal`, passing the required props (`albumId`, `currentDescription`).
//    - Pass `handleOpenDescriptionEditor` as a prop (e.g., `onOpenDescriptionEditor`) to `AlbumCoverModal`.
//    - Create a function `handleDescriptionUpdateSuccess` to be passed as the `onSuccess` prop to `EditDescriptionModal`.
//    - This `handleDescriptionUpdateSuccess` function should trigger a refresh of the album list (e.g., by calling `fetchAlbums`).
//    - Render the `<EditDescriptionModal>` component conditionally.

// 6. Display Album Description (components/albums/AlbumManager.tsx):
//    - Ensure the `fetchAlbums` function (calling `GET /api/albums`) retrieves the `description` field.
//    - Modify the album card rendering logic (within the `.map` function) to display the `album.description`.
//    - Use appropriate styling (e.g., smaller text, gray color) and handle null/empty descriptions gracefully (e.g., show "No description" or nothing).
