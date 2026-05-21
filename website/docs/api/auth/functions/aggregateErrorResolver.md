# aggregateErrorResolver()

> **aggregateErrorResolver**(`err`): `any`

Default error resolver for authorization failures.
If multiple authorization errors are encountered they are combined into `AggregateGraphQLError` with proper HTTP status codes.

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

`err`

</td>
<td>

`AggregateError`

</td>
</tr>
</tbody>
</table>

## Returns

`any`
