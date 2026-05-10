# QueryArgsIndexes\<Args, T\>

> **QueryArgsIndexes**\<`Args`, `T`\> = `{ [K in keyof Args]?: Args[K] extends QueryIndexValue ? true : never }` & `Record`\<`Exclude`\<keyof `T`, keyof `Args`\>, `never`\>

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

`Args` *extends* [`QueryArgs`](QueryArgs.md)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`T`

</td>
<td>

`Record`\<`string`, `never`\>

</td>
</tr>
</tbody>
</table>
