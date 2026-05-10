import type { GraphQLResolveInfo } from 'graphql';
import type { BaseObjectTypes, BaseScalars } from '../__generated__/utility.ts';
import type { Context } from '../types/context.ts';

export interface Scalars extends BaseScalars {}

export interface ObjectTypes extends BaseObjectTypes {}

export type Ctx = Context;

export type Info = GraphQLResolveInfo;
