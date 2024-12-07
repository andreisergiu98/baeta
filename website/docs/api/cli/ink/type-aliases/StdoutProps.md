# Type Alias: StdoutProps

> **StdoutProps**: `object`

## Type declaration

### stdout

> `readonly` **stdout**: `NodeJS.WriteStream`

Stdout stream passed to `render()` in `options.stdout` or `process.stdout` by default.

### write()

> `readonly` **write**: (`data`) => `void`

Write any string to stdout, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

#### Parameters

• **data**: `string`

#### Returns

`void`
