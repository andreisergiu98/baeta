import type { Steps } from 'github-actions-workflow-builder';
import { joinStrings } from 'github-actions-workflow-builder/lib/expression';
import { images } from './images.ts';

function makeHealthCheckFlags(cmd: string) {
	return joinStrings(
		[
			`--health-cmd "${cmd} ping"`,
			'--health-interval 10s',
			'--health-timeout 5s',
			'--health-retries 5',
		],
		' ',
	);
}

export function redisService(port: number, name = 'redis'): Steps {
	return ({ addService }) => {
		addService({
			name,
			image: images.redis,
			options: makeHealthCheckFlags('redis-cli'),
			ports: [`${port}:6379`],
		});
	};
}

export function valkeyService(port: number, name = 'valkey'): Steps {
	return ({ addService }) => {
		addService({
			name,
			image: images.valkey,
			options: makeHealthCheckFlags('valkey-cli'),
			ports: [`${port}:6379`],
		});
	};
}

export function redisHttpService(port: number, name = 'redis-http'): Steps {
	return ({ addService, use }) => {
		addService({
			name,
			image: images.serverlessRedisHttp,
			env: {
				SRH_MODE: 'env',
				SRH_TOKEN: 'example_token',
				SRH_CONNECTION_STRING: `redis://${name}-internal-redis:6379/0`,
			},
			ports: [`${port}:80`],
		});
		addService({
			name: `${name}-internal-redis`,
			image: images.redis,
			options: makeHealthCheckFlags('redis-cli'),
		});
	};
}
