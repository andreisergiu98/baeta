# GetComplexityError()

> **GetComplexityError** = (`kind`, `limits`, `results`) => `GraphQLError`

Function type for creating custom complexity error messages.

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

`kind`

</td>
<td>

[`ComplexityErrorKind`](../variables/ComplexityErrorKind.md)

</td>
<td>

The type of complexity limit that was exceeded

</td>
</tr>
<tr>
<td>

`limits`

</td>
<td>

`number`

</td>
<td>

The maximum allowed value

</td>
</tr>
<tr>
<td>

`results`

</td>
<td>

`number`

</td>
<td>

The actual value that exceeded the limit

</td>
</tr>
</tbody>
</table>

## Returns

`GraphQLError`

A GraphQL error with a custom message
