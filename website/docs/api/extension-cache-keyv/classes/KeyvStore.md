# KeyvStore

Keyv-based cache store implementation.

## Remarks

Not recommended for production environments with high query volumes.
Consider using Redis or Upstash for production deployments.

## Example

```typescript
import { KeyvStore } from "@baeta/extension-cache-keyv";
import Keyv from "keyv";

const keyv = new Keyv();
const store = new KeyvStore(keyv);

// Use with cache extension
const cacheExt = cacheExtension(store, {
  ttl: 3600,
});
```

## Extends

- [`Store`](../../extension-cache/classes/Store.md)

## Constructors

### Constructor

> **new KeyvStore**(`keyv`): `KeyvStore`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`keyv`

</td>
<td>

`Keyv`

</td>
</tr>
</tbody>
</table>

#### Returns

`KeyvStore`

#### Overrides

[`Store`](../../extension-cache/classes/Store.md).[`constructor`](../../extension-cache/classes/Store.md#constructor)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="keyv"></a> `keyv`

</td>
<td>

`protected`

</td>
<td>

`Keyv`

</td>
</tr>
</tbody>
</table>

## Methods

### createStoreAdapter()

> **createStoreAdapter**\<`T`\>(`serializer`, `options`, `type`): [`StoreAdapter`](../../extension-cache/classes/StoreAdapter.md)\<`T`\>

Creates a new store adapter for a specific type

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializer`

</td>
<td>

[`Serializer`](../../extension-cache/interfaces/Serializer.md)

</td>
<td>

Serializer instance

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](../../extension-cache/interfaces/StoreOptions.md)\<`T`\>

</td>
<td>

Store configuration options

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
<td>

Type name for the cached items

</td>
</tr>
</tbody>
</table>

#### Returns

[`StoreAdapter`](../../extension-cache/classes/StoreAdapter.md)\<`T`\>

#### Overrides

[`Store`](../../extension-cache/classes/Store.md).[`createStoreAdapter`](../../extension-cache/classes/Store.md#createstoreadapter)
