import { Snippet, type SnippetProps } from './snippet.tsx';

const featureList: Array<Omit<SnippetProps, 'idx'>> = [
	{
		title: 'Define Your API Contract',
		description: (
			<>
				Start with a clear, readable schema that serves as your API contract. Baeta's schema-first
				approach lets you focus on designing the perfect API before diving into implementation
				details.
			</>
		),
		path: 'modules/user/user.gql',
		language: 'graphql',
		snippet: `type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}
  
input UserWhereUnique {
    id: ID
    email: String
}
  
type Query {
    user(where: UserWhereUnique!): User!
    users: [User!]!
}`,
	},
	{
		title: 'Write Clean, Type-Safe Resolvers',
		description: (
			<>
				Focus purely on your business logic while Baeta handles all type definitions and safety. No
				more type gymnastics or complex and nested resolver patterns - just clean, straightforward
				code.
			</>
		),
		path: 'modules/user/resolvers.ts',
		language: 'typescript',
		snippet: `import { getUserModule } from "./typedef";

const { Query } = getUserModule();
    
Query.user(({ args }) => {
    return dataSource.user.find(args.where);
});

Query.users(() => {
    return dataSource.user.findMany();
});
`,
	},
	{
		title: 'Compose and Extend',
		description: (
			<>
				Build your API like building blocks. Baeta's modular architecture lets you split your schema
				into small, focused pieces that are easy to maintain. Extend existing types seamlessly as
				your API grows.
			</>
		),
		path: 'modules/user-photos/user-photos.gql',
		language: 'graphql',
		snippet: `type Photo {
    id: ID!
    url: String!
    description: String!
    postedBy: User!
}

input PhotoCreateData {
    url: String! @trim
    description: String!
    userId: ID!
}
  
extend type User {
    photos: [Photo!]!
}`,
	},

	{
		title: 'Scope-Based Authorization',
		description: (
			<>
				Secure your API with granular, scope-based authorization. Define permissions directly in
				your schema and let Baeta handle the rest.
			</>
		),
		language: 'typescript',
		snippet: `const { Query, Mutation } = getUserModule();

Query.users.$auth({
	$or: {
		isPublic: true,
		isLoggedIn: true,
	},
});`,
	},
	{
		title: 'Simple, Effective Caching',
		description: (
			<>
				Add automatic caching to your queries with minimal setup. Update cached data easily and
				predictably when mutations occur.
			</>
		),
		language: 'typescript',
		snippet: `import { getUserModule } from './typedef.ts';

const { User, Query } = getUserModule();

export const userCache = User.$createCache({});

Query.user.$useCache(userCache, {});
Query.users.$useCache(userCache, {});

Mutation.updateUser.$use(async (params, next) => {
	const user = await next();
	await userCache.save(user);
	return user;
});
`,
	},
	{
		title: 'Powerful Custom Directives',
		description: (
			<>
				Add custom behavior exactly where you need it. Create your own directives for validation,
				transformation, or any custom logic. Baeta makes it simple to apply complex behaviors
				declaratively in your schema.
			</>
		),
		language: 'typescript',
		snippet: `const trimDirective = createInputDirective({
    name: "trim",
    target: "scalar",
    resolve: ({ getValue, setValue }) => {
      const value = getValue();
      if (typeof value === "string") {
        setValue(value.trim());
      }
    },
});`,
	},
];

const featureListWithIdx = featureList.map((props, idx) => ({ ...props, idx }));

export function HomeSnippets() {
	return (
		<section>
			<div className="container">
				{featureListWithIdx.map((props) => (
					<Snippet key={props.idx} {...props} />
				))}
			</div>
		</section>
	);
}
