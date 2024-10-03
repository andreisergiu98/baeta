import { defineConfig as originalDefineConfig } from 'tsup';

export * from 'tsup';

export function defineConfig(config) {
	return originalDefineConfig({
		format: ['esm', 'cjs'],
		dts: true,
		clean: true,
		target: 'es2022',
		splitting: true,
		sourcemap: true,
		...config,
	});
}
