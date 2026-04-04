# createRedisScripts()

> **createRedisScripts**(`loadScript`, `evalSha`): [`RedisScripts`](../type-aliases/RedisScripts.md)

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

`loadScript`

</td>
<td>

(`script`) => `Promise`\<`unknown`\>

</td>
</tr>
<tr>
<td>

`evalSha`

</td>
<td>

(`sha`, `keys`, `args`) => `Promise`\<`unknown`\>

</td>
</tr>
</tbody>
</table>

## Returns

[`RedisScripts`](../type-aliases/RedisScripts.md)
