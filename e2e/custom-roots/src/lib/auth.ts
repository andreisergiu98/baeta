import { createAuth } from '@baeta/auth';
import type { Context } from '../types/context.ts';

export type Scopes = {
	isLoggedIn: boolean;
};

export const { auth, authAppPlugin, scope } = createAuth<Context, Scopes, never>(
	(ctx) => ({
		isLoggedIn: () => ctx.userId != null,
	}),
	{
		defaultScopes: ({ scope }) => ({
			Query: scope.isLoggedIn,
			Mutation: scope.isLoggedIn,
			Subscription: scope.isLoggedIn,
		}),
	},
);
