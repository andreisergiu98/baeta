# RenderOptions

> **RenderOptions** = `object`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="debug"></a> `debug?`

</td>
<td>

`boolean`

</td>
<td>

If true, each update will be rendered as a separate output, without replacing the previous one.

**Default**

```ts
false;
```

</td>
</tr>
<tr>
<td>

<a id="exitonctrlc"></a> `exitOnCtrlC?`

</td>
<td>

`boolean`

</td>
<td>

Configure whether Ink should listen to Ctrl+C keyboard input and exit the app. This is needed in case `process.stdin` is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually.

**Default**

```ts
true;
```

</td>
</tr>
<tr>
<td>

<a id="patchconsole"></a> `patchConsole?`

</td>
<td>

`boolean`

</td>
<td>

Patch console methods to ensure console output doesn't mix with Ink output.

**Default**

```ts
true;
```

</td>
</tr>
<tr>
<td>

<a id="stderr"></a> `stderr?`

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Error stream.

**Default**

```ts
process.stderr;
```

</td>
</tr>
<tr>
<td>

<a id="stdin"></a> `stdin?`

</td>
<td>

`NodeJS.ReadStream`

</td>
<td>

Input stream where app will listen for input.

**Default**

```ts
process.stdin;
```

</td>
</tr>
<tr>
<td>

<a id="stdout"></a> `stdout?`

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Output stream where app will be rendered.

**Default**

```ts
process.stdout;
```

</td>
</tr>
</tbody>
</table>
