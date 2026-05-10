export interface SyncRule {
	from: string;
	to: string;
	dirs: PathMapping[];
	files: PathMapping[];
	ignore: string[];
}

type PathMapping = `${string}:${string}`;

export function pathsFromMapping(mapping: PathMapping): [string, string] {
	const [relativeSrc, relativeDest] = mapping.split(':');
	return [relativeSrc, relativeDest];
}

function merge(
	rule: Pick<SyncRule, 'from' | 'to'> & Partial<SyncRule>,
	baseRule: Partial<SyncRule>,
): SyncRule {
	return {
		from: rule.from,
		to: rule.to,
		files: (rule.files ?? []).concat(baseRule.files ?? []),
		dirs: (rule.dirs ?? []).concat(baseRule.dirs ?? []),
		ignore: (rule.ignore ?? []).concat(baseRule.ignore ?? []),
	};
}

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

const allModulesAndTypes: Partial<SyncRule> = {
	files: [...allModules, ...allTypes],
};

export const syncRules: SyncRule[] = [
	merge({ from: '_shared/base', to: 'basic' }, allModulesAndTypes),
	merge(
		{
			from: '_shared/base',
			to: 'cli',
			files: [...movieModuleFiles, ...allTypes],
		},
		{},
	),
	merge({ from: '_shared/base', to: 'custom-import-ext' }, allModulesAndTypes),
	merge(
		{
			from: '_shared/base',
			to: 'custom-paths',
			files: ['types/context.ts:src/types/context.ts'],
		},
		{},
	),
	merge(
		{
			from: '_shared/base',
			to: 'scalars',
			files: [...reviewModuleFiles, 'types/context.ts:src/types/context.ts'],
		},
		{},
	),
	merge(
		{
			from: '_shared/base',
			to: 'unions-interfaces',
			files: [...reviewModuleFiles, 'types/context.ts:src/types/context.ts'],
		},
		{},
	),
	merge(
		{
			from: '_shared/base',
			to: 'plugins-pagination',
			files: [...movieModuleFiles, ...allTypes],
		},
		{},
	),
	merge({ from: '_shared/base', to: 'plugins-exec' }, allModulesAndTypes),
	merge(
		{
			from: '_shared/base',
			to: 'plugins-federation',
			files: [...allTypes],
		},
		{},
	),
	merge(
		{
			from: '_shared/base',
			to: 'plugins-federation-options',
			files: ['types/context.ts:src/types/context.ts'],
		},
		{},
	),
	merge({ from: '_shared/base', to: 'plugins-gitignore' }, allModulesAndTypes),
	merge(
		{
			from: '_shared/base',
			to: 'plugins-directives',
			files: [
				...reviewModuleFiles,
				'modules/types.ts:src/modules/types.ts',
				'types/context.ts:src/types/context.ts',
			],
		},
		{},
	),
	merge(
		{
			from: '_shared/base',
			to: 'extensions-complexity',
			files: [...allModules],
		},
		{},
	),
];
