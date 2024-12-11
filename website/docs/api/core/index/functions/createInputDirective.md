# Function: createInputDirective()

> **createInputDirective**\<`DirectiveConfig`, `Context`\>(`options`): (`schema`) => `GraphQLSchema`

Creates a schema transformer that applies an input directive to a GraphQL schema.
The directive can be used to validate or transform input fields, arguments, and input types.
See https://baeta.io//docs/guides/directives and https://baeta.io//docs/guides/input-directives

## Type Parameters

• **DirectiveConfig**

Type of the directive configuration object

• **Context** = `unknown`

Type of the GraphQL context

## Parameters

### options

[`InputDirectiveOptions`](../type-aliases/InputDirectiveOptions.md)\<`DirectiveConfig`, `Context`\>

Configuration options for the input directive

## Returns

`Function`

A function that transforms a GraphQL schema by applying the directive

### Parameters

#### schema

`GraphQLSchema`

### Returns

`GraphQLSchema`

## Example

```typescript
const trimDirective = createInputDirective<TrimArgs>({
  name: "trim",
  target: "scalar",
  resolve(params) {
    const value = params.getValue();

    if (typeof value !== "string") {
      return;
    }

    const config = params.directiveConfig;

    if (config.start === true && config.end !== true) {
      return params.setValue(value.trimStart());
    }
    if (config.end === true && config.start !== true) {
      return params.setValue(value.trimEnd());
    }

    params.setValue(value.trim());
  },
});
```
