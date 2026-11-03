import { CustomNativeDirectiveModule } from './typedef.ts';

const { Query, NameWithUpper } = CustomNativeDirectiveModule;

const queryResolver = Query.$fields({
	testUpperDirective: Query.testUpperDirective.resolve(({ args }) => {
		return {
			name: args.name,
		};
	}),
});

export default CustomNativeDirectiveModule.$schema({
	Query: queryResolver,
	NameWithUpper: NameWithUpper.$fields({
		name: NameWithUpper.name.key('name'),
	}),
});
