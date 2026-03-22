import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact form submission:", body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, simulated: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Contact Form <iletisim@mertcandar.com>',
      to: ['mertcan.dar@outlook.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
  }
}
