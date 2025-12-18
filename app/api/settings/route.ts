import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all settings
export async function GET(request: Request) {
  try {
    const settings = await prisma.siteSetting.findMany();

    // Transform to key-value object
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST - Update settings (upsert multiple)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Update or create each setting
    const updatePromises = Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
