import { getUserModule } from './typedef.ts';

const { Query } = getUserModule();

Query.user(({ args }) => {
	return {
		id: args.where.id,
		email: 'jon.doe@baeta.io',
		lastName: 'Doe',
	};
});

Query.user.$use(async ({ args }, next) => {
	const result = await next();
	console.log('Got user:', result, 'for args:', args);
	return result;
});

Query.users(() => {
	const users = Array.from({ length: 10 }).map((_, i) => ({
		id: i.toString(),
		email: `jon.doe${i}@baeta.io`,
		lastName: `Doe ${i}`,
	}));
	return users;
});
