# createInputDirective()

> **createInputDirective**\<`DirectiveConfig`, `Context`\>(`options`): (`schema`) => `GraphQLSchema`

Creates a schema transformer that applies an input directive to a GraphQL schema.
The directive can be used to validate or transform input fields, arguments, and input types.
See https://baeta.io/docs/guides/directives and https://baeta.io/docs/guides/input-directives

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`DirectiveConfig`

</td>
<td>

&hyphen;

</td>
<td>

Type of the directive configuration object

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
<td>

Type of the GraphQL context

</td>
</tr>
</tbody>
</table>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`InputDirectiveOptions`](../type-aliases/InputDirectiveOptions.md)\<`DirectiveConfig`, `Context`\>

</td>
<td>

Configuration options for the input directive

</td>
</tr>
</tbody>
</table>

## Returns

A function that transforms a GraphQL schema by applying the directive

> (`schema`): `GraphQLSchema`

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
</tbody>
</table>

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
