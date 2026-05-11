import { makeRelativePathForImport } from './printer-utils.ts';

export function printTypesTemplate(options: {
	importExtension: '.js' | '.ts' | '';
	typesDir: string;
	modulesDir: string;
}) {
	const importDir = makeRelativePathForImport(options.modulesDir, options.typesDir);

	return `import type { GraphQLResolveInfo } from 'graphql';
import type { BaseObjectTypes, BaseScalars } from '${importDir}/utility${options.importExtension}';

export interface Scalars extends BaseScalars {}

export interface ObjectTypes extends BaseObjectTypes {}

export type Ctx = {};

export type Info = GraphQLResolveInfo;
`;
}
