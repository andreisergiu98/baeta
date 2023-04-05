import { getUserModule } from './typedef';

const { Query, User } = getUserModule();

Query.user(async (params) => {
  return {
    id: params.args.where?.id ?? 'id',
    name: 'John Doe',
  };
});

Query.user.$use((params, next) => {
  console.log('fetched User with args: ', JSON.stringify(params.args, null, 2));
  return next();
});

Query.user.$auth(
  {
    isPublic: true,
    isLoggedIn: true,
  },
  {
    skipDefaults: true,
    grants: ['readUserPhotos'],
  }
);
