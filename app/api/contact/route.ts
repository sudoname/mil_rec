import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactMessageSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactMessageSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: validated,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 400 }
    );
  }
}

// Admin endpoint to fetch messages
export async function GET(request: Request) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
