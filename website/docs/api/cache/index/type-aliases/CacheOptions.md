# CacheOptions\<Item\>

> **CacheOptions**\<`Item`\> = `object`

Configuration options for cache stores

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Unique name for the cache store. Used as a prefix for cache keys to avoid collisions.

</td>
</tr>
<tr>
<td>

<a id="parse"></a> `parse`

</td>
<td>

(`value`) => `Item`

</td>
<td>

`undefined`

</td>
<td>

Function to parse stored strings back into source objects.
If it throws an error, the cache will be treated as a miss and the value will be deleted.

</td>
</tr>
<tr>
<td>

<a id="serialize"></a> `serialize`

</td>
<td>

(`value`) => `string`

</td>
<td>

`undefined`

</td>
<td>

Function to serialize source objects into strings for cache storage.

</td>
</tr>
<tr>
<td>

<a id="namespace"></a> `namespace?`

</td>
<td>

`string`

</td>
<td>

```ts
CacheClient options or "baeta"
```

</td>
<td>

Optional namespace to prefix all cache keys

</td>
</tr>
<tr>
<td>

<a id="ondelete"></a> `onDelete?`

</td>
<td>

(`ref`) => `void` \| `Promise`\<`void`\>

</td>
<td>

`undefined`

</td>
<td>

Hook that gets called with the refs of deleted items after a delete operation.

</td>
</tr>
<tr>
<td>

<a id="oninsert"></a> `onInsert?`

</td>
<td>

(`item`) => `void` \| `Promise`\<`void`\>

</td>
<td>

`undefined`

</td>
<td>

Hook that gets called with the inserted items after an insert operation.

</td>
</tr>
<tr>
<td>

<a id="onupdate"></a> `onUpdate?`

</td>
<td>

(`item`) => `void` \| `Promise`\<`void`\>

</td>
<td>

`undefined`

</td>
<td>

Hook that gets called with the updated items after an update operation.

</td>
</tr>
<tr>
<td>

<a id="revision"></a> `revision?`

</td>
<td>

`number`

</td>
<td>

```ts
CacheClient options or "default"
```

</td>
<td>

Revision number for cache invalidation.
Incrementing this number will invalidate all existing cache entries for this store.

</td>
</tr>
<tr>
<td>

<a id="ttlms"></a> `ttlMs?`

</td>
<td>

`number`

</td>
<td>

```ts
CacheClient options or 3_600_000 (1 hour)
```

</td>
<td>

Time-to-live in milliseconds

</td>
</tr>
</tbody>
</table>
