import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch army admissions with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const listType = searchParams.get('listType'); // 'MAIN' or 'SUPPLEMENTARY'
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};

    if (listType) {
      where.listType = listType;
    }

    if (search) {
      where.OR = [
        { applicationNo: { contains: search } },
        { surname: { contains: search } },
        { firstName: { contains: search } },
        { otherName: { contains: search } },
      ];
    }

    const admissions = await prisma.armyAdmission.findMany({
      where,
      take: limit,
      orderBy: { applicationNo: 'asc' },
    });

    const counts = await prisma.armyAdmission.groupBy({
      by: ['listType'],
      _count: true,
    });

    return NextResponse.json({
      admissions,
      counts: counts.reduce((acc, item) => {
        acc[item.listType] = item._count;
        return acc;
      }, {} as Record<string, number>),
      total: admissions.length,
    });
  } catch (error) {
    console.error('Failed to fetch army admissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch army admissions' },
      { status: 500 }
    );
  }
}
