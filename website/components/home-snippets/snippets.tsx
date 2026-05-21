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
		path: 'modules/user/user.queries.ts',
		language: 'typescript',
		snippet: `import { auth, rule, scope } from "./lib/auth.ts";
import { UserModule } from "./typedef.ts";

const { Query } = UserModule;

const userQuery = Query.user
  .$use(auth(rule.or(scope.isPublic, scope.isLoggedIn)))
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
		path: 'modules/user/user.cache.ts',
		language: 'typescript',
		snippet: `import { createCache, defineQuery } from "@baeta/cache";
import { redisClient } from "./lib/redis.ts";
import { UserModule } from "./typedef.ts";

const { Query, Mutation } = UserModule;

export const userCache = createCache(redisClient, {
  name: "UserCache",
  parse: JSON.parse,
  serialize: JSON.stringify,
})
  .withQueries({
    findUser: defineQuery({
      resolve: async (args: { id: string }) => {
        return dataSource.user.findUnique({ where: args });
      },
    }),
  })
  .build();

const userQuery = Query.user.map(({ args }) =>
  userCache.queries.findUser({ id: args.where.id }),
);

const updateUserMutation = Mutation.updateUser
  .$use(async (next) => {
    const user = await next();
    if (user) await userCache.update(user);
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
		path: 'lib/directives/trim.ts',
		language: 'typescript',
		snippet: `import { createInputDirective } from "@baeta/core";

export const trimDirective = createInputDirective({
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
