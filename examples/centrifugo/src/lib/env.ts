import { createEnvParser } from '@baeta/env';

const parseEnv = createEnvParser((key) => process.env[key]);

export const config = {
	port: parseEnv('PORT', {
		type: 'number',
		default: 4000,
	}),
	centrifugoApiUrl: new URL(
		parseEnv('CENTRIFUGO_API_URL', {
			type: 'string',
			default: 'http://127.0.0.1:8300',
		}),
	),
	centrifugoApiKey: parseEnv('CENTRIFUGO_API_KEY', {
		type: 'string',
		default: 'api-key-for-demo',
	}),
	subscriptionTtlMs: parseEnv('SUBSCRIPTION_TTL_MS', {
		type: 'number',
		default: 30000,
	}),
	sweepIntervalMs: parseEnv('SUBSCRIPTION_SWEEP_INTERVAL_MS', {
		type: 'number',
		default: 10000,
	}),
};
