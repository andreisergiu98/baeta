# Function: initialize()

> **initialize**(`options`): `Promise`\<`void`\>

This configures the browser-based version of esbuild. It is necessary to
call this first and wait for the returned promise to be resolved before
making other API calls when using esbuild in the browser.

- Works in node: yes
- Works in browser: yes ("options" is required)

Documentation: https://esbuild.github.io/api/#browser

## Parameters

### options

[`InitializeOptions`](../interfaces/InitializeOptions.md)

## Returns

`Promise`\<`void`\>
