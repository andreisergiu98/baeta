import { defineConfig as originalDefineConfig } from 'tsup';

export * from 'tsup';

export function defineConfig(config) {
	return originalDefineConfig({
		format: 'esm',
		target: 'es2024',
		dts: false,
		clean: true,
		splitting: true,
		sourcemap: true,
		...config,
	});
}
