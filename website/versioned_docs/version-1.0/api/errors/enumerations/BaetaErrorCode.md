# BaetaErrorCode

Standard error codes used across the Baeta framework.

## Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="aggregateerror"></a> `AggregateError`

</td>
<td>

`"AGGREGATE_ERROR"`

</td>
<td>

Multiple errors occurred simultaneously

</td>
</tr>
<tr>
<td>

<a id="baduserinput"></a> `BadUserInput`

</td>
<td>

`"BAD_USER_INPUT"`

</td>
<td>

Invalid input provided by the user

</td>
</tr>
<tr>
<td>

<a id="forbidden"></a> `Forbidden`

</td>
<td>

`"FORBIDDEN"`

</td>
<td>

User is authenticated but lacks required permissions

</td>
</tr>
<tr>
<td>

<a id="internalservererror"></a> `InternalServerError`

</td>
<td>

`"INTERNAL_SERVER_ERROR"`

</td>
<td>

Unexpected server-side error

</td>
</tr>
<tr>
<td>

<a id="unauthenticated"></a> `Unauthenticated`

</td>
<td>

`"UNAUTHENTICATED"`

</td>
<td>

Authentication is required but was not provided

</td>
</tr>
</tbody>
</table>
