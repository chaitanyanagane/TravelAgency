import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/schemas/inquiry';
import { sendInquiryEmailToAdmin, sendAutoReplyToCustomer } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body against Zod schema
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

    // Send inquiry details to Administrator inbox
    const adminEmailResult = await sendInquiryEmailToAdmin(data);

    if (adminEmailResult.error) {
      console.error('Resend Admin Notification Error:', adminEmailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send travel inquiry. Please try again or contact us directly on WhatsApp.',
          error: adminEmailResult.error.message,
        },
        { status: 500 }
      );
    }

    // Send branded auto-reply to the customer
    const customerEmailResult = await sendAutoReplyToCustomer(data.email, data.fullName);
    
    if (customerEmailResult.error) {
      // Log warning but don't fail the request if auto-reply fails (e.g. incorrect email or sandbox limit)
      console.warn('Resend Customer Auto-reply Warning:', customerEmailResult.error);
    }

    console.log('--- TRAVEL INQUIRY DELIVERED VIA EMAIL ---', {
      toAdmin: adminEmailResult.data?.id,
      toCustomer: customerEmailResult.data?.id || 'skipped/failed',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully! Our specialists will contact you shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Inquiry API Handler Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An internal server error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
