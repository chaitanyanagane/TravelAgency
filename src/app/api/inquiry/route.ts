import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/schemas/inquiry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = inquirySchema.safeParse(body);

    if (!validation.success) {
      // Format validation errors nicely
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

    // Log the inquiry to the console (useful for development)
    console.log('--- NEW TRAVEL INQUIRY RECEIVED ---');
    console.log('Name:', data.fullName);
    console.log('Email:', data.email);
    console.log('Phone:', data.phoneNumber);
    console.log('Destination:', data.destination);
    console.log('Date:', data.travelDate);
    console.log('Travelers:', data.travelers);
    console.log('Budget:', data.budgetRange);
    console.log('Message:', data.message || 'None');
    console.log('-----------------------------------');

    /**
     * PRODUCTION INTEGRATION PLAN:
     * 
     * To send email notifications to the agency, you can integrate with Resend:
     * 
     * 1. Install Resend: `npm install resend`
     * 2. Add API key in `.env.local`: `RESEND_API_KEY=re_xxx`
     * 3. Integrate code below:
     * 
     * ```typescript
     * import { Resend } from 'resend';
     * 
     * const resend = new Resend(process.env.RESEND_API_KEY);
     * 
     * await resend.emails.send({
     *   from: 'Saachi Inquiry <onboarding@resend.dev>',
     *   to: 'varshaagaikwad563@gmail.com',
     *   subject: `New Travel Inquiry: ${data.destination} - ${data.fullName}`,
     *   html: `
     *     <h2>New Travel Inquiry</h2>
     *     <p><strong>Name:</strong> ${data.fullName}</p>
     *     <p><strong>Email:</strong> ${data.email}</p>
     *     <p><strong>Phone:</strong> ${data.phoneNumber}</p>
     *     <p><strong>Destination:</strong> ${data.destination}</p>
     *     <p><strong>Travel Date:</strong> ${data.travelDate}</p>
     *     <p><strong>Travelers:</strong> ${data.travelers}</p>
     *     <p><strong>Budget:</strong> ${data.budgetRange}</p>
     *     <p><strong>Message:</strong> ${data.message || 'None'}</p>
     *   `
     * });
     * ```
     */

    // Simulate database/email latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully! Our specialists will contact you shortly.',
        data: {
          fullName: data.fullName,
          destination: data.destination,
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
