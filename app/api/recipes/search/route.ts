import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
  // TODO: Implement actual search logic
  console.log("Search API hit, but not implemented yet.");
  return NextResponse.json([]);
}
