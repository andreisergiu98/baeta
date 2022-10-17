import React from 'react';
import { Snippet, SnippetProps } from './snippet';

const FeatureList: SnippetProps[] = [
  {
    title: 'SDL',
    description: (
      <>
        Adopting the schema first pattern will make GraphQL APIs easier to write and more
        readable.
        <br />
        <br />
        Not only that, but it will encourage you to think about the API first, rather than
        the implementation.
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
    title: 'Implement resolvers',
    description: (
      <>
        Baeta takes care of type safety and type definitions so you can focus on
        implementing your resolvers in a flat and readable way.
        <br />
        <br />
        Middlewares and directives are also supported.
      </>
    ),
    left: true,
    path: 'modules/user/resolvers.ts',
    language: 'typescript',
    snippet: `import { getUserModule, User, UserWhereUnique } from "./typedef";

const { Query, User } = getUserModule();
    
Query.user(({ args }) => {
    return dataSource.user.find(args.where);
});

Query.user.$use(async ({ args }, next) => {
    const result = await next();
    console.log("Found user", result, "for args", args);
    return result;
});`,
  },
  {
    title: 'Extend other types',
    description: (
      <>
        By using <a href="https://www.the-guild.dev/graphql/modules">GraphQL Modules</a>{' '}
        under the hood, you can extend other types and split your schema into small,
        reusable and maintainable pieces.
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
    title: 'Custom directives',
    description: (
      <>Easily define your own custom directives to validate or mutate input fields.</>
    ),
    left: true,
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

export function HomeSnippets() {
  return (
    <section>
      <div className="container">
        {FeatureList.map((props, idx) => (
          <Snippet key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
