# index

## Interfaces

### ContextStoreOptions

Configuration options for the context store.

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

<a id="lazy"></a> `lazy?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true;
```

</td>
<td>

Whether to load the value lazily (on first access) or eagerly (immediately).

</td>
</tr>
</tbody>
</table>

---

### Options

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

<a id="modules"></a> `modules`

</td>
<td>

`Record`\<`string`, `unknown`\>[]

</td>
<td>

`undefined`

</td>
<td>

Array of module objects to include in the application.

**Example**

```typescript
const modules = [userModule, postModule, commentModule];
```

</td>
</tr>
<tr>
<td>

<a id="executableschemaoptions"></a> `executableSchemaOptions?`

</td>
<td>

[`ExecutableSchemaOptions`](#executableschemaoptions-1)

</td>
<td>

`undefined`

</td>
<td>

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

</td>
</tr>
<tr>
<td>

<a id="pruneschema"></a> `pruneSchema?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false;
```

</td>
<td>

When true, removes fields that don't have corresponding resolvers.

</td>
</tr>
</tbody>
</table>

## Type Aliases

### ExecutableSchemaOptions

> **ExecutableSchemaOptions** = `Omit`\<`IExecutableSchemaDefinition`, `"typeDefs"` \| `"resolvers"`\>

---

### InputDirectiveOptions\<DirectiveConfig, Context\>

> **InputDirectiveOptions**\<`DirectiveConfig`, `Context`\> = `object`

Configuration options for creating an input directive.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`DirectiveConfig`

</td>
<td>

Type of the directive arguments

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

Type of the context

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

Name of the directive as it appears in the GraphQL schema (without '@' prefix)

**Example**

```ts
'trim' for '@trim' directive
```

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

[`ValidationDirectiveFn`](#validationdirectivefn)\<`DirectiveConfig`, `Context`\>

</td>
<td>

Function that implements the directive's validation/transformation logic

</td>
</tr>
<tr>
<td>

<a id="target"></a> `target`

</td>
<td>

[`ValidationTarget`](#validationtarget)

</td>
<td>

Validation target indicating when the directive should be applied

</td>
</tr>
<tr>
<td>

<a id="getlistdepth"></a> `getListDepth?`

</td>
<td>

(`config`) => `number`

</td>
<td>

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

</td>
</tr>
</tbody>
</table>

---

### Middleware()\<Result, Root, Context, Args\>

> **Middleware**\<`Result`, `Root`, `Context`, `Args`\> = (`params`, `next`) => `Promise`\<`Result`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`MiddlewareParams`](#middlewareparams)\<`Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

[`MiddlewareNext`](#middlewarenext)\<`Result`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`Result`\>

---

### MiddlewareNext()\<T\>

> **MiddlewareNext**\<`T`\> = () => `Promise`\<`T`\>

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

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`T`\>

---

### MiddlewareParams\<Root, Context, Args\>

> **MiddlewareParams**\<`Root`, `Context`, `Args`\> = `object`

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

`Root`

</td>
</tr>
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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args-2"></a> `args`

</td>
<td>

`Args`

</td>
</tr>
<tr>
<td>

<a id="ctx"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="root-2"></a> `root`

</td>
<td>

`Root`

</td>
</tr>
</tbody>
</table>

---

### Resolver()\<Result, Root, Context, Args\>

> **Resolver**\<`Result`, `Root`, `Context`, `Args`\> = (`params`) => `Result` \| `Promise`\<`Result`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`ResolverParams`](#resolverparams)\<`Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Result` \| `Promise`\<`Result`\>

---

### ResolverParams\<Root, Context, Args\>

> **ResolverParams**\<`Root`, `Context`, `Args`\> = `object`

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

`Root`

</td>
</tr>
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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args-5"></a> `args`

</td>
<td>

`Args`

</td>
</tr>
<tr>
<td>

<a id="ctx-1"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info-1"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="root-5"></a> `root`

</td>
<td>

`Root`

</td>
</tr>
</tbody>
</table>

---

### ScalarResolver

> **ScalarResolver** = `GraphQLScalarType`\<`unknown`, `unknown`\>

---

### Subscribe()\<Payload, Root, Context, Args\>

> **Subscribe**\<`Payload`, `Root`, `Context`, `Args`\> = (`params`) => `AsyncIterator`\<`Payload`\> \| `Promise`\<`AsyncIterator`\<`Payload`\>\>

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

`Payload`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`SubscribeParams`](#subscribeparams)\<`Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`AsyncIterator`\<`Payload`\> \| `Promise`\<`AsyncIterator`\<`Payload`\>\>

---

### SubscribeParams\<Root, Context, Args\>

> **SubscribeParams**\<`Root`, `Context`, `Args`\> = `object`

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

`Root`

</td>
</tr>
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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args-8"></a> `args`

</td>
<td>

`Args`

</td>
</tr>
<tr>
<td>

<a id="ctx-2"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info-2"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="root-8"></a> `root`

</td>
<td>

`Root`

</td>
</tr>
</tbody>
</table>

---

### SubscribeResolve()\<Result, Payload, Context, Args\>

> **SubscribeResolve**\<`Result`, `Payload`, `Context`, `Args`\> = (`params`) => `Result` \| `Promise`\<`Result`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Payload`

</td>
</tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`SubscribeResolveParams`](#subscriberesolveparams)\<`Payload`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Result` \| `Promise`\<`Result`\>

---

### SubscribeResolveParams\<Payload, Context, Args\>

> **SubscribeResolveParams**\<`Payload`, `Context`, `Args`\> = `object`

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

`Payload`

</td>
</tr>
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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args-11"></a> `args`

</td>
<td>

`Args`

</td>
</tr>
<tr>
<td>

<a id="ctx-3"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info-3"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="payload-3"></a> `payload`

</td>
<td>

`Payload`

</td>
</tr>
</tbody>
</table>

---

### Subscription\<Payload, Result, Root, Context, Args\>

> **Subscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\> = `object`

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

`Payload`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="resolve-1"></a> `resolve`

</td>
<td>

[`SubscribeResolve`](#subscriberesolve)\<`Result`, `Payload`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

<a id="subscribe-1"></a> `subscribe`

</td>
<td>

[`Subscribe`](#subscribe)\<`Payload`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

---

### TypeResolver()\<Result, Value, Context\>

> **TypeResolver**\<`Result`, `Value`, `Context`\> = (`params`) => `Result` \| `Promise`\<`Result`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Value`

</td>
</tr>
<tr>
<td>

`Context`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`TypeResolverParams`](#typeresolverparams)\<`Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Result` \| `Promise`\<`Result`\>

---

### TypeResolverParams\<Value, Context\>

> **TypeResolverParams**\<`Value`, `Context`\> = `object`

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

`Value`

</td>
</tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="ctx-4"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info-4"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`GraphQLAbstractType`

</td>
</tr>
<tr>
<td>

<a id="value-2"></a> `value`

</td>
<td>

`Value`

</td>
</tr>
</tbody>
</table>

---

### ValidateParams\<Context\>

> **ValidateParams**\<`Context`\> = `object`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args-13"></a> `args`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
<tr>
<td>

<a id="ctx-5"></a> `ctx`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

<a id="info-5"></a> `info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
<tr>
<td>

<a id="path"></a> `path`

</td>
<td>

(`number` \| `string`)[]

</td>
</tr>
<tr>
<td>

<a id="root-10"></a> `root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

<a id="type-1"></a> `type`

</td>
<td>

`GraphQLType`

</td>
</tr>
</tbody>
</table>

---

### ValidationDirectiveFn()\<DirectiveConfig, Context\>

> **ValidationDirectiveFn**\<`DirectiveConfig`, `Context`\> = (`params`) => `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`DirectiveConfig`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`ValidationDirectiveFnParams`](#validationdirectivefnparams)\<`DirectiveConfig`, `Context`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### ValidationDirectiveFnParams\<DirectiveConfig, Context\>

> **ValidationDirectiveFnParams**\<`DirectiveConfig`, `Context`\> = [`ValidateParams`](#validateparams)\<`Context`\> & `object`

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

`directiveConfig`

</td>
<td>

`DirectiveConfig`

</td>
</tr>
<tr>
<td>

`getValue()`

</td>
<td>

() => `unknown`

</td>
</tr>
<tr>
<td>

`setValue()`

</td>
<td>

(`newValue`) => `void`

</td>
</tr>
</tbody>
</table>

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

`DirectiveConfig`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

---

### ValidationTarget

> **ValidationTarget** = `"list"` \| `"object"` \| `"scalar"`

## Functions

### createApplication()

> **createApplication**(`options`): `object`

Creates a Baeta application by combining the modules.

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

`options`

</td>
<td>

[`Options`](#options)

</td>
<td>

Configuration options for the application

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

An object containing the GraphQL schema

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

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
const baeta = createApplication({
  modules: [userModule, postModule],
});

const { schema } = baeta;
```

---

### createContextStore()

> **createContextStore**\<`T`, `Context`\>(`key`, `options?`): readonly \[(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`\]

Creates a context store for managing asynchronous values within a context object.
See https://baeta.io/docs/guides/context-store

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

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

`key`

</td>
<td>

`symbol`

</td>
<td>

A unique symbol to identify the stored value in the context

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`ContextStoreOptions`](#contextstoreoptions)

</td>
<td>

Configuration options for the store

</td>
</tr>
</tbody>
</table>

#### Returns

readonly \[(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`\]

A tuple containing get and load functions for managing the stored value

#### Example

```typescript
// Create a store for user data
const userStoreKey = Symbol("userStore");
const [getUser, loadUser] = createContextStore<User>(userStoreKey, {
  lazy: true,
});

// Initialize the store when you create the context
loadUser(ctx, async () => {
  return fetchUser(userId);
});

// Later, retrieve the user in a resolver
const user = await getUser(ctx);
```

---

### createExtensions()

> **createExtensions**(...`extensions`): () => [`Extension`](../sdk/core/sdk.md#extension)[]

Creates a collection of Baeta extensions to be used in modules.
The result must be exported as default, and the file path registered in `baeta.ts`.
See https://baeta.io/docs/extensions/

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

...`extensions`

</td>
<td>

() => [`Extension`](../sdk/core/sdk.md#extension)[]

</td>
<td>

Array of extension factory functions

</td>
</tr>
</tbody>
</table>

#### Returns

() => [`Extension`](../sdk/core/sdk.md#extension)[]

Array of extension factory functions that can be used by Baeta modules

#### Example

```typescript
// auth-extension.ts
export const authExt = authExtension(...);

// cache-extension.ts
export const cacheExt = cacheExtension(...);

// extensions.ts
import { createExtensions } from '@baeta/core';
import { authExt } from './auth-extension.ts';
import { cacheExt } from './cache-extension.ts';

export default createExtensions(authExt, cacheExt);
```

#### Remarks

Extensions are executed in the order they are provided.

---

### createInputDirective()

> **createInputDirective**\<`DirectiveConfig`, `Context`\>(`options`): (`schema`) => `GraphQLSchema`

Creates a schema transformer that applies an input directive to a GraphQL schema.
The directive can be used to validate or transform input fields, arguments, and input types.
See https://baeta.io/docs/guides/directives and https://baeta.io/docs/guides/input-directives

#### Type Parameters

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

`options`

</td>
<td>

[`InputDirectiveOptions`](#inputdirectiveoptions)\<`DirectiveConfig`, `Context`\>

</td>
<td>

Configuration options for the input directive

</td>
</tr>
</tbody>
</table>

#### Returns

A function that transforms a GraphQL schema by applying the directive

> (`schema`): `GraphQLSchema`

##### Parameters

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

##### Returns

`GraphQLSchema`

#### Example

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
