import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const smsQueue = new Queue('sms-queue', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
  },
  limiter: {
    max: 50,      // 50 SMS per duration
    duration: 60000, // 1 minute
  },
});
