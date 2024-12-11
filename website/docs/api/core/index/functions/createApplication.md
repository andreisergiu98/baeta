# Function: createApplication()

> **createApplication**(`options`): `object`

Creates a Baeta application by combining the modules.

## Parameters

### options

[`Options`](../interfaces/Options.md)

Configuration options for the application

## Returns

`object`

An object containing the GraphQL schema

### schema

> **schema**: `GraphQLSchema`

## Example

```typescript
const baeta = createApplication({
  modules: [userModule, postModule],
});

const { schema } = baeta;
```
