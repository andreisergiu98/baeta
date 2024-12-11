# Class: ModuleBuilder

## Constructors

### new ModuleBuilder()

> **new ModuleBuilder**(`id`, `dirname`, `hashes`, `typedef`, `extensions`): [`ModuleBuilder`](ModuleBuilder.md)

#### Parameters

##### id

`string`

##### dirname

`string`

##### hashes

[`TypeHashMap`](../type-aliases/TypeHashMap.md)

##### typedef

`DocumentNode`

##### extensions

[`Extension`](Extension.md)[]

#### Returns

[`ModuleBuilder`](ModuleBuilder.md)

## Properties

### dirname

> `readonly` **dirname**: `string`

---

### hashes

> `readonly` **hashes**: [`TypeHashMap`](../type-aliases/TypeHashMap.md)

---

### id

> `readonly` **id**: `string`

---

### mapper

> `readonly` **mapper**: [`ResolverMapper`](ResolverMapper.md)

---

### transformers

> `readonly` **transformers**: [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[] = `[]`

---

### typedef

> `readonly` **typedef**: `DocumentNode`

## Methods

### build()

> **build**(): `object`

#### Returns

`object`

##### resolvers

> **resolvers**: `IResolvers`

##### transform()

> **transform**: (`schema`) => `GraphQLSchema`

###### Parameters

###### schema

`GraphQLSchema`

###### Returns

`GraphQLSchema`

##### typedef

> **typedef**: `DocumentNode`

---

### createMiddlewareBuilder()

> **createMiddlewareBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`middleware`) => `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### type

`string`

##### field

`string`

#### Returns

`Function`

##### Parameters

###### middleware

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Root`, `Context`, `Args`\>

##### Returns

`void`

---

### createModuleMethods()

> **createModuleMethods**\<`Context`\>(): [`ModuleExtensions`](../namespaces/BaetaExtensions/interfaces/ModuleExtensions.md) & `object`

#### Type Parameters

• **Context**

#### Returns

[`ModuleExtensions`](../namespaces/BaetaExtensions/interfaces/ModuleExtensions.md) & `object`

---

### createResolverBuilder()

> **createResolverBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`resolver`) => `void` & [`ResolverExtensions`](../namespaces/BaetaExtensions/interfaces/ResolverExtensions.md)\<`Result`, `Root`, `Context`, `Args`\> & `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### type

`string`

##### field

`string`

#### Returns

(`resolver`) => `void` & [`ResolverExtensions`](../namespaces/BaetaExtensions/interfaces/ResolverExtensions.md)\<`Result`, `Root`, `Context`, `Args`\> & `object`

---

### createResolveType()

> **createResolveType**\<`Result`, `Value`, `Context`\>(`type`): (`resolver`) => `void`

#### Type Parameters

• **Result**

• **Value**

• **Context**

#### Parameters

##### type

`string`

#### Returns

`Function`

##### Parameters

###### resolver

[`TypeResolver`](../../index/type-aliases/TypeResolver.md)\<`Result`, `Value`, `Context`\>

##### Returns

`void`

---

### createScalarBuilder()

> **createScalarBuilder**(`scalar`): (`resolver`) => `void`

#### Parameters

##### scalar

`string`

#### Returns

`Function`

##### Parameters

###### resolver

[`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

##### Returns

`void`

---

### createSubscriptionBuilder()

> **createSubscriptionBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`field`): \<`Payload`\>(`subscription`) => `void` & `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### field

`string`

#### Returns

\<`Payload`\>(`subscription`) => `void` & `object`

---

### createSubscriptionMethods()

> **createSubscriptionMethods**\<`Root`, `Context`\>(): [`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object` & `object`

#### Type Parameters

• **Root**

• **Context**

#### Returns

[`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object` & `object`

---

### createTypeMethods()

> **createTypeMethods**\<`Root`, `Context`\>(`type`): [`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object`

#### Type Parameters

• **Root**

• **Context**

#### Parameters

##### type

`string`

#### Returns

[`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object`
