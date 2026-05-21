import { auth, rule, scope } from '../../lib/auth.ts';
import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';

const { Query } = UserModule;

const userQuery = Query.user
	.$use(
		auth(
			// We allow both logged in and logged out users to read a user.
			rule.or(scope.isPublic, scope.isLoggedIn),
			{
				skipDefaults: true, // Default scopes are still obligatory and would fail for logged out users.
				// If this auth check passes, the user will be granted the `readUserPhotos` grant.
				// Grants are a simple way to make sure relations won't leak unauthorized access.
				// Grants still need to be required on the other end, see user-photos.
				grants: ['readUserPhotos'],
			},
		),
	)
	.resolve(async ({ args }) => {
		return await db.user.findFirst({
			where: {
				id: args.where.id ?? undefined,
				email: args.where.email ?? undefined,
			},
		});
	});

const usersQuery = Query.users
	.$use(
		auth(rule.or(scope.isPublic, scope.isLoggedIn), {
			skipDefaults: true,
			grants: ['readUserPhotos'],
		}),
	)
	.resolve(async ({ args }) => {
		return await db.user.findMany({
			where: args.where
				? {
						id: args.where.id ?? undefined,
						email: args.where.email ?? undefined,
					}
				: undefined,
		});
	});

// Auth scopes can be applied to the type level as well
export default Query.$use(
	auth(rule.or(scope.isPublic, scope.isLoggedIn), { skipDefaults: true }),
).$fields({
	user: userQuery,
	users: usersQuery,
});
