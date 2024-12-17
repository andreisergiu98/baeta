# @baeta/errors

## Enumerations

### BaetaErrorCode

Standard error codes used across the Baeta framework.

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

`AggregateError`

</td>
<td>

`"AGGREGATE_ERROR"`

</td>
<td>

Multiple errors occurred simultaneously

</td>
</tr>
<tr>
<td>

`BadUserInput`

</td>
<td>

`"BAD_USER_INPUT"`

</td>
<td>

Invalid input provided by the user

</td>
</tr>
<tr>
<td>

`Forbidden`

</td>
<td>

`"FORBIDDEN"`

</td>
<td>

User is authenticated but lacks required permissions

</td>
</tr>
<tr>
<td>

`InternalServerError`

</td>
<td>

`"INTERNAL_SERVER_ERROR"`

</td>
<td>

Unexpected server-side error

</td>
</tr>
<tr>
<td>

`Unauthenticated`

</td>
<td>

`"UNAUTHENTICATED"`

</td>
<td>

Authentication is required but was not provided

</td>
</tr>
</tbody>
</table>

## Classes

### AggregateGraphQLError

Represents multiple GraphQL errors that occurred simultaneously.
Useful for batch operations where multiple errors need to be reported.

#### Extends

- `GraphQLError`

#### Constructors

##### new AggregateGraphQLError()

> **new AggregateGraphQLError**(`errors`, `message`, `options`?): [`AggregateGraphQLError`](index.md#aggregategraphqlerror)

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

`errors`

</td>
<td>

`GraphQLError`[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`'Multiple errors encountered'`

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

[`AggregateGraphQLError`](index.md#aggregategraphqlerror)

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

---

### BadUserInput

Thrown when the user provides invalid input data.

#### Extends

- `GraphQLError`

#### Constructors

##### new BadUserInput()

> **new BadUserInput**(`message`, `options`?): [`BadUserInput`](index.md#baduserinput-1)

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

`'Invalid user input!'`

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

[`BadUserInput`](index.md#baduserinput-1)

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

---

### ForbiddenError

Thrown when an authenticated user lacks the required permissions.

#### Extends

- `GraphQLError`

#### Constructors

##### new ForbiddenError()

> **new ForbiddenError**(`message`, `options`?): [`ForbiddenError`](index.md#forbiddenerror)

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

`"Access denied! You don't have permission to perform this action!"`

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

[`ForbiddenError`](index.md#forbiddenerror)

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

---

### InternalServerError

Thrown when an unexpected server-side error occurs.
In development mode, includes the original error message and stack trace.
In production, shows a generic error message.

#### Extends

- `GraphQLError`

#### Constructors

##### new InternalServerError()

> **new InternalServerError**(`err`, `message`, `options`?): [`InternalServerError`](index.md#internalservererror-1)

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

`err`

</td>
<td>

`Error`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`'Internal server error!'`

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

[`InternalServerError`](index.md#internalservererror-1)

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

---

### UnauthenticatedError

Thrown when a user attempts to access a resource without authentication.
Results in a 401 HTTP status code.

#### Extends

- `GraphQLError`

#### Constructors

##### new UnauthenticatedError()

> **new UnauthenticatedError**(`message`, `options`?): [`UnauthenticatedError`](index.md#unauthenticatederror)

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

`'Access denied! You need to be authenticated to perform this action!'`

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

[`UnauthenticatedError`](index.md#unauthenticatederror)

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
