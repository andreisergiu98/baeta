import { Snippet, type SnippetProps } from './snippet.tsx';

const featureList: Array<Omit<SnippetProps, 'idx'>> = [
	{
		title: 'Define the Schema',
		description: (
			<>
				Leverage GraphQL SDL to define schemas for each module, keeping your API organized and easy
				to maintain.
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
}
`,
	},
	{
		title: 'Implement the Resolvers',
		description: (
			<>
				Baeta generates and enforces types automatically, so you can focus on writing simple,
				reliable resolvers.
			</>
		),
		path: 'modules/user/resolvers.ts',
		language: 'typescript',
		snippet: `import { UserModule } from "./typedef.ts";

const { Query } = UserModule;

const userQuery = Query.user.resolve(({ args }) => {
  return dataSource.user.find(args.where);
});

const usersQuery = Query.users.resolve(() => {
  return dataSource.user.findMany();
});

export default Query.$fields({
  user: userQuery,
  users: usersQuery,
});
`,
	},
	{
		title: 'Compose and Extend',
		description: (
			<>
				Create modular schemas that are easy to grow and maintain. Extend types naturally as your
				API expands.
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
}
`,
	},

	{
		title: 'Scope-Based Authorization',
		description: (
			<>
				Secure your API with granular, scope-based authorization. Baeta makes permission handling
				simple and consistent.
			</>
		),
		language: 'typescript',
		snippet: `import { UserModule } from "./typedef.ts";

const { Query } = UserModule;

const userQuery = Query.user
  .$auth({
    $or: {
      isPublic: true,
      isLoggedIn: true,
    },
  })
  .resolve(async ({ args }) => {
    // ...
  });
`,
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
		snippet: `import { defineQuery } from "@baeta/cache";

const { Query, Mutation, User } = UserModule;

export const userCache = User.$createCache()
  .withQueries({
    findUser: defineQuery({
      resolve: async (args: { id?: string }) => {
        return dataSource.user.find(args);
      },
    }),
  })
  .build();

const userQuery = Query.user
  .$resolveCache(userCache.queries.findUser, ({ args }) => ({
    id: args.where.id,
  }));

const updateUserMutation = Mutation.updateUser
  .$use(async (next) => {
    const user = await next();
    await userCache.update(user);
    return user;
  })
  .resolve(async ({ args }) => {
    // ...
  });
`,
	},
	{
		title: 'Powerful custom directives',
		description: (
			<>
				Add custom behavior exactly where you need it. Create your own directives for validation,
				transformation, or any custom logic.
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
});
`,
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
