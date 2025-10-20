import { type Options, defineConfig as originalDefineConfig } from 'tsdown';

export function defineConfig(config: Options) {
	return originalDefineConfig({
		target: 'es2024',
		dts: true,
		clean: true,
		sourcemap: true,
		...config,
	});
}
