# Function: formatMessages()

> **formatMessages**(`messages`, `options`): `Promise`\<`string`[]\>

Converts log messages to formatted message strings suitable for printing in
the terminal. This allows you to reuse the built-in behavior of esbuild's
log message formatter. This is a batch-oriented API for efficiency.

- Works in node: yes
- Works in browser: yes

## Parameters

• **messages**: [`PartialMessage`](../interfaces/PartialMessage.md)[]

• **options**: [`FormatMessagesOptions`](../interfaces/FormatMessagesOptions.md)

## Returns

`Promise`\<`string`[]\>

## Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:576
