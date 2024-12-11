# Type Alias: InputDirectiveOptions\<DirectiveConfig, Context\>

> **InputDirectiveOptions**\<`DirectiveConfig`, `Context`\>: `object`

Configuration options for creating an input directive.

## Type Parameters

• **DirectiveConfig**

Type of the directive arguments

• **Context**

Type of the context

## Type declaration

### getListDepth()?

> `optional` **getListDepth**: (`config`) => `number`

Returns the depth of list of lists validated by this directive.
The depth 0 indicates the topmost list of a field or argument.
The depth 1 indicates the first nested list.
The depth 2 indicates the second nested list, and so on.

The directive config is provided as an argument, so depth can be based on directive arguments.

So in the following example:

```
input Input {
  list: [[[String!]!]!]! @validList(maxItems: 2, listDepth: 0) @validList(maxItems: 5, listDepth: 1) @validList(maxItems: 3, listDepth: 2)
}
```

#### Parameters

##### config

`DirectiveConfig`

#### Returns

`number`

### name

> **name**: `string`

Name of the directive as it appears in the GraphQL schema (without '@' prefix)

#### Example

```ts
'trim' for '@trim' directive
```

### resolve

> **resolve**: [`ValidationDirectiveFn`](ValidationDirectiveFn.md)\<`DirectiveConfig`, `Context`\>

Function that implements the directive's validation/transformation logic

### target

> **target**: [`ValidationTarget`](ValidationTarget.md)

Validation target indicating when the directive should be applied
