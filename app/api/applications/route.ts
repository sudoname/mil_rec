import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Generate unique reference ID
function generateReferenceId(): string {
  const prefix = 'LAGOS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['firstName', 'lastName', 'phone', 'gender', 'dateOfBirth', 'lga', 'placeOfOrigin', 'homeAddress', 'currentAddress', 'qualification', 'branches'];

    for (const field of required) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate phone number format
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Check for duplicate phone number
    const existingApplication = await prisma.application.findFirst({
      where: { phone: body.phone },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          error: 'An application with this phone number already exists',
          referenceId: existingApplication.referenceId,
        },
        { status: 409 }
      );
    }

    // Generate unique reference ID
    const referenceId = generateReferenceId();

    // Create application
    const application = await prisma.application.create({
      data: {
        referenceId,
        firstName: body.firstName,
        lastName: body.lastName,
        middleName: body.middleName || null,
        phone: body.phone,
        email: body.email || null,
        gender: body.gender,
        dateOfBirth: new Date(body.dateOfBirth),
        lga: body.lga,
        placeOfOrigin: body.placeOfOrigin,
        homeAddress: body.homeAddress,
        currentAddress: body.currentAddress,
        qualification: body.qualification,
        numberOfPasses: body.numberOfPasses || null,
        numberOfSittings: body.numberOfSittings || null,
        yearOfExam: body.yearOfExam || null,
        branches: JSON.stringify(body.branches),
        skills: JSON.stringify(body.skills || []),
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      referenceId: application.referenceId,
      message: 'Application submitted successfully',
    });
  } catch (error: any) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - List applications (admin only)
export async function GET(request: Request) {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Transform data for frontend
    const formattedApplications = applications.map((app) => ({
      id: app.id,
      referenceId: app.referenceId,
      fullName: `${app.firstName} ${app.middleName ? app.middleName + ' ' : ''}${app.lastName}`,
      phone: app.phone,
      email: app.email || '',
      dateOfBirth: app.dateOfBirth.toISOString(),
      gender: app.gender,
      lga: app.lga,
      currentAddress: app.currentAddress,
      permanentAddress: app.homeAddress,
      highestQualification: app.qualification,
      numberOfPasses: app.numberOfPasses || 0,
      examYear: app.yearOfExam || 0,
      branches: JSON.parse(app.branches).join(', '),
      preferredSkills: app.skills ? JSON.parse(app.skills).join(', ') : null,
      status: app.status,
      createdAt: app.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
