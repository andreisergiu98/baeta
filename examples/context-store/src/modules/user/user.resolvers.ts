import { getOptionalUser, getUser } from '../../store.ts';
import { getUserModule } from './typedef.ts';

const { Query } = getUserModule();

Query.me(async ({ ctx }) => {
	// One thing that is worth mentioning is that stores are loaded a single time for the entire request, the result being cached and reused
	// Check how the log to see only one print of 'I am loading the optional user'
	await Promise.all([
		getOptionalUser(ctx),
		getOptionalUser(ctx),
		getOptionalUser(ctx),
		getOptionalUser(ctx),
		getOptionalUser(ctx),
	]);

	const optionalUser = await getOptionalUser(ctx); // typed as User | null, and won't throw an error if the user is not authenticated

	console.log('Got optional user', optionalUser);

	const requiredUser = await getUser(ctx); // typed as User, and will throw an error if the user is not authenticated

	console.log('Got required user', requiredUser);

	return requiredUser;
});

Query.user(({ args }) => {
	return {
		id: args.where.id,
		email: 'jon.doe@baeta.io',
		lastName: 'Doe',
	};
});

Query.user.$use(async ({ args, ctx }, next) => {
	const optionalUser = await getOptionalUser(ctx);
	const result = await next();
	console.log('Got user:', result, 'for args:', args, 'for:', optionalUser);
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
