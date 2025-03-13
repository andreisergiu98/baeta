import { Redis, type RedisConfigNodejs } from '@upstash/redis';

export class UpstashClient extends Redis {
	constructor(options: Omit<RedisConfigNodejs, 'automaticDeserialization'>) {
		super({
			...options,
			automaticDeserialization: false,
		});
	}
}
