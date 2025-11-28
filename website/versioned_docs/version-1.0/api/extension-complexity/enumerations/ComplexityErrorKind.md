# ComplexityErrorKind

Types of complexity validation errors that can occur during query analysis.

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

<a id="breadth"></a> `Breadth`

</td>
<td>

`"BreadthExceeded"`

</td>
<td>

Query exceeds maximum allowed breadth (fields per level)

</td>
</tr>
<tr>
<td>

<a id="complexity"></a> `Complexity`

</td>
<td>

`"ComplexityExceeded"`

</td>
<td>

Query exceeds total complexity score limit

</td>
</tr>
<tr>
<td>

<a id="depth"></a> `Depth`

</td>
<td>

`"DepthExceeded"`

</td>
<td>

Query exceeds maximum allowed depth

</td>
</tr>
</tbody>
</table>
