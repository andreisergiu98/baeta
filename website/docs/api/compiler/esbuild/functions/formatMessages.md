# formatMessages()

> **formatMessages**(`messages`, `options`): `Promise`\<`string`[]\>

Converts log messages to formatted message strings suitable for printing in
the terminal. This allows you to reuse the built-in behavior of esbuild's
log message formatter. This is a batch-oriented API for efficiency.

- Works in node: yes
- Works in browser: yes

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

`messages`

</td>
<td>

[`PartialMessage`](../interfaces/PartialMessage.md)[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`FormatMessagesOptions`](../interfaces/FormatMessagesOptions.md)

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`string`[]\>
