# Transform()

> **Transform**(`__namedParameters`): `null` \| `Element`

Transform a string representation of React components before they are written to output.
For example, you might want to apply a gradient to text, add a clickable link or create some text effects.
These use cases can't accept React nodes as input, they are expecting a string.
That's what <Transform> component does, it gives you an output string of its child components and lets you transform it in any way.

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

`__namedParameters`

</td>
<td>

[`TransformProps`](../type-aliases/TransformProps.md)

</td>
</tr>
</tbody>
</table>

## Returns

`null` \| `Element`
