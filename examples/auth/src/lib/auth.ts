import { createAuth } from '@baeta/auth';
import { UnauthenticatedError } from '@baeta/errors';
import type { Context } from '../types/context.ts';

export interface Scopes {
	isPublic: boolean;
	isLoggedIn: boolean;
	hasAccess: 'guest' | 'user' | 'moderator' | 'admin';
}

export type Grants = 'readUserPhotos';

function isLoggedIn(ctx: Context) {
	return () => {
		// This is a simple example, a real implementation would check the user's session
		if (ctx.userId !== null) {
			throw new UnauthenticatedError();
		}
		return true;
	};
}

export const { auth, authAfter, authAppPlugin } = createAuth<Context, Scopes, Grants>(
	async (ctx) => {
		const accessList = new Set(['guest', 'user']);
		return {
			isPublic: true,
			isLoggedIn: isLoggedIn(ctx),
			hasAccess: (access: string) => {
				return accessList.has(access);
			},
		};
	},
	{
		// All queries, mutations, and subscriptions will require the user to be logged in.
		// You will need to pay attention for relationships and nested queries.
		defaultScopes: {
			Query: {
				isLoggedIn: true,
			},
			Mutation: {
				isLoggedIn: true,
			},
			Subscription: {
				isLoggedIn: true,
			},
		},
	},
);
