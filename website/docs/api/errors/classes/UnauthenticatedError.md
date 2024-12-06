# Class: UnauthenticatedError

## Extends

- `GraphQLError`

## Constructors

### new UnauthenticatedError()

> **new UnauthenticatedError**(`message`, `options`?): [`UnauthenticatedError`](UnauthenticatedError.md)

#### Parameters

• **message**: `string` = `'Access denied! You need to be authenticated to perform this action!'`

• **options?**: `GraphQLErrorOptions`

#### Returns

[`UnauthenticatedError`](UnauthenticatedError.md)

#### Overrides

`GraphQLError.constructor`

#### Defined in

[packages/errors/index.ts:16](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/errors/index.ts#L16)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`GraphQLError.cause`

#### Defined in

.yarn/cache/typescript-patch-aed9e5263d-d75ca10141.zip/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

***

### extensions

> `readonly` **extensions**: `GraphQLErrorExtensions`

Extension fields to add to the formatted error.

#### Inherited from

`GraphQLError.extensions`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:77

***

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

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:46

***

### message

> **message**: `string`

#### Inherited from

`GraphQLError.message`

#### Defined in

.yarn/cache/typescript-patch-aed9e5263d-d75ca10141.zip/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`GraphQLError.name`

#### Defined in

.yarn/cache/typescript-patch-aed9e5263d-d75ca10141.zip/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### nodes

> `readonly` **nodes**: `undefined` \| readonly `ASTNode`[]

An array of GraphQL AST Nodes corresponding to this error.

#### Inherited from

`GraphQLError.nodes`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:57

***

### originalError

> `readonly` **originalError**: `undefined` \| `Error`

The original error thrown from a field resolver during execution.

#### Inherited from

`GraphQLError.originalError`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:73

***

### path

> `readonly` **path**: `undefined` \| readonly (`string` \| `number`)[]

An array describing the JSON-path into the execution response which
corresponds to this error. Only included for errors during execution.

Enumerable, and appears in the result of JSON.stringify().

#### Inherited from

`GraphQLError.path`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:53

***

### positions

> `readonly` **positions**: `undefined` \| readonly `number`[]

An array of character offsets within the source GraphQL document
which correspond to this error.

#### Inherited from

`GraphQLError.positions`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:69

***

### source

> `readonly` **source**: `undefined` \| `Source`

The source GraphQL document for the first location of this error.

Note that if this Error represents more than one node, the source may not
represent nodes after the first node.

#### Inherited from

`GraphQLError.source`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:64

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`GraphQLError.stack`

#### Defined in

.yarn/cache/typescript-patch-aed9e5263d-d75ca10141.zip/node\_modules/typescript/lib/lib.es5.d.ts:1078

## Accessors

### \[toStringTag\]

#### Get Signature

> **get** **\[toStringTag\]**(): `string`

##### Returns

`string`

#### Inherited from

`GraphQLError.[toStringTag]`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:95

## Methods

### toJSON()

> **toJSON**(): `GraphQLFormattedError`

#### Returns

`GraphQLFormattedError`

#### Inherited from

`GraphQLError.toJSON`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:97

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Inherited from

`GraphQLError.toString`

#### Defined in

.yarn/cache/graphql-npm-16.9.0-a36f71845f-5833f82bb6.zip/node\_modules/graphql/error/GraphQLError.d.ts:96
