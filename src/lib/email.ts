import { Resend } from 'resend';

// Initialize Resend client with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Fallback sender email (Resend default sandbox address)
const FROM_EMAIL = 'onboarding@resend.dev';

interface InquiryData {
  fullName: string;
  email: string;
  phoneNumber: string;
  destination: string;
  travelDate: string;
  travelers: number;
  budgetRange: string;
  message?: string;
}

/**
 * Sends a structured, professional HTML email containing inquiry details to the admin address.
 */
export async function sendInquiryEmailToAdmin(data: InquiryData) {
  const recipient = process.env.INQUIRY_EMAIL || 'varshaagaikwad563@gmail.com';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Travel Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background-color: #0d9488; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
          .content { padding: 30px; }
          .intro { font-size: 16px; color: #475569; margin-bottom: 24px; line-height: 1.5; }
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .details-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; }
          .details-table td.label { font-weight: 600; color: #64748b; width: 35%; }
          .details-table td.value { color: #0f172a; }
          .message-box { background: #f8fafc; border-left: 4px solid #0d9488; padding: 16px; border-radius: 4px; margin-top: 8px; }
          .message-box p { margin: 0; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic; }
          .footer { background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Travel Inquiry</h1>
          </div>
          <div class="content">
            <p class="intro">You have received a new inquiry from the website contact form. Details are provided below:</p>
            <table class="details-table">
              <tr>
                <td class="label">Name</td>
                <td class="value">${data.fullName}</td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone</td>
                <td class="value"><a href="tel:${data.phoneNumber}" style="color: #0d9488; text-decoration: none;">${data.phoneNumber}</a></td>
              </tr>
              <tr>
                <td class="label">Destination</td>
                <td class="value"><strong>${data.destination}</strong></td>
              </tr>
              <tr>
                <td class="label">Travel Date</td>
                <td class="value">${data.travelDate}</td>
              </tr>
              <tr>
                <td class="label">No. of Travelers</td>
                <td class="value">${data.travelers}</td>
              </tr>
              <tr>
                <td class="label">Budget Range</td>
                <td class="value">${data.budgetRange}</td>
              </tr>
            </table>
            
            ${data.message ? `
              <h3 style="font-size: 15px; margin-bottom: 8px; color: #0f172a;">Customer Message:</h3>
              <div class="message-box">
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            This email was generated automatically by the Saachi Tours & Travels website.
          </div>
        </div>
      </body>
    </html>
  `;

  return resend.emails.send({
    from: `Saachi Tours Inquiry <${FROM_EMAIL}>`,
    to: recipient,
    subject: `New Travel Inquiry - ${data.fullName}`,
    html: htmlContent,
  });
}

/**
 * Sends a premium, branded HTML auto-reply confirmation email to the customer.
 */
export async function sendAutoReplyToCustomer(email: string, fullName: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for contacting Saachi Tours & Travels</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background-color: #090d16; padding: 35px 30px; text-align: center; border-bottom: 2px solid #0d9488; }
          .header h1 { color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
          .header span { display: block; color: #14b8a6; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; margin-top: 6px; }
          .content { padding: 40px 30px; line-height: 1.6; }
          .content h2 { font-size: 20px; color: #0f172a; margin-top: 0; margin-bottom: 16px; }
          .content p { font-size: 15px; color: #334155; margin-bottom: 24px; }
          .cta-box { background: #f0fdfa; border: 1px dashed #14b8a6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px; }
          .cta-box p { margin: 0; font-size: 14px; color: #0f766e; font-weight: 500; }
          .footer { background-color: #090d16; padding: 30px; text-align: center; font-size: 12px; color: #64748b; }
          .footer p { margin: 4px 0; }
          .footer a { color: #14b8a6; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Saachi</h1>
            <span>Tours & Travels</span>
          </div>
          <div class="content">
            <h2>Hello ${fullName},</h2>
            <p>Thank you for reaching out to <strong>Saachi Tours & Travels</strong>! We are thrilled to help you plan your next vacation.</p>
            
            <div class="cta-box">
              <p>We have received your travel inquiry, and our destination specialists are already reviewing your preferences. We will contact you shortly (typically within 24 hours).</p>
            </div>
            
            <p>In the meantime, feel free to browse our popular itineraries or follow us on social media for travel inspiration.</p>
            
            <p>Best Regards,<br><strong>Saachi Tours & Travels Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Saachi Tours & Travels. All rights reserved.</p>
            <p>Where every journey begins with care.</p>
            <p>Mukai Chowk, Ravet, Pune, Maharashtra | <a href="https://saachi-tours.vercel.app">Visit Website</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return resend.emails.send({
    from: `Saachi Tours & Travels <${FROM_EMAIL}>`,
    to: email,
    subject: 'Thank you for contacting Saachi Tours & Travels',
    html: htmlContent,
  });
}
