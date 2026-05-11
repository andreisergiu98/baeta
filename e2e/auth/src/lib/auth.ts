import { createAuth } from '@baeta/auth';
import type { Context } from '../types/context.ts';

export interface Scopes {
	isPublic: boolean;
	isLoggedIn: boolean;
	hasRole: 'guest' | 'user' | 'admin';
}

export type Grants = 'readReviews';

export const { auth, authAfter, authAppPlugin } = createAuth<Context, Scopes, Grants>(
	async (ctx) => {
		return {
			isPublic: true,
			isLoggedIn: () => ctx.userId != null,
			hasRole: (role: string) => {
				if (!ctx.role) {
					return false;
				}
				const hierarchy = ['guest', 'user', 'admin'];
				return hierarchy.indexOf(ctx.role) >= hierarchy.indexOf(role);
			},
		};
	},
	{
		defaultScopes: {
			Query: {
				isLoggedIn: true,
			},
			Mutation: {
				isLoggedIn: true,
			},
		},
	},
);
