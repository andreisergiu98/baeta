# Class: ResolverMapper

## Constructors

### new ResolverMapper()

> **new ResolverMapper**(): [`ResolverMapper`](ResolverMapper.md)

#### Returns

[`ResolverMapper`](ResolverMapper.md)

## Properties

### middlewares

> `readonly` **middlewares**: [`MiddlewareMap`](../type-aliases/MiddlewareMap.md)

#### Defined in

[sdk/resolver-mapper.ts:28](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L28)

***

### resolvers

> `readonly` **resolvers**: [`ResolversMap`](../type-aliases/ResolversMap.md)

#### Defined in

[sdk/resolver-mapper.ts:27](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L27)

***

### scalars

> `readonly` **scalars**: [`ScalarsMap`](../type-aliases/ScalarsMap.md)

#### Defined in

[sdk/resolver-mapper.ts:26](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L26)

***

### typeFields

> `readonly` **typeFields**: `Record`\<`string`, `undefined` \| `string`[]\>

#### Defined in

[sdk/resolver-mapper.ts:31](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L31)

***

### types

> `readonly` **types**: `string`[] = `[]`

#### Defined in

[sdk/resolver-mapper.ts:30](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L30)

## Methods

### addMiddleware()

> **addMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`, `unshift`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

• **middleware**: [`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

• **unshift**: `boolean` = `false`

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:70](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L70)

***

### compose()

> **compose**(): `IResolvers`

#### Returns

`IResolvers`

#### Defined in

[sdk/resolver-mapper.ts:124](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L124)

***

### getTypeFields()

> **getTypeFields**(`type`): `string`[]

#### Parameters

• **type**: `string`

#### Returns

`string`[]

#### Defined in

[sdk/resolver-mapper.ts:37](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L37)

***

### getTypes()

> **getTypes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[sdk/resolver-mapper.ts:33](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L33)

***

### registerTypeField()

> **registerTypeField**(`type`, `field`): `void`

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:113](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L113)

***

### setDefaultFieldResolver()

> **setDefaultFieldResolver**(`type`, `field`): `void`

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:103](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L103)

***

### setResolver()

> **setResolver**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `resolver`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

• **resolver**: [`NativeResolver`](../type-aliases/NativeResolver.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:41](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L41)

***

### setScalar()

> **setScalar**(`scalar`, `resolver`): `void`

#### Parameters

• **scalar**: `string`

• **resolver**: [`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:50](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L50)

***

### setSubscription()

> **setSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>(`field`, `resolver`): `void`

#### Type Parameters

• **Payload**

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **field**: `string`

• **resolver**: [`NativeSubscription`](../type-aliases/NativeSubscription.md)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:54](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L54)

***

### setTypenameResolver()

> **setTypenameResolver**\<`Result`, `Value`, `Context`\>(`type`, `resolver`): `void`

#### Type Parameters

• **Result**

• **Value**

• **Context**

#### Parameters

• **type**: `string`

• **resolver**: [`NativeTypeResolver`](../type-aliases/NativeTypeResolver.md)\<`Result`, `Value`, `Context`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:62](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/resolver-mapper.ts#L62)
