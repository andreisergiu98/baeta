# CacheArgs\<T\>

> **CacheArgs**\<`T`\> = `{ [P in keyof T]?: T[P] extends object ? CacheArgs<T[P]> : T[P] }`

Optional query arguments

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

`T`

</td>
</tr>
</tbody>
</table>
