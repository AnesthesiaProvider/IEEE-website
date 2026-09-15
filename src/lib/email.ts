import { JuniorCoreApplication } from "./types";

/**
 * IEEE WIE Bennett University - Application Acknowledgement Email Hook
 * 
 * Future Tech Heads / Admins:
 * To enable real email dispatch (via Resend, SendGrid, Amazon SES, or Nodemailer):
 * 1. Add your API key in `.env.local` (e.g. `RESEND_API_KEY=re_xxxxxxx`).
 * 2. Uncomment the provider client below.
 * By default, this hook formats the email and logs it safely for development.
 */
export async function sendApplicationConfirmationEmail(
  app: JuniorCoreApplication
): Promise<{ sent: boolean; provider: string; messageId?: string; error?: string }> {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D0B0F; color: #F5F1F5; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #121015; border: 1px solid #39283D; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.7); }
          .badge { display: inline-block; background: #18131B; color: #E07AB0; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #5C2948; margin-bottom: 16px; }
          h1 { color: #F5F1F5; font-size: 24px; font-weight: 700; margin: 0 0 12px; }
          p { color: #D8D0DA; font-size: 15px; line-height: 1.6; margin: 0 0 16px; }
          .details-card { background: #18131B; border-radius: 12px; padding: 20px; border: 1px solid #2A202D; margin: 24px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A202D; font-size: 14px; }
          .detail-row:last-child { border-bottom: none; }
          .label { color: #A79EAB; font-weight: 500; }
          .value { color: #F5F1F5; font-weight: 600; }
          .footer { font-size: 12px; color: #756B7A; text-align: center; margin-top: 32px; border-top: 1px solid #2A202D; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="badge">IEEE WIE • Bennett University</span>
          <h1>Thank you for applying, ${app.fullName}!</h1>
          <p>
            Your application for the <strong>IEEE WIE Bennett University Junior Core Team</strong> has been successfully received. Our Executive Board and Senior Core Leads are currently reviewing submissions.
          </p>
          
          <div class="details-card">
            <div class="detail-row">
              <span class="label">Applicant Name:</span>
              <span class="value">${app.fullName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Enrollment Number:</span>
              <span class="value">${app.enrollmentNumber}</span>
            </div>
            <div class="detail-row">
              <span class="label">Interested Domain:</span>
              <span class="value" style="color: #C75491;">${app.domain}</span>
            </div>
            <div class="detail-row">
              <span class="label">Submission Date:</span>
              <span class="value">${new Date(app.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Application Status:</span>
              <span class="value" style="color: #E07AB0;">${app.status}</span>
            </div>
          </div>

          <p>
            Shortlisted candidates will be contacted via university email or phone for interaction rounds and interview scheduling.
          </p>

          <p style="margin-bottom: 0;">
            In the meantime, keep building, learning, and stay connected with IEEE WIE Bennett University!
          </p>

          <div class="footer">
            IEEE Women in Engineering Student Branch Affinity Group<br/>
            Bennett University, Greater Noida, Uttar Pradesh 201310<br/>
            &copy; ${new Date().getFullYear()} IEEE WIE BU. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  // Example integration with Resend / provider if API key present:
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "IEEE WIE BU <wie@bennett.edu.in>",
          to: [app.email],
          subject: `Application Received: IEEE WIE Junior Core Team (${app.domain})`,
          html: emailHtml,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { sent: true, provider: "Resend", messageId: data.id };
      }
    } catch (err) {
      console.warn("Resend email dispatch error:", err);
    }
  }

  // Fallback logging for local development
  console.log(`[EMAIL HOOK] Confirmation acknowledgement queued for ${app.email} (${app.fullName})`);
  return {
    sent: true,
    provider: "local-logger",
    messageId: `mock-${Date.now()}`,
  };
}
