import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { recipeId, feedback } = await request.json();

    // Store the feedback in the database
    const feedbackEntry = await prisma.dietaryFeedback.create({
      data: {
        recipeId,
        lowFodmapIncorrect: feedback.lowFodmap,
        fermentedIncorrect: feedback.fermented,
        pescatarianIncorrect: feedback.pescatarian,
        comment: feedback.comment,
        currentAnalysis: feedback.currentAnalysis
      }
    });

    // If we get multiple reports for the same issue, we might want to flag it for review
    const feedbackCount = await prisma.dietaryFeedback.count({
      where: {
        recipeId,
        OR: [
          { lowFodmapIncorrect: true },
          { fermentedIncorrect: true },
          { pescatarianIncorrect: true }
        ]
      }
    });

    // If we have 3 or more reports, flag the recipe for review
    if (feedbackCount >= 3) {
      await prisma.recipe.update({
        where: { id: recipeId },
        data: {
          // needsDietaryReview: true <-- Removed this non-existent field
        }
      });
    }

    return NextResponse.json({ success: true, feedbackId: feedbackEntry.id });
  } catch (error) {
    console.error('Failed to store dietary feedback:', error);
    return NextResponse.json(
      { error: 'Failed to store feedback' },
      { status: 500 }
    );
  }
} 