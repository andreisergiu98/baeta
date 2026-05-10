# QueryOptions\<Result, Args, Indexes, Item\>

> **QueryOptions**\<`Result`, `Args`, `Indexes`, `Item`\> = `object`

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result` *extends* `QueryResult`\<`Item`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Args` *extends* [`QueryArgs`](QueryArgs.md)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Indexes` *extends* [`QueryArgsIndexes`](QueryArgsIndexes.md)\<`Args`, `Indexes`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Item`

</td>
<td>

`ItemFromQueryResult`\<`Result`\>

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

(`args`) => `Result` \| `Promise`\<`Result`\>

</td>
</tr>
<tr>
<td>

<a id="indexargsby"></a> `indexArgsBy?`

</td>
<td>

`Indexes`

</td>
</tr>
<tr>
<td>

<a id="ondelete"></a> `onDelete?`

</td>
<td>

(`pairs`, `helpers`) => `Promise`\<`void`\> \| `void`

</td>
</tr>
<tr>
<td>

<a id="oninsert"></a> `onInsert?`

</td>
<td>

(`items`, `helpers`) => `Promise`\<`void`\> \| `void`

</td>
</tr>
<tr>
<td>

<a id="onupdate"></a> `onUpdate?`

</td>
<td>

(`pairs`, `helpers`) => `Promise`\<`void`\> \| `void`

</td>
</tr>
<tr>
<td>

<a id="replaceexistingitems"></a> `replaceExistingItems?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="revision"></a> `revision?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="ttlms"></a> `ttlMs?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>
