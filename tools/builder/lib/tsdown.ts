import { defineConfig as originalDefineConfig, type UserConfig } from 'tsdown';

export function defineConfig(config: UserConfig) {
	return originalDefineConfig({
		target: 'es2024',
		dts: true,
		clean: true,
		sourcemap: true,
		fixedExtension: false,
		...config,
	});
}
