import IORedis from 'ioredis';
import { config } from './env.js';

export const redis = new IORedis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null, 
});
