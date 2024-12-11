# Class: ResolverMapper

## Constructors

### new ResolverMapper()

> **new ResolverMapper**(): [`ResolverMapper`](ResolverMapper.md)

#### Returns

[`ResolverMapper`](ResolverMapper.md)

## Properties

### middlewares

> `readonly` **middlewares**: `MiddlewareMap`

---

### prependedMiddlewares

> `readonly` **prependedMiddlewares**: `MiddlewareMap`

---

### resolvers

> `readonly` **resolvers**: `ResolversMap`

---

### scalars

> `readonly` **scalars**: `ScalarsMap`

---

### typeFields

> `readonly` **typeFields**: `Record`\<`string`, `undefined` \| `string`[]\>

---

### types

> `readonly` **types**: `string`[] = `[]`

## Methods

### addMiddleware()

> **addMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

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

##### middleware

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### addMiddlewareToMap()

> `protected` **addMiddlewareToMap**\<`Result`, `Root`, `Context`, `Args`\>(`map`, `type`, `field`, `middleware`): `void`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### map

`MiddlewareMap`

##### type

`string`

##### field

`string`

##### middleware

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### compose()

> **compose**(): `IResolvers`

#### Returns

`IResolvers`

---

### getTypeFields()

> **getTypeFields**(`type`): `string`[]

#### Parameters

##### type

`string`

#### Returns

`string`[]

---

### getTypes()

> **getTypes**(): `string`[]

#### Returns

`string`[]

---

### prependMiddleware()

> **prependMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

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

##### middleware

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### registerTypeField()

> **registerTypeField**(`type`, `field`): `void`

#### Parameters

##### type

`string`

##### field

`string`

#### Returns

`void`

---

### setDefaultFieldResolver()

> **setDefaultFieldResolver**(`type`, `field`): `void`

#### Parameters

##### type

`string`

##### field

`string`

#### Returns

`void`

---

### setResolver()

> **setResolver**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `resolver`): `void`

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

##### resolver

[`NativeResolver`](../type-aliases/NativeResolver.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### setScalar()

> **setScalar**(`scalar`, `resolver`): `void`

#### Parameters

##### scalar

`string`

##### resolver

[`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

#### Returns

`void`

---

### setSubscription()

> **setSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>(`field`, `resolver`): `void`

#### Type Parameters

• **Payload**

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### field

`string`

##### resolver

[`NativeSubscription`](../type-aliases/NativeSubscription.md)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### setTypenameResolver()

> **setTypenameResolver**\<`Result`, `Value`, `Context`\>(`type`, `resolver`): `void`

#### Type Parameters

• **Result**

• **Value**

• **Context**

#### Parameters

##### type

`string`

##### resolver

[`NativeTypeResolver`](../type-aliases/NativeTypeResolver.md)\<`Result`, `Value`, `Context`\>

#### Returns

`void`
