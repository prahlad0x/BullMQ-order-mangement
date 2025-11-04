import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const notificationQueue = new Queue('notification-queue', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
