import { authExtension } from '@baeta/extension-auth';
import type { Context } from '../types/context.ts';

declare global {
	export namespace AuthExtension {
		export interface Scopes {
			isPublic: boolean;
			isLoggedIn: boolean;
			hasRole: 'guest' | 'user' | 'admin';
		}

		export interface GrantsMap {
			readReviews: boolean;
		}
	}
}

export const authExt = authExtension<Context>(
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
