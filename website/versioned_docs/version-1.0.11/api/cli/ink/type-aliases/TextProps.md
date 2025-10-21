# TextProps

> **TextProps** = `object`

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

<a id="backgroundcolor"></a> `backgroundColor?`

</td>
<td>

`readonly`

</td>
<td>

`LiteralUnion`\<`ForegroundColorName`, `string`\>

</td>
<td>

Same as `color`, but for background.

</td>
</tr>
<tr>
<td>

<a id="bold"></a> `bold?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Make the text bold.

</td>
</tr>
<tr>
<td>

<a id="children"></a> `children?`

</td>
<td>

`readonly`

</td>
<td>

`ReactNode`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color?`

</td>
<td>

`readonly`

</td>
<td>

`LiteralUnion`\<`ForegroundColorName`, `string`\>

</td>
<td>

Change text color. Ink uses chalk under the hood, so all its functionality is supported.

</td>
</tr>
<tr>
<td>

<a id="dimcolor"></a> `dimColor?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Dim the color (emit a small amount of light).

</td>
</tr>
<tr>
<td>

<a id="inverse"></a> `inverse?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Inverse background and foreground colors.

</td>
</tr>
<tr>
<td>

<a id="italic"></a> `italic?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Make the text italic.

</td>
</tr>
<tr>
<td>

<a id="strikethrough"></a> `strikethrough?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Make the text crossed with a line.

</td>
</tr>
<tr>
<td>

<a id="underline"></a> `underline?`

</td>
<td>

`readonly`

</td>
<td>

`boolean`

</td>
<td>

Make the text underlined.

</td>
</tr>
<tr>
<td>

<a id="wrap"></a> `wrap?`

</td>
<td>

`readonly`

</td>
<td>

`Styles`\[`"textWrap"`\]

</td>
<td>

This property tells Ink to wrap or truncate text if its width is larger than container.
If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.

</td>
</tr>
</tbody>
</table>
