# ValkeyCacheClientOptions

## Extends

- [`CacheClientOptions`](../../cache/index/interfaces/CacheClientOptions.md)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="maxcommandkeyslimit"></a> `maxCommandKeysLimit?`

</td>
<td>

`number`

</td>
<td>

```ts
100_000
```

</td>
<td>

Maximum number of keys in a single command. If the number of keys exceeds this limit, multiple commands will be executed.

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="maxpipelinecommandlimit"></a> `maxPipelineCommandLimit?`

</td>
<td>

`number`

</td>
<td>

```ts
100_000
```

</td>
<td>

Maximum number of commands in a single pipeline batch. If the batch exceeds this number, it will be executed immediately.

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="maxpipelinesizelimit"></a> `maxPipelineSizeLimit?`

</td>
<td>

`number`

</td>
<td>

```ts
50 * 1024 * 1024 (50MB)
```

</td>
<td>

Maximum total size of commands in a single pipeline batch. If the batch exceeds this size, it will be executed immediately.

</td>
<td>

&hyphen;

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
"baeta"
```

</td>
<td>

Optional namespace to prefix all cache keys

</td>
<td>

[`CacheClientOptions`](../../cache/index/interfaces/CacheClientOptions.md).[`namespace`](../../cache/index/interfaces/CacheClientOptions.md#namespace)

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
"default"
```

</td>
<td>

Revision number for cache invalidation.
Incrementing this number will invalidate all existing cache entries for this store.

</td>
<td>

[`CacheClientOptions`](../../cache/index/interfaces/CacheClientOptions.md).[`revision`](../../cache/index/interfaces/CacheClientOptions.md#revision)

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
<td>

[`CacheClientOptions`](../../cache/index/interfaces/CacheClientOptions.md).[`ttlMs`](../../cache/index/interfaces/CacheClientOptions.md#ttlms)

</td>
</tr>
</tbody>
</table>
