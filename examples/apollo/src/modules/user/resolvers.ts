import { getUserModule } from './typedef';

const { Query } = getUserModule();

Query.user(async ({ args }) => {
  return {
    id: args.id,
    name: 'John Doe',
  };
});
