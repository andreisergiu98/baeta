# Class: CacheExtension

## Extends

- `Extension`

## Constructors

### new CacheExtension()

> **new CacheExtension**(`store`, `defaultOptions`?): [`CacheExtension`](CacheExtension.md)

#### Parameters

##### store

[`Store`](Store.md)

##### defaultOptions?

[`DefaultStoreOptions`](../interfaces/DefaultStoreOptions.md)

#### Returns

[`CacheExtension`](CacheExtension.md)

#### Overrides

`Extension.constructor`

## Properties

### version

> **version**: `ExtensionVersion` = `ExtensionVersion.V1`

#### Inherited from

`Extension.version`

## Methods

### build()

> **build**(`module`, `mapper`): `void`

#### Parameters

##### module

`ModuleBuilder`

##### mapper

`ResolverMapper`

#### Returns

`void`

#### Inherited from

`Extension.build`

---

### getModuleExtensions()

> **getModuleExtensions**(): `object`

#### Returns

`object`

#### Inherited from

`Extension.getModuleExtensions`

---

### getResolverExtensions()

> **getResolverExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `type`, `field`): `ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\>

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### module

`ModuleBuilder`

##### type

`string`

##### field

`string`

#### Returns

`ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\>

#### Overrides

`Extension.getResolverExtensions`

---

### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Root**

• **Context**

• **Args**

#### Parameters

##### module

`ModuleBuilder`

##### field

`string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionExtensions`

---

### getSubscriptionResolveExtensions()

> **getSubscriptionResolveExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

##### module

`ModuleBuilder`

##### field

`string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionResolveExtensions`

---

### getSubscriptionSubscribeExtensions()

> **getSubscriptionSubscribeExtensions**\<`Iterator`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Iterator**

• **Root**

• **Context**

• **Args**

#### Parameters

##### module

`ModuleBuilder`

##### field

`string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionSubscribeExtensions`

---

### getTransformers()

> **getTransformers**(): `SchemaTransformer`[]

#### Returns

`SchemaTransformer`[]

#### Inherited from

`Extension.getTransformers`

---

### getTypeExtensions()

> **getTypeExtensions**\<`Root`, `Context`\>(`module`, `type`): `TypeExtensions`\<`Root`, `Context`\>

#### Type Parameters

• **Root**

• **Context**

#### Parameters

##### module

`ModuleBuilder`

##### type

`string`

#### Returns

`TypeExtensions`\<`Root`, `Context`\>

#### Overrides

`Extension.getTypeExtensions`
