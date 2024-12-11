# Class: UnauthenticatedError

Thrown when a user attempts to access a resource without authentication.
Results in a 401 HTTP status code.

## Extends

- `GraphQLError`

## Constructors

### new UnauthenticatedError()

> **new UnauthenticatedError**(`message`, `options`?): [`UnauthenticatedError`](UnauthenticatedError.md)

#### Parameters

##### message

`string` = `'Access denied! You need to be authenticated to perform this action!'`

##### options?

`GraphQLErrorOptions`

#### Returns

[`UnauthenticatedError`](UnauthenticatedError.md)

#### Overrides

`GraphQLError.constructor`

## Properties

### extensions

> `readonly` **extensions**: `GraphQLErrorExtensions`

Extension fields to add to the formatted error.

#### Inherited from

`GraphQLError.extensions`

---

### locations

> `readonly` **locations**: `undefined` \| readonly `SourceLocation`[]

An array of `{ line, column }` locations within the source GraphQL document
which correspond to this error.

Errors during validation often contain multiple locations, for example to
point out two things with the same name. Errors during execution include a
single location, the field which produced the error.

Enumerable, and appears in the result of JSON.stringify().

#### Inherited from

`GraphQLError.locations`

---

### message

> **message**: `string`

#### Inherited from

`GraphQLError.message`

---

### name

> **name**: `string`

#### Inherited from

`GraphQLError.name`

---

### nodes

> `readonly` **nodes**: `undefined` \| readonly `ASTNode`[]

An array of GraphQL AST Nodes corresponding to this error.

#### Inherited from

`GraphQLError.nodes`

---

### originalError

> `readonly` **originalError**: `undefined` \| `Error`

The original error thrown from a field resolver during execution.

#### Inherited from

`GraphQLError.originalError`

---

### path

> `readonly` **path**: `undefined` \| readonly (`string` \| `number`)[]

An array describing the JSON-path into the execution response which
corresponds to this error. Only included for errors during execution.

Enumerable, and appears in the result of JSON.stringify().

#### Inherited from

`GraphQLError.path`

---

### positions

> `readonly` **positions**: `undefined` \| readonly `number`[]

An array of character offsets within the source GraphQL document
which correspond to this error.

#### Inherited from

`GraphQLError.positions`

---

### source

> `readonly` **source**: `undefined` \| `Source`

The source GraphQL document for the first location of this error.

Note that if this Error represents more than one node, the source may not
represent nodes after the first node.

#### Inherited from

`GraphQLError.source`

---

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`GraphQLError.cause`

---

### stack?

> `optional` **stack**: `string`

#### Inherited from

`GraphQLError.stack`

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
