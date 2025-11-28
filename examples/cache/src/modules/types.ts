import type { GraphQLResolveInfo } from 'graphql';
import type { BaseObjectTypes, BaseScalars } from '../__generated__/utility.ts';
import type { User, UserPhoto } from '../lib/db/prisma.ts';
import type { Context } from '../types/context.ts';

export interface Scalars extends BaseScalars {
	UUID: `${string}-${string}-${string}-${string}-${string}`;
	DateTime: Date;
}

export interface ObjectTypes extends BaseObjectTypes {
	User: User;
	UserPhoto: UserPhoto;
}

export type Ctx = Context;

export type Info = GraphQLResolveInfo;
