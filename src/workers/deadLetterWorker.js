import { Worker } from 'bullmq';
import { deadLetterQueue } from '../queues/index.js';
import { redis } from '../config/redis.js';
import { alertToSlack, alertToEmail } from '../utils/alerts.js';

const deadLetterWorker = new Worker(
  'dead-letter-queue',
  async (job) => {
    console.log(`[DLQ Worker] Handling DLQ job: ${job.id}`);
    console.log(job.data);

    const msg = `:skull: DLQ Job Alert\nOrderId: ${job.data.orderId}\nReason: ${job.data.reason}\nFailedAt: ${job.data.failedAt}`;
    await alertToSlack(msg);
    await alertToEmail(`DLQ Job - Order ${job.data.orderId}`, `<pre>${JSON.stringify(job.data, null, 2)}</pre>`);
  },
  { connection: redis, concurrency: 1 }
);

console.log('[DLQ Worker] Worker started');
