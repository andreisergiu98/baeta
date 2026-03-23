import { RedisCacheClient } from '@baeta/cache-ioredis';
import { cacheExtension } from '@baeta/extension-cache';
import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379');

const redisClient = new RedisCacheClient(redis);

export const cacheExt = cacheExtension(redisClient);
