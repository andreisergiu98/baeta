# Class: CacheExtension

## Extends

- `Extension`

## Constructors

### new CacheExtension()

> **new CacheExtension**(`store`, `defaultOptions`?): [`CacheExtension`](CacheExtension.md)

#### Parameters

• **store**: [`Store`](Store.md)

• **defaultOptions?**: [`DefaultStoreOptions`](../interfaces/DefaultStoreOptions.md)

#### Returns

[`CacheExtension`](CacheExtension.md)

#### Overrides

`Extension.constructor`

#### Defined in

[packages/extension-cache/lib/cache-extension.ts:15](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache/lib/cache-extension.ts#L15)

## Properties

### version

> **version**: `ExtensionVersion` = `ExtensionVersion.V1`

#### Inherited from

`Extension.version`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:28

## Methods

### build()

> **build**(`module`, `mapper`): `void`

#### Parameters

• **module**: `ModuleBuilder`

• **mapper**: `ResolverMapper`

#### Returns

`void`

#### Inherited from

`Extension.build`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:68

***

### getModuleExtensions()

> **getModuleExtensions**(): `object`

#### Returns

`object`

#### Inherited from

`Extension.getModuleExtensions`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:30

***

### getResolverExtensions()

> **getResolverExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `type`, `field`): `ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\>

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: `ModuleBuilder`

• **type**: `string`

• **field**: `string`

#### Returns

`ResolverExtensions`\<`Result`, `Root`, `Context`, `Args`\>

#### Overrides

`Extension.getResolverExtensions`

#### Defined in

[packages/extension-cache/lib/cache-extension.ts:39](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache/lib/cache-extension.ts#L39)

***

### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: `ModuleBuilder`

• **field**: `string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionExtensions`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:46

***

### getSubscriptionResolveExtensions()

> **getSubscriptionResolveExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: `ModuleBuilder`

• **field**: `string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionResolveExtensions`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:57

***

### getSubscriptionSubscribeExtensions()

> **getSubscriptionSubscribeExtensions**\<`Iterator`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

#### Type Parameters

• **Iterator**

• **Root**

• **Context**

• **Args**

#### Parameters

• **module**: `ModuleBuilder`

• **field**: `string`

#### Returns

`object`

#### Inherited from

`Extension.getSubscriptionSubscribeExtensions`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:50

***

### getTransformers()

> **getTransformers**(): `SchemaTransformer`[]

#### Returns

`SchemaTransformer`[]

#### Inherited from

`Extension.getTransformers`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-core-virtual-59ab5efd02/1/packages/core/sdk/extension.ts:64

***

### getTypeExtensions()

> **getTypeExtensions**\<`Root`, `Context`\>(`module`, `type`): `TypeExtensions`\<`Root`, `Context`\>

#### Type Parameters

• **Root**

• **Context**

#### Parameters

• **module**: `ModuleBuilder`

• **type**: `string`

#### Returns

`TypeExtensions`\<`Root`, `Context`\>

#### Overrides

`Extension.getTypeExtensions`

#### Defined in

[packages/extension-cache/lib/cache-extension.ts:22](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache/lib/cache-extension.ts#L22)
