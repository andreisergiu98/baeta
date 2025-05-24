import { BaetaCache } from '../lib/baeta-cache.ts';

export { BaetaCache };

export default {
	async fetch(_request: Request) {
		return new Response('Hello, world!');
	},
};
