<p align="center">
  <img src="https://raw.githubusercontent.com/andreisergiu98/baeta/refs/heads/main/website/static/img/logo-baeta.svg" alt="Baeta Logo" width="150"/>
</p>

<div align="center">
  <h1>Baeta</h1>
  <a href="https://baeta.io/docs/getting-started/installation">Getting Started</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.baeta.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://baeta.io/docs/intro">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/andreisergiu98/baeta/tree/main/examples">Examples</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/BHFXHvyj">Discord</a>
  <br />
  <hr />
</div>

# What is Baeta?

Building GraphQL APIs shouldn't be complicated. **Baeta** is a modern, modular, open-source GraphQL framework designed with flexibility in mind. It follows a granular approach where you only add what you need, helping developers focus on what matters most - creating powerful, scalable APIs without the boilerplate.

### Key Features

- **Modular Architecture**: Organize your API into manageable modules
- **Schema-First Development**: Define your API contract upfront
- **Type Safety**: Automatic code generation for type-safe development
- **Middleware & Directives**: Easy integration of custom behaviors
- **High Performance**: Built for scalability and efficiency

#### And optional extensions and plugins

- **@baeta/extension-auth**: Add powerful scope-based authorization
- **@baeta/extension-cache**: Implement automatic caching with simple update patterns
- ... and more!

## Why use Baeta?

Baeta makes it easy to build better GraphQL APIs while staying flexible. Here's how:

**Granular and Progressive:** Start small and add features as you need them. Whether you're building a simple API or a complex system, Baeta scales with your needs.

**Modular architecture:** Baeta's modular design allows you to organize your GraphQL API into smaller, more manageable modules that can be added or removed as needed. This makes it easier to maintain and scale your API over time.

**Schema-first approach:** With Baeta, you define your schema first, and then logic and resolvers. This approach ensures a consistent and well-defined API for your clients and reduces boilerplate code.

## How it Works

#### 1. Define your schema

```graphql
type User {
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
```

#### 2. Implement your resolvers

```typescript
import { getUserModule } from "./typedef";

const { Query } = getUserModule();

Query.user(({ args }) => {
  return dataSource.user.find(args.where);
});

Query.users(() => {
  return dataSource.user.findMany();
});
```

#### 3. Add authorization

```typescript
const { Query, Mutation } = getUserModule();

Query.users.$auth({
  $or: {
    isPublic: true,
    isLoggedIn: true,
  },
});
```

#### 4. Add caching

```typescript
import { getUserModule } from "./typedef";

const { User, Query } = getUserModule();

export const userCache = User.$createCache();

Query.user.$useCache(userCache);
Query.users.$useCache(userCache);
```

## Compatibility

Baeta is compatible with all GraphQL servers, which makes it easy to integrate with your existing stack. It works seamlessly with popular GraphQL server libraries such as **Graphql Yoga** and **Apollo Server**, as well as other popular tools like **Prisma**, **Drizzle** and **Kysely**.

## Credits

Baeta was inspired by several amazing projects and people in the GraphQL ecosystem. Check out our [Credits page](https://baeta.io/docs/credits) to learn more about the individuals and projects that influenced Baeta's development.

## License

Baeta is licensed under the [MIT License](./LICENSE).
