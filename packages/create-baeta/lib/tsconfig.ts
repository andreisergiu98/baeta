import tsconfig from '../../../tools/tsconfig/tsconfig.json';

export function createTsconfig() {
	const current = structuredClone(tsconfig);

	return {
		...current,
		compilerOptions: {
			...current.compilerOptions,
			rootDir: 'src',
			outDir: 'dist',
			noEmit: true,
			emitDeclarationOnly: false,
		},
		exclude: ['baeta.ts'],
	};
}
