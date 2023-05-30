import React from 'react';
import { Snippet, SnippetProps } from './snippet';

const featureList: Array<Omit<SnippetProps, 'idx'>> = [
  {
    title: 'SDL',
    description: (
      <>
        Baeta's schema-first pattern makes it easy to write and maintain GraphQL APIs that are easy
        to read and understand. By defining your schema first, you can focus on the API design and
        structure, rather than the implementation details.
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
        Baeta takes care of type safety and type definitions, so you can focus on implementing your
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
        Baeta's modular architecture allows you to easily extend other types and split your schema
        into small, reusable, and maintainable pieces. Here's an example of how to extend the User
        type with a photos field.
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
    description: (
      <>
        Baeta also supports custom directives, which allow you to define your own validation or
        mutation rules for input fields. Here's an example of a trim directive that trims whitespace
        from a string input.
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

export function HomeSnippets() {
  return (
    <section>
      <div className="container">
        {featureList.map((props, idx) => (
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Snippet key={idx} idx={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
