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

[sdk/module.ts:32](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L32)

## Properties

### dirname

> `readonly` **dirname**: `string`

#### Defined in

[sdk/module.ts:34](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L34)

***

### hashes

> `readonly` **hashes**: [`TypeHashMap`](../type-aliases/TypeHashMap.md)

#### Defined in

[sdk/module.ts:35](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L35)

***

### id

> `readonly` **id**: `string`

#### Defined in

[sdk/module.ts:33](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L33)

***

### mapper

> `readonly` **mapper**: [`ResolverMapper`](ResolverMapper.md)

#### Defined in

[sdk/module.ts:29](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L29)

***

### transformers

> `readonly` **transformers**: [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[] = `[]`

#### Defined in

[sdk/module.ts:30](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L30)

***

### typedef

> `readonly` **typedef**: `DocumentNode`

#### Defined in

[sdk/module.ts:36](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L36)

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

[sdk/module.ts:194](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L194)

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

[sdk/module.ts:116](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L116)

***

### createModuleMethods()

> **createModuleMethods**\<`Context`\>(): `ModuleExtensions` & `object`

#### Type Parameters

• **Context**

#### Returns

`ModuleExtensions` & `object`

#### Defined in

[sdk/module.ts:138](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L138)

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

[sdk/module.ts:40](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L40)

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

[sdk/module.ts:108](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L108)

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

[sdk/module.ts:101](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L101)

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

[sdk/module.ts:60](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L60)

***

### createSubscriptionMethods()

> **createSubscriptionMethods**\<`Root`, `Context`\>(): `TypeExtensions`\<`Root`, `Context`\> & `object` & `object`

#### Type Parameters

• **Root**

• **Context**

#### Returns

`TypeExtensions`\<`Root`, `Context`\> & `object` & `object`

#### Defined in

[sdk/module.ts:131](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L131)

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

[sdk/module.ts:124](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/module.ts#L124)
