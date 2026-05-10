import { RedisCacheClient } from '@baeta/cache-ioredis';
import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379');

export const redisClient = new RedisCacheClient(redis);
