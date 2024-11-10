import { UnauthenticatedError } from '@baeta/errors';
import { authExtension } from '@baeta/extension-auth';
import type { Context } from '../types/context.js';

declare global {
	export namespace AuthExtension {
		export interface Scopes {
			isPublic: boolean;
			isLoggedIn: boolean;
			hasAccess: 'guest' | 'user' | 'moderator' | 'admin';
		}

		export interface GrantsMap {
			readUserPhotos: boolean;
		}
	}
}

function isLoggedIn(ctx: Context) {
	return () => {
		// This is a simple example, a real implementation would check the user's session
		if (ctx.userId !== null) {
			throw new UnauthenticatedError();
		}
		return true;
	};
}

export const authExt = authExtension<Context>(
	async (ctx) => {
		const accessList: string[] = ['guest', 'user'];
		return {
			isPublic: true,
			isLoggedIn: isLoggedIn(ctx),
			hasAccess: (access: string) => {
				return accessList.includes(access);
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
				subscribe: {
					isLoggedIn: true,
				},
			},
		},
	},
);
