import { transporter } from '../config/nodemailer.js';

export async function sendEmail(to, subject, html) {
  try {
    console.log(to, subject, html);
    return;
    await transporter.sendMail({
      from: '"Queue Service" <no-reply@example.com>',
      to,
      subject,
      html,
    });
    console.log(`[sendEmail] Email sent to ${to}`);
  } catch (err) {
    console.error(`[sendEmail] Failed to send email to ${to}:`, err.message);
    throw err; // throw so BullMQ can retry if needed
  }
}
