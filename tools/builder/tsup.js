import { defineConfig as originalDefineConfig } from 'tsup';

export * from 'tsup';

export function defineConfig(config) {
	return originalDefineConfig({
		format: ['esm', 'cjs'],
		target: 'es2022',
		dts: true,
		clean: true,
		splitting: true,
		sourcemap: true,
		...config,
	});
}
