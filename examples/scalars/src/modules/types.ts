import type { GraphQLResolveInfo } from 'graphql';
import type { BaseObjectTypes, BaseScalars } from '../__generated__/utility.ts';

export interface Scalars extends BaseScalars {
	UUID: `${string}-${string}-${string}-${string}-${string}`;
}

export interface ObjectTypes extends BaseObjectTypes {}

// biome-ignore lint/complexity/noBannedTypes: Allow empty context
export type Ctx = {};

export type Info = GraphQLResolveInfo;
