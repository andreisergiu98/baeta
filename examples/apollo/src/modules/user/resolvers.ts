import { getUserModule } from './typedef';

const { User, Query } = getUserModule();

Query.user(async ({ args }) => {
  return {
    id: args.id,
    name: 'John Doe',
  };
});

User.name.$auth();

Query.$genericAuth();

Query.$genericFuck();
