import dotenv from 'dotenv';
dotenv.config();

export const config = {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  alerts: {
    slackWebhook: process.env.SLACK_WEBHOOK_URL,
    adminEmail: process.env.ADMIN_EMAIL,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
