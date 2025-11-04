import { Worker } from 'bullmq';
import { smsQueue } from '../queues/index.js';
import { redis } from '../config/redis.js';
import { sendSMS } from '../utils/sendSMS.js';

const smsWorker = new Worker(
  'sms-queue',
  async (job) => {
    const { phone, message } = job.data;
    console.log(`[SMS Worker] Sending SMS to ${phone}`);
    await sendSMS(phone, message);
    console.log(`[SMS Worker] SMS sent to ${phone}`);
  },
  { connection: redis, concurrency: 5 }
);

console.log('[SMS Worker] Worker started');
