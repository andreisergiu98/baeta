import { UserModule } from './typedef.ts';
import { userCache } from './user.cache.ts';

const { Query } = UserModule;

export default Query.$fields({
	user: Query.user.$resolveCache(userCache.queries.findUser, ({ args }) => ({
		id: args.where.id,
		email: args.where.email,
	})),
	users: Query.users
		.$resolveCache(userCache.queries.findUsers, () => ({}))
		.map(({ source }) => {
			if (source == null) {
				return [];
			}
			return source;
		}),
});
