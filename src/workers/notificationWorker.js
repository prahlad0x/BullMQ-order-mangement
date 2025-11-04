import { Worker } from 'bullmq';
import { notificationQueue } from '../queues/index.js';
import { redis } from '../config/redis.js';
import { sendEmail } from '../utils/sendEmail.js';

const notificationWorker = new Worker(
  'notification-queue',
  async (job) => {
    const { userEmail, orderId } = job.data;
    console.log(`[NotificationWorker] Sending email for order ${orderId} to ${userEmail}`);
    await sendEmail(userEmail, `Order ${orderId} Confirmation`, `Your order ${orderId} is confirmed!`);
    console.log(`[NotificationWorker] Email sent to ${userEmail}`);
  },
  { connection: redis, concurrency: 5 }
);

console.log('[NotificationWorker] Worker started');
