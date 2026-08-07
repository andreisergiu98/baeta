# @baeta/plugin-federation

## 2.0.0-next.17

### Minor Changes

- Add support for GraphQL 17 by [@andreisergiu98](https://github.com/andreisergiu98) in [#572](https://github.com/andreisergiu98/baeta/pull/572)

### Patch Changes

- Add support for custom transport for logs and improve tracing by [@andreisergiu98](https://github.com/andreisergiu98) in [#616](https://github.com/andreisergiu98/baeta/pull/616)
- Updated dependencies [[`5fabeb4`](https://github.com/andreisergiu98/baeta/commit/5fabeb43959a57ac56354d9ae02a4387a1b35998), [`7cd558c`](https://github.com/andreisergiu98/baeta/commit/7cd558c2a2c1111df0b6de663b6db50ad881bc88)]:
  - @baeta/util-graphql@2.0.0-next.5
  - @baeta/generator-sdk@2.0.0-next.8

## 2.0.0-next.16

### Major Changes

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

- `@baeta/plugin-federation` is a new build-time plugin that turns a Baeta service into a valid [Apollo Federation](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/federation/) subgraph. Add `federationPlugin()` to your `baeta.ts` and the generator handles the rest of the federation boilerplate. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  #### Setup

  Install the plugin as a dev dependency and the `@baeta/federation` runtime helpers as a regular dependency:

  ```bash
  yarn add -D @baeta/plugin-federation
  yarn add @baeta/federation
  ```

  Enable it in `baeta.ts`:

  ```typescript
  import { defineConfig } from "@baeta/cli";
  import { federationPlugin } from "@baeta/plugin-federation";

  export default defineConfig({
    graphql: {
      schemas: ["src/**/*.gql"],
    },
    plugins: [
      federationPlugin({
        // Federation version to target (default: '2.9', supports 2.0–2.9)
        version: "2.9",
        // Extra directives to expose, or 'all'.
        // Default: ['@key', '@external', '@requires', '@provides', '@extends']
        include: "all",
        // Name of the generated module (default: 'baeta-federation')
        moduleName: "baeta-federation",
      }),
    ],
  });
  ```

  #### What it generates

  From your existing `.gql` schema, the plugin:

  - Makes the federation spec directives (`@key`, `@external`, `@requires`, `@provides`, `@extends`, …) available in your schema files, scoped to the configured `version` and `include`.
  - Generates a `baeta-federation` module containing the `_entities` / `_service` query resolvers, the `_Service` type, the `_Entity` union (built from every type carrying a resolvable `@key`), and the `_Any` / `FieldSet` scalars — using the helpers from `@baeta/federation`.
  - Emits the printed subgraph SDL exposed via `_service { sdl }`.
  - Writes typed entity-handler signatures and representation types to `__generated__/federation.ts`, so each `@key` is reflected as a strongly typed handler.

  Types referenced only as cross-subgraph stubs — declared with `@key(fields: "id", resolvable: false)` — are intentionally excluded from the `_Entity` union and from handler generation, since they are resolved by the subgraph that owns them.

  #### The one manual step: entity handlers

  Given a keyed entity:

  ```graphql
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
  }
  ```

  the generator creates a `src/modules/<moduleName>/entity-handlers.ts` once (and never overwrites it) where you register a handler per entity:

  ```typescript
  import type { EntityHandlerMap } from "../../__generated__/federation.ts";
  import { handleProductEntity } from "../product/product.entity.ts";

  const entityHandlersMap: EntityHandlerMap = {
    Product: handleProductEntity,
  };

  export default entityHandlersMap;
  ```

  Each handler receives the typed federation representation (the `@key` fields plus `__typename`) and returns the resolved entity:

  ```typescript
  import type { ProductEntityHandler } from "../../__generated__/federation.ts";

  export const handleProductEntity: ProductEntityHandler = async (
    representation
  ) => {
    return {
      __typename: "Product",
      id: representation.id,
      name: `Product ${representation.id}`,
      price: 9.99,
    };
  };
  ```

  The generated module schema is merged into your application like any other Baeta module, so the resulting `baeta.schema` is a fully federation-compatible subgraph you can serve from Apollo Server, Yoga, or any GraphQL server. See the `federation-subgraph-products` and `federation-subgraph-users` examples for complete, runnable subgraphs.

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/generator-sdk@2.0.0-next.7
  - @baeta/util-graphql@2.0.0-next.4
  - @baeta/util-path@2.0.0-next.6
