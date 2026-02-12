import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, property, date, time, notes } =
      body;

    // Validate required fields
    if (!firstName || !lastName || !email || !property || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Tour Request - ${property} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5B6BF0; border-bottom: 2px solid #5B6BF0; padding-bottom: 10px;">
            New Tour Request
          </h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">${phone || "Not provided"}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E;">Tour Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Property:</strong></td>
                <td style="padding: 8px 0;">${property}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Preferred Date:</strong></td>
                <td style="padding: 8px 0;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Preferred Time:</strong></td>
                <td style="padding: 8px 0;">${time}</td>
              </tr>
            </table>
          </div>

          ${
            notes
              ? `
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E;">Additional Notes</h3>
            <p style="margin: 0; line-height: 1.6;">${notes}</p>
          </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>This email was sent from the Coliville tour request form.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Tour request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending tour request email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send tour request" },
      { status: 500 }
    );
  }
}
