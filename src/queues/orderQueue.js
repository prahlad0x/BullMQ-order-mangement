import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const orderQueue = new Queue('order-queue', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3, // retry 3 times
    backoff: {
      type: 'exponential',
      delay: 3000, // 3s → 9s → 27s
    },
    removeOnComplete: false,
    removeOnFail: false, // keep failed jobs
  },
  limiter: {
    max: 20, // max 20 jobs per duration
    duration: 1000, // per 1 second
  },
});
