# Type Alias: StderrProps

> **StderrProps**: `object`

## Type declaration

### stderr

> `readonly` **stderr**: `NodeJS.WriteStream`

Stderr stream passed to `render()` in `options.stderr` or `process.stderr` by default.

### write()

> `readonly` **write**: (`data`) => `void`

Write any string to stderr, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

#### Parameters

• **data**: `string`

#### Returns

`void`

## Defined in

.yarn/\_\_virtual\_\_/ink-virtual-46a2052950/0/cache/ink-npm-5.1.0-5eb899d847-aa60256b38.zip/node\_modules/ink/build/components/StderrContext.d.ts:1
