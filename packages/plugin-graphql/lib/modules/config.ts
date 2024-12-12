/**
 * Originally based on graphql-modules preset of graphql-code-generator
 * Source: https://github.com/dotansimha/graphql-code-generator/blob/master/packages/presets/graphql-modules/src/config.ts
 * Copyright (c) 2016 Dotan Simha
 * Modified by Baeta developers
 */
export type ModulesConfig = {
	baseTypesPath: string;
	importBaseTypesFrom?: string;
	cwd?: string;
	importTypesNamespace?: string;
	filename: string;
	encapsulateModuleTypes: 'prefix' | 'namespace' | 'none';
	requireRootResolvers?: boolean;
	extensionsPath?: string;
	importExtension?: '.js' | '.ts';
};
