import type Redis from 'ioredis';
import type { Cluster } from 'ioredis';

export type RedisScriptFunction = (keys: string[], args: string[]) => Promise<unknown>;

export function createRedisScript(redis: Redis | Cluster, script: string): RedisScriptFunction {
	let sha: string | null = null;
	const execute = async (keys: string[], args: string[], attempts = 0) => {
		if (!sha) {
			const possibleSha = await redis.script('LOAD', script);
			if (typeof possibleSha !== 'string') {
				throw new Error('Unexpected non-string SHA from Redis script load');
			}
			sha = possibleSha;
		}
		try {
			return await redis.evalsha(sha, keys.length, ...keys, ...args);
		} catch (err) {
			if (err instanceof Error && err.message.includes('NOSCRIPT')) {
				if (attempts >= 3) {
					throw new Error('Redis script failed after 3 attempts');
				}
				// If the script was evicted from Redis, we need to reload it and try again
				sha = null;
				return await execute(keys, args, attempts + 1);
			}
			throw err;
		}
	};
	return execute;
}
