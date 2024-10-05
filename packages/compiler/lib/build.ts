import { context } from 'esbuild';
import { type CompilerOptions, createEsbuildConfig } from './esbuild-config.ts';

export async function build(options: CompilerOptions) {
	const esbuildConfig = createEsbuildConfig(options);
	const ctx = await context(esbuildConfig);
	await ctx.rebuild();
	return ctx.dispose();
}

export async function buildAndWatch(options: CompilerOptions) {
	const esbuildConfig = createEsbuildConfig(options, true);
	const ctx = await context(esbuildConfig);
	await ctx.watch();
	return ctx;
}
