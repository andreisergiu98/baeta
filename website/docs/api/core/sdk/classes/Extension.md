# Class: Extension

## Constructors

### new Extension()

> **new Extension**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

## Properties

### version

> **version**: [`V1`](../enumerations/ExtensionVersion.md#v1) = `ExtensionVersion.V1`

## Methods

### build()

> **build**(`module`, `mapper`): `void`

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **mapper**: [`ResolverMapper`](ResolverMapper.md)

#### Returns

`void`

***

### getModuleExtensions()

> **getModuleExtensions**(): `object`

#### Returns

`object`

***

### getResolverExtensions()

> **getResolverExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `type`, `field`): `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **type**: `string`

• **field**: `string`

#### Returns

`object`

***

### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **field**: `string`

#### Returns

`object`

***

### getSubscriptionResolveExtensions()

> **getSubscriptionResolveExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **field**: `string`

#### Returns

`object`

***

### getSubscriptionSubscribeExtensions()

> **getSubscriptionSubscribeExtensions**\<`Iterator`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Iterator**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **field**: `string`

#### Returns

`object`

***

### getTransformers()

> **getTransformers**(): [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

#### Returns

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

***

### getTypeExtensions()

> **getTypeExtensions**\<`Result`, `Context`\>(`module`, `type`): `object`

#### Type Parameters

• **Result**

• **Context**

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **type**: `string`

#### Returns

`object`
