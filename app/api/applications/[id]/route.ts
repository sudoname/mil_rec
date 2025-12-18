import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Update application status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['NEW', 'REVIEWING', 'SHORTLISTED', 'CONTACTED', 'REJECTED'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Update application
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      application,
      message: 'Application status updated successfully',
    });
  } catch (error: any) {
    console.error('Application update error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    );
  }
}

// GET - Get single application details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Transform data for frontend
    const formattedApplication = {
      id: application.id,
      referenceId: application.referenceId,
      fullName: `${application.firstName} ${application.middleName ? application.middleName + ' ' : ''}${application.lastName}`,
      phone: application.phone,
      email: application.email || '',
      dateOfBirth: application.dateOfBirth.toISOString(),
      gender: application.gender,
      lga: application.lga,
      currentAddress: application.currentAddress,
      permanentAddress: application.homeAddress,
      highestQualification: application.qualification,
      numberOfPasses: application.numberOfPasses || 0,
      examYear: application.yearOfExam || 0,
      branches: JSON.parse(application.branches).join(', '),
      preferredSkills: application.skills ? JSON.parse(application.skills).join(', ') : null,
      status: application.status,
      createdAt: application.createdAt.toISOString(),
    };

    return NextResponse.json(formattedApplication);
  } catch (error) {
    console.error('Failed to fetch application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}
