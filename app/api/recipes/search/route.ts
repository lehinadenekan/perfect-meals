import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
  // Reference _request to satisfy the linter during build
  const _ = _request;
  // TODO: Implement actual search logic
  console.log("Search API hit, but not implemented yet.");
  return NextResponse.json([]);
}
