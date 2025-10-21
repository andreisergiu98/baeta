# ForbiddenError

Thrown when an authenticated user lacks the required permissions.

## Extends

- `GraphQLError`

## Constructors

### Constructor

> **new ForbiddenError**(`message`, `options?`): `ForbiddenError`

#### Parameters

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

`"Access denied! You don't have permission to perform this action!"`

</td>
</tr>
<tr>
<td>

`options?`

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

#### Returns

`ForbiddenError`

#### Overrides

`GraphQLError.constructor`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="extensions"></a> `extensions`

</td>
<td>

`readonly`

</td>
<td>

`GraphQLErrorExtensions` & `object`

</td>
<td>

Extension fields to add to the formatted error.

</td>
<td>

`GraphQLError.extensions`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="locations"></a> `locations`

</td>
<td>

`readonly`

</td>
<td>

readonly `SourceLocation`[] \| `undefined`

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

&hyphen;

</td>
<td>

`GraphQLError.locations`

</td>
</tr>
<tr>
<td>

<a id="message"></a> `message`

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

&hyphen;

</td>
<td>

`GraphQLError.message`

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

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

&hyphen;

</td>
<td>

`GraphQLError.name`

</td>
</tr>
<tr>
<td>

<a id="nodes"></a> `nodes`

</td>
<td>

`readonly`

</td>
<td>

readonly `ASTNode`[] \| `undefined`

</td>
<td>

An array of GraphQL AST Nodes corresponding to this error.

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.nodes`

</td>
</tr>
<tr>
<td>

<a id="originalerror"></a> `originalError`

</td>
<td>

`readonly`

</td>
<td>

`Error` \| `undefined`

</td>
<td>

The original error thrown from a field resolver during execution.

</td>
<td>

&hyphen;

</td>
<td>

[`AggregateGraphQLError`](AggregateGraphQLError.md).[`originalError`](AggregateGraphQLError.md#originalerror)

</td>
</tr>
<tr>
<td>

<a id="path"></a> `path`

</td>
<td>

`readonly`

</td>
<td>

readonly (`string` \| `number`)[] \| `undefined`

</td>
<td>

An array describing the JSON-path into the execution response which
corresponds to this error. Only included for errors during execution.

Enumerable, and appears in the result of JSON.stringify().

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.path`

</td>
</tr>
<tr>
<td>

<a id="positions"></a> `positions`

</td>
<td>

`readonly`

</td>
<td>

readonly `number`[] \| `undefined`

</td>
<td>

An array of character offsets within the source GraphQL document
which correspond to this error.

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.positions`

</td>
</tr>
<tr>
<td>

<a id="source"></a> `source`

</td>
<td>

`readonly`

</td>
<td>

`Source` \| `undefined`

</td>
<td>

The source GraphQL document for the first location of this error.

Note that if this Error represents more than one node, the source may not
represent nodes after the first node.

</td>
<td>

&hyphen;

</td>
<td>

`GraphQLError.source`

</td>
</tr>
<tr>
<td>

<a id="cause"></a> `cause?`

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

&hyphen;

</td>
<td>

`GraphQLError.cause`

</td>
</tr>
<tr>
<td>

<a id="stack"></a> `stack?`

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

&hyphen;

</td>
<td>

`GraphQLError.stack`

</td>
</tr>
</tbody>
</table>

## Accessors

### \[toStringTag\]

#### Get Signature

> **get** **\[toStringTag\]**(): `string`

##### Returns

`string`

#### Inherited from

`GraphQLError.[toStringTag]`

## Methods

### toJSON()

> **toJSON**(): `GraphQLFormattedError`

#### Returns

`GraphQLFormattedError`

#### Inherited from

`GraphQLError.toJSON`

---

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Inherited from

`GraphQLError.toString`
