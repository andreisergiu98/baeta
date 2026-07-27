# @baeta/federation

## 2.0.0-next.17

### Minor Changes

- Add support for GraphQL 17 by [@andreisergiu98](https://github.com/andreisergiu98) in [#572](https://github.com/andreisergiu98/baeta/pull/572)

## 2.0.0-next.16

### Major Changes

- `@baeta/federation` is a new package providing the runtime helpers Baeta needs to act as an [Apollo Federation](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/federation/) subgraph. It is consumed by the code that `@baeta/plugin-federation` generates, but the helpers are public and can be used directly. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  It exports two functions:

  - `resolveEntities(representations, handlerMap, ctx, info)` — implements the `_entities` resolver. It dispatches each `{ __typename, ...key }` representation to the matching entity handler and resolves them in parallel, throwing on an unknown or missing `__typename`.
  - `createFederationScalar(type, name, description?)` — builds the scalars the federation spec requires. `type` is `'string'` (for `FieldSet`) or `'json'` (for `_Any`).

  The package is side-effect free and only declares a `graphql` peer dependency, so it has no impact on a non-federated app.

  ```typescript
  import { createFederationScalar, resolveEntities } from "@baeta/federation";

  // Resolve federation entity references by __typename
  const entities = await resolveEntities(
    representations,
    handlersMap,
    ctx,
    info
  );

  // Federation spec scalars
  const anyScalar = createFederationScalar("json", "_Any");
  const fieldSetScalar = createFederationScalar("string", "FieldSet");
  ```

  In practice you don't call these by hand — `@baeta/plugin-federation` generates a `baeta-federation` module that wires them into the `_entities`/`_service` resolvers for you. The only code you write is the entity handlers themselves.

  Install it as a runtime dependency in any subgraph:

  ```bash
  yarn add @baeta/federation
  ```

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)
