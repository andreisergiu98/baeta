import { ForbiddenError } from '@baeta/errors';
import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';

const { Query, Mutation } = getUserModule();

Query.user.$auth(
	{
		$or: {
			isPublic: true,
			isLoggedIn: true,
		},
	},
	{
		skipDefaults: true,
		// If this auth check passes, the user will be granted the `readUserPhotos` grant.
		// Grants are a simple way to make sure relations won't leak unauthorized access.
		// Grants still need to be required on the other end, see user-photos.auth.ts.
		grants: ['readUserPhotos'],
	},
);

Query.users.$auth(
	{
		$or: {
			// We allow logged out users to read the list of users.
			isPublic: true, // Is logged out
			isLoggedIn: true, // Is logged in
		},
	},
	{
		skipDefaults: true, // Default scopes are still obligatory and would fail for logged out users.
		// If this auth check passes, the user will be granted the `readUserPhotos` grant.
		// Grants are a simple way to make sure relations won't leak unauthorized access.
		// Grants still need to be required on the other end, see user-photos.auth.ts.
		grants: ['readUserPhotos'],
	},
);

// Only admins can create users.
Mutation.createUser.$auth({
	hasAccess: 'admin',
});

// We allow the user to update its own profile, but only admins can update other users.
Mutation.updateUser.$auth(async (params) => {
	const user = await db.user.findFirst({
		where: {
			id: params.args.where.id,
			email: params.args.where.email,
		},
	});

	if (user && user.id === params.ctx.userId) {
		return true;
	}

	if (!user) {
		// We can also throw any time.
		throw new ForbiddenError();
	}

	return {
		hasAccess: 'admin',
	};
});
