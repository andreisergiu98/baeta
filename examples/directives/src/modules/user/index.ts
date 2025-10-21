import { UserModule } from './typedef.ts';

const { Query, Mutation, User } = UserModule;

const userFields = User.$fields({
	id: User.id.key('id'),
	email: User.email.key('email'),
	lastName: User.lastName.key('lastName'),
	profile: User.profile.key('profile'),
	givenName: User.givenName.key('givenName'),
});

const userQuery = Query.user.resolve(({ args }) => {
	return {
		id: args.where.id ?? '1',
		email: args.where.email ?? 'john.doe@baeta.io',
		lastName: 'Doe',
		profile: null,
		givenName: null,
	};
});

const createUserMutation = Mutation.createUser.resolve(({ args }) => {
	return {
		id: '15',
		email: args.email,
		lastName: args.lastName,
		profile: null,
		givenName: null,
	};
});

export default UserModule.$schema({
	User: userFields,
	Query: Query.$fields({
		user: userQuery,
	}),
	Mutation: Mutation.$fields({
		createUser: createUserMutation,
	}),
});
