# Interface: InitializeOptions

## Properties

### wasmModule?

> `optional` **wasmModule**: `Module`

The result of calling "new WebAssembly.Module(buffer)" where "buffer"
is a typed array or ArrayBuffer containing the binary code of the
"esbuild.wasm" file.

You can use this as an alternative to "wasmURL" for environments where it's
not possible to download the WebAssembly module.

---

### wasmURL?

> `optional` **wasmURL**: `string` \| `URL`

The URL of the "esbuild.wasm" file. This must be provided when running
esbuild in the browser.

---

### worker?

> `optional` **worker**: `boolean`

By default esbuild runs the WebAssembly-based browser API in a web worker
to avoid blocking the UI thread. This can be disabled by setting "worker"
to false.
