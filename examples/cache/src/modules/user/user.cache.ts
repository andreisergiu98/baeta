import { getUserModule } from './typedef.ts';

const { User, Query, Mutation } = getUserModule();

export const userCache = User.$createCache({
	revision: 2,
});

Query.user.$useCache(userCache);
Query.users.$useCache(userCache);

// This can be done inside the mutation resolver itself, but
// we are also showcasing middleware usage here.
Mutation.createUser.$use(async (_params, next) => {
	const user = await next();

	// We want to clear the cache for users, because
	// inserting a new user will change the list of users.

	await Query.users.$cacheClear(userCache);
	// OR
	await userCache.deleteQueries(Query.users.$cacheRef);

	return user;
});

Mutation.updateUser.$use(async (_params, next) => {
	const user = await next();

	// Saving the user will automatically update all queries
	// that have the user in their result set.

	if (user) {
		await userCache.save(user);
	}

	return user;
});
