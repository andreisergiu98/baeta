# Interface: InitializeOptions

## Properties

### wasmModule?

> `optional` **wasmModule**: `Module`

The result of calling "new WebAssembly.Module(buffer)" where "buffer"
is a typed array or ArrayBuffer containing the binary code of the
"esbuild.wasm" file.

You can use this as an alternative to "wasmURL" for environments where it's
not possible to download the WebAssembly module.

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:655

***

### wasmURL?

> `optional` **wasmURL**: `string` \| `URL`

The URL of the "esbuild.wasm" file. This must be provided when running
esbuild in the browser.

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:645

***

### worker?

> `optional` **worker**: `boolean`

By default esbuild runs the WebAssembly-based browser API in a web worker
to avoid blocking the UI thread. This can be disabled by setting "worker"
to false.

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:662
