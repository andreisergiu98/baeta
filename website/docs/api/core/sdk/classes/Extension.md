# Class: Extension

## Constructors

### new Extension()

> **new Extension**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

## Properties

### version

> **version**: [`V1`](../enumerations/ExtensionVersion.md#v1) = `ExtensionVersion.V1`

#### Defined in

[sdk/extension.ts:28](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L28)

## Methods

### build()

> **build**(`module`, `mapper`): `void`

#### Parameters

• **module**: [`ModuleBuilder`](ModuleBuilder.md)

• **mapper**: [`ResolverMapper`](ResolverMapper.md)

#### Returns

`void`

#### Defined in

[sdk/extension.ts:68](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L68)

***

### getModuleExtensions()

> **getModuleExtensions**(): `object`

#### Returns

`object`

#### Defined in

[sdk/extension.ts:30](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L30)

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

#### Defined in

[sdk/extension.ts:38](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L38)

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

#### Defined in

[sdk/extension.ts:46](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L46)

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

#### Defined in

[sdk/extension.ts:57](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L57)

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

#### Defined in

[sdk/extension.ts:50](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L50)

***

### getTransformers()

> **getTransformers**(): [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

#### Returns

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

#### Defined in

[sdk/extension.ts:64](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L64)

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

#### Defined in

[sdk/extension.ts:34](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/extension.ts#L34)
