import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      property,
      roomType,
      moveInDate,
      leaseDuration,
      occupation,
      occupationDetail,
      aboutYou,
      emergencyName,
      emergencyPhone,
      howHeard,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !moveInDate ||
      !leaseDuration ||
      !occupation ||
      !aboutYou
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      process.env.SMTP_HOST === "your-smtp-server.com" ||
      process.env.SMTP_HOST.includes("your-") ||
      process.env.SMTP_PASSWORD === "your-smtp-password"
    ) {
      console.error("SMTP not configured. Please update .env.local with your SMTP credentials.");
      console.log("Application submission received from:", fullName, email);
      console.log("Form data:", JSON.stringify(body, null, 2));

      return NextResponse.json(
        {
          success: false,
          message: "Email service not configured. Please contact the administrator.",
        },
        { status: 503 }
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
      subject: `New Application - ${property || "General"} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #5B6BF0; border-bottom: 3px solid #5B6BF0; padding-bottom: 10px;">
            New Coliving Application
          </h2>

          <!-- Personal Information -->
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
              Personal Information
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>Full Name:</strong></td>
                <td style="padding: 8px 0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #5B6BF0;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Date of Birth:</strong></td>
                <td style="padding: 8px 0;">${dateOfBirth}</td>
              </tr>
            </table>
          </div>

          <!-- Stay Details -->
          <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
              Stay Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>Property:</strong></td>
                <td style="padding: 8px 0;">${property || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Room Type:</strong></td>
                <td style="padding: 8px 0;">${roomType || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Move-in Date:</strong></td>
                <td style="padding: 8px 0;">${moveInDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Lease Duration:</strong></td>
                <td style="padding: 8px 0;">${leaseDuration}</td>
              </tr>
            </table>
          </div>

          <!-- About the Applicant -->
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
              About the Applicant
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>Occupation:</strong></td>
                <td style="padding: 8px 0;">${occupation}</td>
              </tr>
              ${
                occupationDetail
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>School/Company:</strong></td>
                <td style="padding: 8px 0;">${occupationDetail}</td>
              </tr>
              `
                  : ""
              }
            </table>
            <div style="margin-top: 15px;">
              <strong style="color: #666;">Why Coliving / About:</strong>
              <p style="margin: 8px 0 0 0; line-height: 1.6; background-color: white; padding: 12px; border-radius: 6px; border-left: 3px solid #5B6BF0;">
                ${aboutYou}
              </p>
            </div>
          </div>

          <!-- Emergency Contact & Additional Info -->
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1A1A2E; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
              Additional Information
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${
                emergencyName
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>Emergency Contact:</strong></td>
                <td style="padding: 8px 0;">${emergencyName}</td>
              </tr>
              `
                  : ""
              }
              ${
                emergencyPhone
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>Emergency Phone:</strong></td>
                <td style="padding: 8px 0;">${emergencyPhone}</td>
              </tr>
              `
                  : ""
              }
              ${
                howHeard
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%;"><strong>How They Heard:</strong></td>
                <td style="padding: 8px 0;">${howHeard}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; color: #999; font-size: 12px;">
            <p>This application was submitted through the Coliville website application form.</p>
            <p style="margin-top: 8px;">
              <strong>Quick Actions:</strong>
              <a href="mailto:${email}" style="color: #5B6BF0; text-decoration: none; margin-right: 15px;">Reply to Applicant</a>
              ${phone ? `<span style="color: #666;">Call: ${phone}</span>` : ""}
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Application sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending application email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send application" },
      { status: 500 }
    );
  }
}
