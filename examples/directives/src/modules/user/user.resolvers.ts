import { getUserModule } from './typedef.ts';

const { Query, Mutation } = getUserModule();

Query.user(({ args }) => {
	return {
		id: args.where.id ?? '1',
		email: args.where.email ?? 'john.doe@baeta.io',
		lastName: 'Doe',
	};
});

Mutation.createUser(({ args }) => {
	return {
		id: '15',
		email: args.email,
		lastName: args.lastName,
	};
});
