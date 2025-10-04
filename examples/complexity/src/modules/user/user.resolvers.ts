import { UserModule } from './typedef.ts';

const { Query, User } = UserModule;

export const userResolver = User.$complexity(() => ({
	complexity: 2,
})).$fields({
	id: User.id.key('id'),
	email: User.email.key('email'),
	lastName: User.lastName.key('lastName'),
	profile: User.profile.key('profile'),
	givenName: User.givenName.key('givenName'),
});

const userQuery = Query.user
	.use(async (next, { args }) => {
		const result = await next();
		console.log('Got user:', result, 'for args:', args);
		return result;
	})
	.resolve(({ args }) => {
		return {
			id: args.where.id,
			email: 'jon.doe@baeta.io',
			lastName: 'Doe',
			profile: null,
			givenName: null,
		};
	});

const usersQuery = Query.users
	.$complexity(({ ctx }) => {
		if (ctx.appVersion === '1') {
			return { multiplier: 1 };
		}
		return {
			multiplier: 5,
		};
	})
	.resolve(() => {
		const users = Array.from({ length: 10 }).map((_, i) => ({
			id: i.toString(),
			email: `jon.doe${i}@baeta.io`,
			lastName: `Doe ${i}`,
			profile: null,
			givenName: null,
		}));
		return users;
	});

export const queryResolver = Query.$fields({
	user: userQuery,
	users: usersQuery,
});
