# StdinProps

> **StdinProps** = `object`

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

<a id="internal_eventemitter"></a> `internal_eventEmitter`

</td>
<td>

`readonly`

</td>
<td>

`EventEmitter`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="internal_exitonctrlc"></a> `internal_exitOnCtrlC`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="israwmodesupported"></a> `isRawModeSupported`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

A boolean flag determining if the current `stdin` supports `setRawMode`. A component using `setRawMode` might want to use `isRawModeSupported` to nicely fall back in environments where raw mode is not supported.

</td>
</tr>
<tr>
<td>

<a id="setrawmode"></a> `setRawMode`

</td>
<td>

`readonly`

</td>
<td>

(`value`) => `void`

</td>
<td>

Ink exposes this function via own `<StdinContext>` to be able to handle Ctrl+C, that's why you should use Ink's `setRawMode` instead of `process.stdin.setRawMode`.
If the `stdin` stream passed to Ink does not support setRawMode, this function does nothing.

</td>
</tr>
<tr>
<td>

<a id="stdin"></a> `stdin`

</td>
<td>

`readonly`

</td>
<td>

`NodeJS.ReadStream`

</td>
<td>

Stdin stream passed to `render()` in `options.stdin` or `process.stdin` by default. Useful if your app needs to handle user input.

</td>
</tr>
</tbody>
</table>
