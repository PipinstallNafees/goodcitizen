import transporter from "../config/mailer.js";
import stateEmails from "../config/stateEmails.js";

const sendReportEmail = async ({ authorName, authorEmail, title, category, description, city, state, imageUrl }) => {
  const stateKey = state?.toLowerCase().trim();
  const govEmail = stateEmails[stateKey];

  if (!govEmail) {
    console.log(`No email found for state: "${state}". Skipping.`);
    return;
  }

  // Email to government
  await transporter.sendMail({
    from: `"Good Citizen" <${process.env.GMAIL_USER}>`,
    to: govEmail,
    subject: `[Good Citizen] New Issue Reported: ${title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0d6efd; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏛️ Good Citizen</h1>
          <p style="color: #cce5ff; margin: 5px 0 0;">Civic Issue Report</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #333;">New issue reported in your state</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold; width: 30%;">Title</td>
              <td style="padding: 10px;">${title}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Category</td>
              <td style="padding: 10px;">${category}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">City</td>
              <td style="padding: 10px;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">State</td>
              <td style="padding: 10px;">${state}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Reported By</td>
              <td style="padding: 10px;">${authorName} (${authorEmail})</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Description</td>
              <td style="padding: 10px;">${description}</td>
            </tr>
          </table>
          ${imageUrl ? `
          <div style="margin-top: 20px;">
            <p style="font-weight: bold;">Attached Photo:</p>
            <img src="${imageUrl}" alt="Issue Photo" style="width: 100%; border-radius: 6px;" />
          </div>` : ""}
        </div>
        <div style="background: #f8f9fa; padding: 16px; text-align: center; color: #999; font-size: 12px;">
          Good Citizen Platform — Bhubaneswar, Odisha, India
        </div>
      </div>
    `,
  });

  // Confirmation email to citizen
  await transporter.sendMail({
    from: `"Good Citizen" <${process.env.GMAIL_USER}>`,
    to: authorEmail,
    subject: `✅ Your report "${title}" has been submitted`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0d6efd; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏛️ Good Citizen</h1>
          <p style="color: #cce5ff; margin: 5px 0 0;">Report Confirmation</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #333;">Thank you, ${authorName}!</h2>
          <p>Your issue has been submitted and the concerned government authority has been notified.</p>
          <div style="background: #f0f7ff; border-left: 4px solid #0d6efd; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Issue:</strong> ${title}</p>
            <p style="margin: 8px 0 0;"><strong>Category:</strong> ${category}</p>
            <p style="margin: 8px 0 0;"><strong>Location:</strong> ${city}, ${state}</p>
          </div>
          <p style="color: #666;">We have forwarded your report to the ${state} government authority.</p>
          <p style="color: #666; font-size: 13px;">Keep reporting. Together we build a better nation. 🇮🇳</p>
        </div>
        <div style="background: #f8f9fa; padding: 16px; text-align: center; color: #999; font-size: 12px;">
          Good Citizen Platform — Bhubaneswar, Odisha, India
        </div>
      </div>
    `,
  });

  console.log(`✅ Government email sent to: ${govEmail}`);
  console.log(`✅ Confirmation email sent to: ${authorEmail}`);
};

export default sendReportEmail;