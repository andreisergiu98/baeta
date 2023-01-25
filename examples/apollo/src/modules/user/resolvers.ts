import { getUserModule } from './typedef';

const { Query, User } = getUserModule();

Query.user(async ({ args }) => {
  return {
    id: args.id,
    name: 'John Doe',
  };
});

Query.user.$use((params, next) => {
  console.log('fetched User with args: ', JSON.stringify(params.args, null, 2));
  return next();
});

Query.$auth(
  {
    isLoggedIn: true,
  },
  {
    grants: ['readUserPhotos'],
  }
);
