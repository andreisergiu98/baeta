import { createAuth } from '@baeta/auth';
import { UnauthenticatedError } from '@baeta/errors';
import type { Context } from '../types/context.ts';

export type Scopes = {
	isPublic: boolean;
	isLoggedIn: boolean;
	hasAccess: 'guest' | 'user' | 'admin';
};
export type Grants = 'readUserPhotos';

export const { auth, authAfter, authAppPlugin, rule, scope } = createAuth<Context, Scopes, Grants>(
	async (ctx) => {
		const userAccessList = new Set(['guest', 'user']);
		return {
			isPublic: true,
			// Example of lazy loaded scope.
			isLoggedIn: async () => {
				if (ctx.userId == null) {
					throw new UnauthenticatedError();
				}
				return true;
			},
			hasAccess: (access) => {
				return userAccessList.has(access);
			},
		};
	},
	{
		// All queries, mutations, and subscriptions will require the user to be logged in.
		// You will need to pay attention for relationships and nested queries.
		defaultScopes: ({ scope }) => ({
			Query: scope.isLoggedIn,
			Mutation: scope.isLoggedIn,
			Subscription: scope.isLoggedIn,
		}),
	},
);
