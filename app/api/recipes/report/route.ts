import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Removed top-level initialization
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Initialize Resend inside the handler
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { recipeId, recipeTitle, name, email, message } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API Key is not defined. Cannot send report.');
      throw new Error('Server configuration error: cannot send email report.');
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Recipe Ideas Feedback <admin@recipe-ideas.online>',
      to: process.env.ADMIN_EMAIL || 'admin@recipe-ideas.online',
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