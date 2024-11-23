# Class: ResolverMapper

## Constructors

### new ResolverMapper()

> **new ResolverMapper**(): [`ResolverMapper`](ResolverMapper.md)

#### Returns

[`ResolverMapper`](ResolverMapper.md)

## Properties

### middlewares

> `readonly` **middlewares**: `MiddlewareMap`

#### Defined in

[sdk/resolver-mapper.ts:19](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L19)

***

### prependedMiddlewares

> `readonly` **prependedMiddlewares**: `MiddlewareMap`

#### Defined in

[sdk/resolver-mapper.ts:20](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L20)

***

### resolvers

> `readonly` **resolvers**: `ResolversMap`

#### Defined in

[sdk/resolver-mapper.ts:18](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L18)

***

### scalars

> `readonly` **scalars**: `ScalarsMap`

#### Defined in

[sdk/resolver-mapper.ts:17](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L17)

***

### typeFields

> `readonly` **typeFields**: `Record`\<`string`, `undefined` \| `string`[]\>

#### Defined in

[sdk/resolver-mapper.ts:23](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L23)

***

### types

> `readonly` **types**: `string`[] = `[]`

#### Defined in

[sdk/resolver-mapper.ts:22](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L22)

## Methods

### addMiddleware()

> **addMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

• **middleware**: [`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:89](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L89)

***

### addMiddlewareToMap()

> `protected` **addMiddlewareToMap**\<`Result`, `Root`, `Context`, `Args`\>(`map`, `type`, `field`, `middleware`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **map**: `MiddlewareMap`

• **type**: `string`

• **field**: `string`

• **middleware**: [`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:62](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L62)

***

### compose()

> **compose**(): `IResolvers`

#### Returns

`IResolvers`

#### Defined in

[sdk/resolver-mapper.ts:126](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L126)

***

### getTypeFields()

> **getTypeFields**(`type`): `string`[]

#### Parameters

• **type**: `string`

#### Returns

`string`[]

#### Defined in

[sdk/resolver-mapper.ts:29](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L29)

***

### getTypes()

> **getTypes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[sdk/resolver-mapper.ts:25](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L25)

***

### prependMiddleware()

> **prependMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **type**: `string`

• **field**: `string`

• **middleware**: [`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:97](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L97)

***

### registerTypeField()

> **registerTypeField**(`type`, `field`): `void`

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:115](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L115)

***

### setDefaultFieldResolver()

> **setDefaultFieldResolver**(`type`, `field`): `void`

#### Parameters

• **type**: `string`

• **field**: `string`

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:105](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L105)

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

[sdk/resolver-mapper.ts:33](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L33)

***

### setScalar()

> **setScalar**(`scalar`, `resolver`): `void`

#### Parameters

• **scalar**: `string`

• **resolver**: [`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

#### Returns

`void`

#### Defined in

[sdk/resolver-mapper.ts:42](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L42)

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

[sdk/resolver-mapper.ts:46](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L46)

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

[sdk/resolver-mapper.ts:54](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/resolver-mapper.ts#L54)
