# createCache()

## Call Signature

> **createCache**\<`Item`\>(`client`, `options`): [`CreateCacheFactory`](../type-aliases/CreateCacheFactory.md)\<`Item`\>

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Item` *extends* [`RefCompatibleItem`](../type-aliases/RefCompatibleItem.md)

</td>
</tr>
</tbody>
</table>

### Parameters

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

`client`

</td>
<td>

[`CacheClient`](../classes/CacheClient.md)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheOptions`](../type-aliases/CacheOptions.md)\<`Item`\> & [`OptionalGetRef`](../type-aliases/OptionalGetRef.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

### Returns

[`CreateCacheFactory`](../type-aliases/CreateCacheFactory.md)\<`Item`\>

## Call Signature

> **createCache**\<`Item`\>(`client`, `options`): [`CreateCacheFactory`](../type-aliases/CreateCacheFactory.md)\<`Item`\>

### Type Parameters

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

### Parameters

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

`client`

</td>
<td>

[`CacheClient`](../classes/CacheClient.md)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheOptions`](../type-aliases/CacheOptions.md)\<`Item`\> & [`RequiredGetRef`](../type-aliases/RequiredGetRef.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

### Returns

[`CreateCacheFactory`](../type-aliases/CreateCacheFactory.md)\<`Item`\>
