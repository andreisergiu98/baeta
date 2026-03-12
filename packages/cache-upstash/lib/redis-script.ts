import type { Redis } from '@upstash/redis';

export type RedisScriptFunction = (keys: string[], args: string[]) => Promise<unknown>;

export function createRedisScript(redis: Redis, script: string): RedisScriptFunction {
	let sha: string | null = null;
	const execute = async (keys: string[], args: string[], attempts = 0): Promise<unknown> => {
		if (!sha) {
			sha = await redis.scriptLoad(script);
		}

		try {
			return await redis.evalsha(sha, keys, args);
		} catch (err) {
			if (err instanceof Error && err.message.includes('NOSCRIPT')) {
				if (attempts >= 3) {
					throw new Error('Redis script failed after 3 attempts');
				}
				sha = null;
				return await execute(keys, args, attempts + 1);
			}
			throw err;
		}
	};
	return (keys: string[], args: string[]) => execute(keys, args);
}
