import { createExtensions } from '@baeta/core';
import { UnauthenticatedError } from '@baeta/errors';
import { authExtension } from '@baeta/extension-auth';
import { Context } from './types/context';

declare global {
	export namespace AuthExtension {
		export interface Scopes {
			isPublic: boolean;
			isLoggedIn: boolean;
			hasAccess: string;
		}

		export interface GrantsMap {
			readUserPhotos: boolean;
		}
	}
}

function isLoggedIn(ctx: Context) {
	return () => {
		if (ctx.userId !== null) {
			throw new UnauthenticatedError();
		}
		return true;
	};
}

const auth = authExtension<Context>(
	async (ctx) => {
		const accessList: string[] = [];
		return {
			isPublic: true,
			isLoggedIn: isLoggedIn(ctx),
			hasAccess: (access: string) => {
				return accessList.includes(access);
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
			Subscription: {
				subscribe: {
					isLoggedIn: true,
				},
			},
		},
	},
);

export default createExtensions(auth);
