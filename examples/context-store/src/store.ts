import { createContextStore } from '@baeta/core';
import { UnauthenticatedError } from '@baeta/errors';
import type { User } from './__generated__/types.ts';
import type { Context } from './types/context.ts';

export async function loadOptionalUser(ctx: Context) {
	console.log('I am loading the optional user');

	if (!ctx.userId) {
		return null;
	}

	await new Promise((resolve) => setTimeout(resolve, 500));

	const forgedUser: User = {
		id: ctx.userId,
		lastName: 'Doe',
		givenName: 'John',
		email: 'john.doe@baeta.io',
		profile: null,
	};

	return forgedUser;
}

const optionalUserStoreKey = Symbol('optionalUserStore');

// getOptionalUser is a function that returns a promise that resolves to the User if it exists or null
export const [getOptionalUser, setOptionalUserLoader] = createContextStore<User | null>(
	optionalUserStoreKey,
	{
		lazy: true, // Load the user only when it's requested
	},
);

// Stores can be chained to create more complex stores
export async function loadUser(ctx: Context) {
	console.log('I am loading the user');

	const user = await getOptionalUser(ctx);

	if (!user) {
		throw new UnauthenticatedError();
	}

	return user;
}

const userStoreKey = Symbol('userStore');

// getUser is a function that returns a promise that resolves to the User, or rejects with an UnauthenticatedError if the user is not authenticated and doesn't exist
// it will elevate any resolver that uses it to require authentication
export const [getUser, setUserLoader] = createContextStore<User>(userStoreKey, {
	lazy: true, // Load the user only when it's requested
});
