export { BaetaCache } from '../lib/baeta-cache.ts';

export default {
	async fetch(_request: Request) {
		return new Response('Hello, world!');
	},
};
