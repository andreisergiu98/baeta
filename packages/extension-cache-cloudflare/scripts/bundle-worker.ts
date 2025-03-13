import { build } from 'esbuild';

export async function bundleTest() {
	await build({
		entryPoints: ['__test__/create-env.ts'],
		outfile: './dist/create-env.js',
		format: 'esm',
		bundle: true,
	});
}
