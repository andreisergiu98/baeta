# Interface: GeneratorHooks

## Properties

### onEnd()?

> `optional` **onEnd**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:16](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator/lib/generate.ts#L16)

***

### onError()?

> `optional` **onError**: (`error`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **error**: `unknown`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:17](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator/lib/generate.ts#L17)

***

### onPluginStepEnd()?

> `optional` **onPluginStepEnd**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:22](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator/lib/generate.ts#L22)

***

### onPluginStepStart()?

> `optional` **onPluginStepStart**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:18](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator/lib/generate.ts#L18)

***

### onStart()?

> `optional` **onStart**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:15](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator/lib/generate.ts#L15)
