# Class: ModuleBuilder

## Constructors

### new ModuleBuilder()

> **new ModuleBuilder**(`id`, `dirname`, `hashes`, `typedef`, `extensions`): [`ModuleBuilder`](ModuleBuilder.md)

#### Parameters

• **id**: `string`

• **dirname**: `string`

• **hashes**: [`TypeHashMap`](../type-aliases/TypeHashMap.md)

• **typedef**: `DocumentNode`

• **extensions**: [`Extension`](Extension.md)[]

#### Returns

[`ModuleBuilder`](ModuleBuilder.md)

#### Defined in

[sdk/module.ts:35](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L35)

## Properties

### dirname

> `readonly` **dirname**: `string`

#### Defined in

[sdk/module.ts:37](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L37)

***

### hashes

> `readonly` **hashes**: [`TypeHashMap`](../type-aliases/TypeHashMap.md)

#### Defined in

[sdk/module.ts:38](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L38)

***

### id

> `readonly` **id**: `string`

#### Defined in

[sdk/module.ts:36](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L36)

***

### mapper

> `readonly` **mapper**: [`ResolverMapper`](ResolverMapper.md)

#### Defined in

[sdk/module.ts:32](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L32)

***

### transformers

> `readonly` **transformers**: [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[] = `[]`

#### Defined in

[sdk/module.ts:33](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L33)

***

### typedef

> `readonly` **typedef**: `DocumentNode`

#### Defined in

[sdk/module.ts:39](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L39)

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

• **schema**: `GraphQLSchema`

###### Returns

`GraphQLSchema`

##### typedef

> **typedef**: `DocumentNode`

#### Defined in

[sdk/module.ts:197](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L197)

***

### createMiddlewareBuilder()

> **createMiddlewareBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`middleware`) => `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

`Function`

##### Parameters

• **middleware**: [`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Root`, `Context`, `Args`\>

##### Returns

`void`

#### Defined in

[sdk/module.ts:119](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L119)

***

### createModuleMethods()

> **createModuleMethods**\<`Context`\>(): `ModuleExtensions` & `object`

#### Type Parameters

• **Context**

#### Returns

`ModuleExtensions` & `object`

#### Defined in

[sdk/module.ts:141](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L141)

***

### createResolverBuilder()

> **createResolverBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`resolver`) => `void` & `ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\> & `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

(`resolver`) => `void` & `ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\> & `object`

#### Defined in

[sdk/module.ts:43](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L43)

***

### createResolveType()

> **createResolveType**\<`Result`, `Value`, `Context`\>(`type`): (`resolver`) => `void`

#### Type Parameters

• **Result**

• **Value**

• **Context**

#### Parameters

• **type**: `string`

#### Returns

`Function`

##### Parameters

• **resolver**: [`TypeResolver`](../../index/type-aliases/TypeResolver.md)\<`Result`, `Value`, `Context`\>

##### Returns

`void`

#### Defined in

[sdk/module.ts:111](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L111)

***

### createScalarBuilder()

> **createScalarBuilder**(`scalar`): (`resolver`) => `void`

#### Parameters

• **scalar**: `string`

#### Returns

`Function`

##### Parameters

• **resolver**: [`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

##### Returns

`void`

#### Defined in

[sdk/module.ts:104](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L104)

***

### createSubscriptionBuilder()

> **createSubscriptionBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`field`): \<`Payload`\>(`subscription`) => `void` & `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **field**: `string`

#### Returns

\<`Payload`\>(`subscription`) => `void` & `object`

#### Defined in

[sdk/module.ts:63](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L63)

***

### createSubscriptionMethods()

> **createSubscriptionMethods**\<`Root`, `Context`\>(): `TypeExtensions`\<`Root`, `Context`\> & `object` & `object`

#### Type Parameters

• **Root**

• **Context**

#### Returns

`TypeExtensions`\<`Root`, `Context`\> & `object` & `object`

#### Defined in

[sdk/module.ts:134](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L134)

***

### createTypeMethods()

> **createTypeMethods**\<`Root`, `Context`\>(`type`): `TypeExtensions`\<`Root`, `Context`\> & `object`

#### Type Parameters

• **Root**

• **Context**

#### Parameters

• **type**: `string`

#### Returns

`TypeExtensions`\<`Root`, `Context`\> & `object`

#### Defined in

[sdk/module.ts:127](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/module.ts#L127)
