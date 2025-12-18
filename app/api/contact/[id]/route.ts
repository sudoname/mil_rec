import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Update message status (mark as resolved/unresolved)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isResolved } = body;

    if (typeof isResolved !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid isResolved value' },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isResolved },
    });

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error: any) {
    console.error('Message update error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error: any) {
    console.error('Message delete error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
