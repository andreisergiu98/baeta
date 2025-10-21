# InitializeOptions

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

<a id="wasmmodule"></a> `wasmModule?`

</td>
<td>

`Module`

</td>
<td>

The result of calling "new WebAssembly.Module(buffer)" where "buffer"
is a typed array or ArrayBuffer containing the binary code of the
"esbuild.wasm" file.

You can use this as an alternative to "wasmURL" for environments where it's
not possible to download the WebAssembly module.

</td>
</tr>
<tr>
<td>

<a id="wasmurl"></a> `wasmURL?`

</td>
<td>

`string` \| `URL`

</td>
<td>

The URL of the "esbuild.wasm" file. This must be provided when running
esbuild in the browser.

</td>
</tr>
<tr>
<td>

<a id="worker"></a> `worker?`

</td>
<td>

`boolean`

</td>
<td>

By default esbuild runs the WebAssembly-based browser API in a web worker
to avoid blocking the UI thread. This can be disabled by setting "worker"
to false.

</td>
</tr>
</tbody>
</table>
