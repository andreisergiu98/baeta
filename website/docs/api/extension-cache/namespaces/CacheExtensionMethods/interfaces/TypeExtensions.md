# Interface: TypeExtensions\<Root, Context\>

## Type Parameters

• **Root**

• **Context**

## Properties

### $createCache()

> **$createCache**: (...`args`) => [`StoreAdapter`](../../../classes/StoreAdapter.md)\<`Root`\>

Creates a cache store for a specific type.

#### Parameters

##### args

...[`CreateCacheArgs`](../../../type-aliases/CreateCacheArgs.md)\<`Root`\>

Cache configuration arguments

#### Returns

[`StoreAdapter`](../../../classes/StoreAdapter.md)\<`Root`\>

Store for type

#### Example

```typescript
const userCache = User.$createCache();
```
