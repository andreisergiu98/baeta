import React from 'react';
import { Snippet, SnippetProps } from './snippet';

const featureList: Array<Omit<SnippetProps, 'idx'>> = [
  {
    title: 'SDL',
    description: (
      <>
        Adopting the schema first pattern will make GraphQL APIs easier to write and more readable.
        <br />
        <br />
        Not only that, but it will encourage you to think about the API first, rather than the
        implementation.
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
    title: 'Typed resolvers',
    description: (
      <>
        Baeta takes care of type safety and type definitions so you can focus on implementing your
        resolvers in a flat and readable way.
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
    title: 'Extend other modules',
    description: (
      <>
        Modular by design, you can extend other types and split your schema into small, reusable and
        maintainable pieces.
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
    title: 'Directives',
    description: <>Easily define your own directives to validate or mutate input fields.</>,
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
        {featureList.map((props, idx) => (
          <Snippet key={idx} idx={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
