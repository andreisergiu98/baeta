# joinSafe()

> `const` **joinSafe**: (...`paths`) => `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

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

...`paths`

</td>
<td>

`any`[]

</td>
<td>

string paths to join

</td>
</tr>
</tbody>
</table>

## Returns

`string`
