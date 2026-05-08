export type RedisScriptFunction = (keys: string[], args: string[]) => Promise<unknown>;

export type RedisScripts = {
	saveWithDiffScript: RedisScriptFunction;
	deleteWithDiffScript: RedisScriptFunction;
	deleteQueriesScript: RedisScriptFunction;
};

export function createRedisScripts(
	loadScript: (script: string) => Promise<unknown>,
	evalSha: (sha: string, keys: string[], args: string[]) => Promise<unknown>,
): RedisScripts {
	return {
		saveWithDiffScript: createRedisScript(loadScript, evalSha, SAVE_WITH_DIFF),
		deleteWithDiffScript: createRedisScript(loadScript, evalSha, DELETE_WITH_DIFF),
		deleteQueriesScript: createRedisScript(loadScript, evalSha, DELETE_QUERIES),
	};
}

function createRedisScript(
	loadScript: (script: string) => Promise<unknown>,
	evalSha: (sha: string, keys: string[], args: string[]) => Promise<unknown>,
	script: string,
): RedisScriptFunction {
	let sha: string | null = null;
	const execute = async (keys: string[], args: string[], attempts = 0) => {
		if (!sha) {
			const possibleSha = await loadScript(script);
			if (typeof possibleSha !== 'string') {
				throw new Error('Unexpected non-string SHA from Redis script load');
			}
			sha = possibleSha;
		}
		try {
			return await evalSha(sha, keys, args);
		} catch (err) {
			if (err instanceof Error && err.message.includes('NOSCRIPT')) {
				if (attempts >= 3) {
					throw new Error('Redis script failed after 3 attempts', {
						cause: err,
					});
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

const SAVE_WITH_DIFF = `
local results = {}
local numKeys = #KEYS
for i, key in ipairs(KEYS) do
  results[i] = redis.call('GET', key)
  redis.call('SET', key, ARGV[i], 'PXAT', tonumber(ARGV[numKeys + 1]))
end
return results
`;

const DELETE_WITH_DIFF = `
local results = {}
for i, key in ipairs(KEYS) do
  results[i] = redis.call('GET', key)
  redis.call('UNLINK', key)
end
return results
`;

const DELETE_QUERIES = `
local toDelete = {}
for _, indexKey in ipairs(KEYS) do
  local members = redis.call('ZRANGE', indexKey, 0, -1)
  for _, member in ipairs(members) do
    toDelete[#toDelete + 1] = member
  end
  toDelete[#toDelete + 1] = indexKey
end
for i = 1, #toDelete, 7000 do
  local j = math.min(i + 6999, #toDelete)
  redis.call('UNLINK', unpack(toDelete, i, j))
end
return #toDelete
`;
