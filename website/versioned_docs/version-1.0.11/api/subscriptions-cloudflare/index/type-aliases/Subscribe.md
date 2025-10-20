# Subscribe()\<Map\>

> **Subscribe**\<`Map`\> = \<`C`, `P`\>(`topic`) => `AsyncIterator`\<`P`\>

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

`Map` _extends_ `Record`\<`string`, `any`\>

</td>
</tr>
</tbody>
</table>

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

`C` _extends_ keyof `Map`

</td>
</tr>
<tr>
<td>

`P` _extends_ `Map`\[`C`\]

</td>
</tr>
</tbody>
</table>

## Parameters

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

`topic`

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

## Returns

`AsyncIterator`\<`P`\>
