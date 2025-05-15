# StderrProps

> **StderrProps** = `object`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="stderr"></a> `stderr`

</td>
<td>

`readonly`

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Stderr stream passed to `render()` in `options.stderr` or `process.stderr` by default.

</td>
</tr>
<tr>
<td>

<a id="write"></a> `write`

</td>
<td>

`readonly`

</td>
<td>

(`data`) => `void`

</td>
<td>

Write any string to stderr, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

</td>
</tr>
</tbody>
</table>
