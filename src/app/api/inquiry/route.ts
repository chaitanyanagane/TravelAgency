import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/schemas/inquiry';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = inquirySchema.safeParse(body);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Save inquiry to PostgreSQL database
    const newInquiry = await db.inquiry.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        destination: data.destination,
        travelDate: data.travelDate,
        travelers: data.travelers,
        budgetRange: data.budgetRange,
        message: data.message || null,
        status: 'NEW',
      },
    });

    console.log('--- NEW INQUIRY SAVED TO POSTGRES ---', newInquiry.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully! Our specialists will contact you shortly.',
        data: {
          id: newInquiry.id,
          fullName: newInquiry.fullName,
          destination: newInquiry.destination,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An internal server error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
