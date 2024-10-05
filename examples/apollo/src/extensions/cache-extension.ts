import { cacheExtension } from '@baeta/extension-cache';
import { RedisStore } from '@baeta/extension-cache-redis';
import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379');

const redisStore = new RedisStore(redis);

export const cacheExt = cacheExtension(redisStore, {});
