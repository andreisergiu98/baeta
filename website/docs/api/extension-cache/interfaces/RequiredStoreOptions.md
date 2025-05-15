# RequiredStoreOptions\<Root\>

Required configuration options for cache stores

## Extends

- [`StoreOptions`](StoreOptions.md)\<`Root`\>

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

`Root`

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
<th>Overrides</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="getref"></a> `getRef`

</td>
<td>

(`root`) => [`ItemRef`](../type-aliases/ItemRef.md)

</td>
<td>

`undefined`

</td>
<td>

Function to extract object reference id

</td>
<td>

[`StoreOptions`](StoreOptions.md).[`getRef`](StoreOptions.md#getref)

</td>
<td>

&hyphen;

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

`undefined`

</td>
<td>

Manual cache version for invalidation

</td>
<td>

&hyphen;

</td>
<td>

[`StoreOptions`](StoreOptions.md).[`revision`](StoreOptions.md#revision)

</td>
</tr>
<tr>
<td>

<a id="ttl"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

```ts
3600;
```

</td>
<td>

Time-to-live in seconds

</td>
<td>

&hyphen;

</td>
<td>

[`StoreOptions`](StoreOptions.md).[`ttl`](StoreOptions.md#ttl)

</td>
</tr>
</tbody>
</table>
