import { getUserModule } from './typedef';

const { Query, Mutation, Subscription } = getUserModule();

Query.user(async (params) => {
  params.ctx.pubsub.publish('on-user-update', 'some id');

  return {
    id: 'some-id',
    name: 'John Doe',
  };
});

Mutation.updateUser(async ({ args, ctx }) => {
  ctx.pubsub.publish('on-user-update', args.where?.id || 'some id');

  return {
    id: args.where?.id || 'some-id',
    name: args.data?.name || 'John Doe',
    birthday: args.data?.birthday || '01-01-2000',
  };
});

Subscription.onUserUpdate<string>({
  subscribe: ({ ctx }) => {
    return ctx.pubsub.asyncIterator('on-user-update');
  },
  resolve: (params) => {
    return {
      id: params.payload,
      name: 'Jon',
    };
  },
});
