import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { recipeId, recipeTitle, name, email, message } = await request.json();

    // Send email using Resend
    await resend.emails.send({
      from: 'Perfect Meals <reports@perfect-meals.com>',
      to: process.env.ADMIN_EMAIL || 'admin@perfect-meals.com',
      subject: `Recipe Report: ${recipeTitle}`,
      html: `
        <h2>Recipe Report</h2>
        <p><strong>Recipe:</strong> ${recipeTitle}</p>
        <p><strong>Recipe ID:</strong> ${recipeId}</p>
        <p><strong>Reported by:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending recipe report:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
} 