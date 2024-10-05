import { getUserModule } from './typedef.ts';

const { Query, Mutation, Subscription } = getUserModule();

Query.user(async () => {
	return {
		id: 'some-id',
		name: 'John Doe',
	};
});

Mutation.updateUser(async ({ args, ctx }) => {
	const id = args?.where?.id || 'some-id';

	ctx.publish('on-user-updated', id);

	return {
		id,
		name: args.data?.name || 'John Doe',
		birthday: args.data?.birthday || '01-01-2000',
	};
});

Subscription.onUserUpdate({
	subscribe: ({ ctx }) => {
		return ctx.subscribe('on-user-updated');
	},
	resolve: (params) => {
		return {
			id: params.payload,
			name: 'Jon',
		};
	},
});
