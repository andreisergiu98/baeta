# @baeta/extension-complexity

## Enumerations

### ComplexityErrorKind

Types of complexity validation errors that can occur during query analysis.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Breadth`

</td>
<td>

`"BreadthExceeded"`

</td>
<td>

Query exceeds maximum allowed breadth (fields per level)

</td>
</tr>
<tr>
<td>

`Complexity`

</td>
<td>

`"ComplexityExceeded"`

</td>
<td>

Query exceeds total complexity score limit

</td>
</tr>
<tr>
<td>

`Depth`

</td>
<td>

`"DepthExceeded"`

</td>
<td>

Query exceeds maximum allowed depth

</td>
</tr>
</tbody>
</table>

## Classes

### ComplexityError

Thrown when a query exceeds the complexity limits.

#### Extends

- `GraphQLError`

#### Constructors

##### new ComplexityError()

> **new ComplexityError**(`message`, `options`?): [`ComplexityError`](index.md#complexityerror)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`"Complexity limit exceeded! Please reduce the query's complexity."`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`GraphQLErrorOptions`

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ComplexityError`](index.md#complexityerror)

###### Overrides

`GraphQLError.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`extensions`

</td>
<td>

`readonly`

</td>
<td>

`GraphQLErrorExtensions`

</td>
<td>

Extension fields to add to the formatted error.

</td>
<td>

`GraphQLError.extensions`

</td>
</tr>
<tr>
<td>

`locations`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| readonly `SourceLocation`[]

</td>
<td>

An array of `{ line, column }` locations within the source GraphQL document
which correspond to this error.

Errors during validation often contain multiple locations, for example to
point out two things with the same name. Errors during execution include a
single location, the field which produced the error.

Enumerable, and appears in the result of JSON.stringify().

</td>
<td>

`GraphQLError.locations`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.message`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.name`

</td>
</tr>
<tr>
<td>

`nodes`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| readonly `ASTNode`[]

</td>
<td>

An array of GraphQL AST Nodes corresponding to this error.

</td>
<td>

`GraphQLError.nodes`

</td>
</tr>
<tr>
<td>

`originalError`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| `Error`

</td>
<td>

The original error thrown from a field resolver during execution.

</td>
<td>

`GraphQLError.originalError`

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| readonly (`string` \| `number`)[]

</td>
<td>

An array describing the JSON-path into the execution response which
corresponds to this error. Only included for errors during execution.

Enumerable, and appears in the result of JSON.stringify().

</td>
<td>

`GraphQLError.path`

</td>
</tr>
<tr>
<td>

`positions`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| readonly `number`[]

</td>
<td>

An array of character offsets within the source GraphQL document
which correspond to this error.

</td>
<td>

`GraphQLError.positions`

</td>
</tr>
<tr>
<td>

`source`

</td>
<td>

`readonly`

</td>
<td>

`undefined` \| `Source`

</td>
<td>

The source GraphQL document for the first location of this error.

Note that if this Error represents more than one node, the source may not
represent nodes after the first node.

</td>
<td>

`GraphQLError.source`

</td>
</tr>
<tr>
<td>

`cause?`

</td>
<td>

`public`

</td>
<td>

`unknown`

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.cause`

</td>
</tr>
<tr>
<td>

`stack?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.stack`

</td>
</tr>
</tbody>
</table>

#### Accessors

##### \[toStringTag\]

###### Get Signature

> **get** **\[toStringTag\]**(): `string`

###### Returns

`string`

###### Inherited from

`GraphQLError.[toStringTag]`

#### Methods

##### toJSON()

> **toJSON**(): `GraphQLFormattedError`

###### Returns

`GraphQLFormattedError`

###### Inherited from

`GraphQLError.toJSON`

##### toString()

> **toString**(): `string`

Returns a string representation of an object.

###### Returns

`string`

###### Inherited from

`GraphQLError.toString`

## Interfaces

### ComplexityExtensionOptions\<Context\>

Configuration options for the complexity extension.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`complexityError?`

</td>
<td>

[`GetComplexityError`](index.md#getcomplexityerror)

</td>
<td>

`undefined`

</td>
<td>

Custom error message generator

</td>
</tr>
<tr>
<td>

`defaultComplexity?`

</td>
<td>

`number`

</td>
<td>

```ts
1;
```

</td>
<td>

Base complexity score for fields

</td>
</tr>
<tr>
<td>

`defaultListMultiplier?`

</td>
<td>

`number`

</td>
<td>

```ts
10;
```

</td>
<td>

Multiplier applied to list fields

</td>
</tr>
<tr>
<td>

`limit?`

</td>
<td>

[`GetComplexityLimit`](index.md#getcomplexitylimitcontext)\<`Context`\>

</td>
<td>

`undefined`

</td>
<td>

Static limits or function to determine limits based on context

</td>
</tr>
</tbody>
</table>

---

### ComplexityLimit

Configuration for query complexity limits.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`breadth?`

</td>
<td>

`number`

</td>
<td>

Maximum allowed fields per level

</td>
</tr>
<tr>
<td>

`complexity?`

</td>
<td>

`number`

</td>
<td>

Maximum allowed total complexity score

</td>
</tr>
<tr>
<td>

`depth?`

</td>
<td>

`number`

</td>
<td>

Maximum allowed query depth

</td>
</tr>
</tbody>
</table>

## Type Aliases

### FieldSettings

> **FieldSettings**: `object`

Configuration for field complexity calculation.

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`complexity`?

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`multiplier`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

---

### GetComplexityError()

> **GetComplexityError**: (`kind`, `limits`, `results`) => `GraphQLError`

Function type for creating custom complexity error messages.

#### Parameters

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

`kind`

</td>
<td>

[`ComplexityErrorKind`](index.md#complexityerrorkind)

</td>
<td>

The type of complexity limit that was exceeded

</td>
</tr>
<tr>
<td>

`limits`

</td>
<td>

`number`

</td>
<td>

The maximum allowed value

</td>
</tr>
<tr>
<td>

`results`

</td>
<td>

`number`

</td>
<td>

The actual value that exceeded the limit

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLError`

A GraphQL error with a custom message

---

### GetComplexityLimit\<Context\>

> **GetComplexityLimit**\<`Context`\>: [`ComplexityLimit`](index.md#complexitylimit) \| (`ctx`) => [`ComplexityLimit`](index.md#complexitylimit) \| `Promise`\<[`ComplexityLimit`](index.md#complexitylimit)\>

Function to determine complexity limits, can be static or context-based.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

---

### GetFieldSettings()\<Context, Args\>

> **GetFieldSettings**\<`Context`, `Args`\>: (`params`) => [`FieldSettings`](index.md#fieldsettings) \| `false`

Function to determine complexity settings for a field.
Returns either field settings or false to disable complexity calculation.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

`params`

</td>
<td>

[`GetFieldSettingsArgs`](index.md#getfieldsettingsargscontext-args)\<`Context`, `Args`\>

</td>
<td>

Object containing field arguments and context

</td>
</tr>
</tbody>
</table>

#### Returns

[`FieldSettings`](index.md#fieldsettings) \| `false`

Field settings object or false

---

### GetFieldSettingsArgs\<Context, Args\>

> **GetFieldSettingsArgs**\<`Context`, `Args`\>: `object`

Arguments passed to field settings functions.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

`Args`

</td>
<td>

Arguments passed to the GraphQL field

</td>
</tr>
<tr>
<td>

`ctx`

</td>
<td>

`Context`

</td>
<td>

Request context

</td>
</tr>
</tbody>
</table>

## Variables

### ComplexityErrorCode

> `const` **ComplexityErrorCode**: `"COMPLEXITY_ERROR"` = `'COMPLEXITY_ERROR'`

Complexity error code

## Functions

### complexityExtension()

> **complexityExtension**\<`Ctx`\>(`options`?): () => `Extension`

Creates a complexity analysis extension for GraphQL queries.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Ctx`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

`options`?

</td>
<td>

[`ComplexityExtensionOptions`](index.md#complexityextensionoptionscontext)\<`Ctx`\>

</td>
<td>

Configuration options for complexity analysis

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

Extension factory function

##### Returns

`Extension`

#### Example

```typescript
const complexity = complexityExtension<Context>({
  defaultComplexity: 1,
  defaultListMultiplier: 10,
  limit: {
    depth: 5,
    breadth: 10,
    complexity: 100,
  },
});
```

## Namespaces

- [ComplexityExtensionMethods](namespaces/ComplexityExtensionMethods.md)
