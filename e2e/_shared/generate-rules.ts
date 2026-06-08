import { defineGenerateConfig, merge, type PathMapping } from '@baeta/builder/generate';

const from = 'e2e/_shared/base';

const movieModuleFiles: PathMapping[] = [
	'modules/movie/index.ts:src/modules/movie/index.ts',
	'modules/movie/movie.gql:src/modules/movie/movie.gql',
	'modules/movie/movie.resolvers.ts:src/modules/movie/movie.resolvers.ts',
];

const reviewModuleFiles: PathMapping[] = [
	'modules/review/index.ts:src/modules/review/index.ts',
	'modules/review/review.gql:src/modules/review/review.gql',
	'modules/review/review.resolvers.ts:src/modules/review/review.resolvers.ts',
];

const allModules: PathMapping[] = [...movieModuleFiles, ...reviewModuleFiles];

const allTypes: PathMapping[] = [
	'modules/types.ts:src/modules/types.ts',
	'types/context.ts:src/types/context.ts',
];

const contextOnly: PathMapping[] = ['types/context.ts:src/types/context.ts'];

const allModulesAndTypes = { files: [...allModules, ...allTypes] };

export default defineGenerateConfig([
	merge({ from, to: 'e2e/basic' }, allModulesAndTypes),
	merge({ from, to: 'e2e/cli', files: [...movieModuleFiles, ...allTypes] }, {}),
	merge({ from, to: 'e2e/custom-import-ext' }, allModulesAndTypes),
	merge({ from, to: 'e2e/custom-paths', files: contextOnly }, {}),
	merge({ from, to: 'e2e/scalars', files: [...reviewModuleFiles, ...contextOnly] }, {}),
	merge({ from, to: 'e2e/unions-interfaces', files: [...reviewModuleFiles, ...contextOnly] }, {}),
	merge({ from, to: 'e2e/plugins-pagination', files: [...movieModuleFiles, ...allTypes] }, {}),
	merge({ from, to: 'e2e/plugins-exec' }, allModulesAndTypes),
	merge({ from, to: 'e2e/plugins-federation', files: [...allTypes] }, {}),
	merge({ from, to: 'e2e/plugins-federation-options', files: contextOnly }, {}),
	merge({ from, to: 'e2e/plugins-gitignore' }, allModulesAndTypes),
	merge(
		{
			from,
			to: 'e2e/plugins-directives',
			files: [...reviewModuleFiles, 'modules/types.ts:src/modules/types.ts', ...contextOnly],
		},
		{},
	),
	merge({ from, to: 'e2e/complexity', files: [...allModules] }, {}),
]);
