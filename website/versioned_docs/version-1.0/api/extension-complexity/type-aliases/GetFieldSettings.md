# GetFieldSettings()\<Context, Args\>

> **GetFieldSettings**\<`Context`, `Args`\> = (`params`) => [`FieldSettings`](FieldSettings.md) \| `false`

Function to determine complexity settings for a field.
Returns either field settings or false to disable complexity calculation.

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

`Context`

</td>
</tr>
<tr>
<td>

`Args`

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

[`GetFieldSettingsArgs`](GetFieldSettingsArgs.md)\<`Context`, `Args`\>

</td>
<td>

Object containing field arguments and context

</td>
</tr>
</tbody>
</table>

## Returns

[`FieldSettings`](FieldSettings.md) \| `false`

Field settings object or false
