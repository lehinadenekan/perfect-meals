import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

export async function POST(request: Request): Promise<NextResponse> {
  // Check session using v4 pattern
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);

  // Check if user is logged in (using user ID or email, depending on your preference)
  if (!session?.user?.id) { // Using user ID here, change to email if preferred
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Ensure filename is provided
  if (!filename) {
    return NextResponse.json(
      { message: 'Missing filename query parameter' },
      { status: 400 },
    );
  }

  // Ensure request body exists
  if (!request.body) {
    return NextResponse.json(
      { message: 'Missing request body' },
      { status: 400 },
    );
  }

  try {
    // Sanitize filename or generate a unique one based on user ID/timestamp
    // Example: const uniqueFilename = `${session.user.id}-${Date.now()}-${filename}`;
    // Use the original filename for now, but consider sanitization/uniqueness
    const sanitizedFilename = filename; // Replace with actual sanitization if needed

    // Upload to Vercel Blob
    const blob = await put(sanitizedFilename, request.body, {
      access: 'public', // Make the image publicly accessible
      // Optionally add cache control headers
      // cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
    });

    // Return the blob details (includes the URL)
    return NextResponse.json(blob);

  } catch (error: unknown) {
    console.error("Image upload failed:", error);
     let message = 'Error uploading image';
     // Provide more specific error messages if possible
     if (error instanceof Error) { message = error.message; }
     // Example: Check for specific Blob storage errors if the SDK provides them
    return NextResponse.json({ message }, { status: 500 });
  }
}