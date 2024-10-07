import { getUserModule } from './typedef.ts';

const { Query, User } = getUserModule();

const userCache = User.$createCache({
	revision: 2,
	getRef(root) {
		return root.pid;
	},
});

Query.user(async (params) => {
	console.log('got data from resolver');
	return {
		pid: params.args.where?.id ?? 'id',
		name: 'John Doe',
	};
});

Query.user.$useCache(userCache, {});

Query.user.$use(async (params, next) => {
	console.log('fetched User with args: ', JSON.stringify(params.args, null, 2));
	return next();
});

Query.user.$auth(
	{
		$or: {
			isPublic: true,
			isLoggedIn: true,
		},
	},
	{
		skipDefaults: true,
		grants: ['readUserPhotos'],
	},
);
