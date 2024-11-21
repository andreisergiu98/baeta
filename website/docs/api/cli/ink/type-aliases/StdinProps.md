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

.yarn/\_\_virtual\_\_/ink-virtual-aec70b31ab/0/cache/ink-npm-5.0.1-25988da7ed-03eab53468.zip/node\_modules/ink/build/components/StdinContext.d.ts:5
