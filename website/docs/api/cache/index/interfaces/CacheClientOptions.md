# CacheClientOptions

## Extended by

- [`RedisCacheClientOptions`](../../../cache-ioredis/interfaces/RedisCacheClientOptions.md)
- [`ValkeyCacheClientOptions`](../../../cache-iovalkey/interfaces/ValkeyCacheClientOptions.md)

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

<a id="namespace"></a> `namespace?`

</td>
<td>

`string`

</td>
<td>

```ts
"baeta";
```

</td>
<td>

Optional namespace to prefix all cache keys

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
"default";
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
3_600_000 (1 hour)
```

</td>
<td>

Time-to-live in milliseconds

</td>
</tr>
</tbody>
</table>
