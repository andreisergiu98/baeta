import { getUserModule } from './typedef.ts';

const { Query, Mutation } = getUserModule();

Query.user(async () => {
	return {
		id: 'some-id',
		name: 'John Doe',
	};
});

Mutation.updateUser(async ({ args, ctx }) => {
	const id = args?.where?.id || 'some-id';

	return {
		id,
		name: args.data?.name || 'John Doe',
		birthday: args.data?.birthday || '01-01-2000',
	};
});
