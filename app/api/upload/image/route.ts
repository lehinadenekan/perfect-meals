import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Optional: Protect endpoint

export async function POST(request: Request): Promise<NextResponse> {
   // Optional: Check session if only logged-in users can upload
   const session = await auth();
   if (!session?.user?.id) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
   }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json(
      { message: 'Missing filename or request body' },
      { status: 400 },
    );
  }

  try {
    // Vercel Blob SDK handles reading the stream/body
    const blob = await put(filename, request.body, {
      access: 'public', // Make the image publicly accessible
      // Optionally add cache control headers
      // cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
    });

    // Return the blob details (includes the URL)
    return NextResponse.json(blob);

  } catch (error: unknown) {
    console.error("Image upload failed:", error);
     let message = 'Error uploading image';
     if (error instanceof Error) { message = error.message; }
    return NextResponse.json({ message }, { status: 500 });
  }
} 