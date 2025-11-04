import { Worker } from 'bullmq';
import { orderQueue, deadLetterQueue, notificationQueue } from '../queues/index.js';
import { redis } from '../config/redis.js';
import { alertToSlack, alertToEmail } from '../utils/alerts.js';

const orderWorker = new Worker(
  'order-queue',
  async (job) => {
    const { orderId, userEmail } = job.data;
    console.log(`[OrderWorker] Processing order ${orderId} (Attempt ${job.attemptsMade + 1})`);

    // Simulate random failure for testing retry
    if (Math.random() < 0.3) throw new Error('Random processing failure');

    // Enqueue notification after order processed
    await notificationQueue.add('send-notification', { userEmail, orderId });
    console.log(`[OrderWorker] Order ${orderId} processed successfully`);
  },
  {
    connection: redis,
    concurrency: 5, // process 5 jobs in parallel
  }
);

// Handle permanently failed jobs
orderWorker.on('failed', async (job, err) => {
  console.error(`[OrderWorker] Job failed: ${job.id}, reason: ${err.message}`);
  if (job.attemptsMade >= job.opts.attempts) {
    await deadLetterQueue.add('failed-order', {
      orderId: job.data.orderId,
      userEmail: job.data.userEmail,
      reason: err.message,
      payload: job.data,
      failedAt: new Date().toISOString(),
    });

    const msg = `:warning: DLQ Alert - Order ${job.data.orderId} failed permanently. Reason: ${err.message}`;
    await alertToSlack(msg);
    await alertToEmail(`DLQ Alert - Order ${job.data.orderId}`, `<pre>${JSON.stringify(job.data, null, 2)}</pre>`);
  }
});

console.log('[OrderWorker] Worker started');
