# Type Alias: StdinProps

> **StdinProps**: `object`

## Type declaration

### internal\_eventEmitter

> `readonly` **internal\_eventEmitter**: `EventEmitter`

### internal\_exitOnCtrlC

> `readonly` **internal\_exitOnCtrlC**: `boolean`

### isRawModeSupported

> `readonly` **isRawModeSupported**: `boolean`

A boolean flag determining if the current `stdin` supports `setRawMode`. A component using `setRawMode` might want to use `isRawModeSupported` to nicely fall back in environments where raw mode is not supported.

### setRawMode()

> `readonly` **setRawMode**: (`value`) => `void`

Ink exposes this function via own `<StdinContext>` to be able to handle Ctrl+C, that's why you should use Ink's `setRawMode` instead of `process.stdin.setRawMode`.
If the `stdin` stream passed to Ink does not support setRawMode, this function does nothing.

#### Parameters

• **value**: `boolean`

#### Returns

`void`

### stdin

> `readonly` **stdin**: `NodeJS.ReadStream`

Stdin stream passed to `render()` in `options.stdin` or `process.stdin` by default. Useful if your app needs to handle user input.

## Defined in

.yarn/\_\_virtual\_\_/ink-virtual-46a2052950/0/cache/ink-npm-5.1.0-5eb899d847-aa60256b38.zip/node\_modules/ink/build/components/StdinContext.d.ts:2
