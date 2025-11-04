import axios from 'axios';
import { transporter } from '../config/nodemailer.js';
import { config } from '../config/env.js';

export async function alertToSlack(text) {
  if (!config.alerts.slackWebhook) return;
  try {
    console.log(text);
    return
    await axios.post(config.alerts.slackWebhook, { text });
  } catch (err) {
    console.error('Slack alert failed:', err.message);
  }
}

export async function alertToEmail(subject, html) {
  if (!config.alerts.adminEmail) return;
  try {
    console.log(html, subject);
    return
    await transporter.sendMail({
      from: '"Queue Alerts" <no-reply@example.com>',
      to: config.alerts.adminEmail,
      subject,
      html,
    });
  } catch (err) {
    console.error('Email alert failed:', err.message);
  }
}
