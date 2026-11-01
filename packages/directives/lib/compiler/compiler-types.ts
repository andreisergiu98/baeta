import type { GraphQLInputType, GraphQLResolveInfo } from 'graphql';

declare const brand: unique symbol;

type ArgumentsCheckParams = {
	source: unknown;
	args: unknown;
	ctx: unknown;
	info: unknown;
};

export type ArgumentsCheck = (params: ArgumentsCheckParams) => void;

export type ValidationDirectiveName = string & { readonly [brand]: 'ValidationDirectiveName' };

export type ValidationCoordinate = `${string}.${string}` & {
	readonly [brand]: 'ValidationCoordinate';
};

export type PositionCoordinate = string & { readonly [brand]: 'PositionCoordinate' };

export type CheckEnv = {
	root: unknown;
	args: Record<string, unknown>;
	ctx: unknown;
	info: GraphQLResolveInfo;
	errors: unknown[];
};

export type CheckPath = ReadonlyArray<number | string>;

export type Check = (value: unknown, path: CheckPath, env: CheckEnv) => void;

export type Position = {
	coordinate: PositionCoordinate;
	type: GraphQLInputType;
};

export function createValidationCoordinate(type: string, field: string) {
	return `${type}.${field}` as ValidationCoordinate;
}

export function createInputTypeCoordinate(type: string) {
	return type as PositionCoordinate;
}

export function createInputFieldCoordinate(type: string, field: string) {
	return `${type}.${field}` as PositionCoordinate;
}

export function createArgumentCoordinate(type: string, field: string, argument: string) {
	return `${type}.${field}(${argument}:)` as PositionCoordinate;
}

export function createValidationDirectiveName(name: string) {
	return name as ValidationDirectiveName;
}
