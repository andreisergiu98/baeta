# Interface: GeneratorHooks

## Properties

### onEnd()?

> `optional` **onEnd**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:16](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator/lib/generate.ts#L16)

***

### onError()?

> `optional` **onError**: (`error`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **error**: `unknown`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:17](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator/lib/generate.ts#L17)

***

### onPluginStepEnd()?

> `optional` **onPluginStepEnd**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:22](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator/lib/generate.ts#L22)

***

### onPluginStepStart()?

> `optional` **onPluginStepStart**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:18](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator/lib/generate.ts#L18)

***

### onStart()?

> `optional` **onStart**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[generator/lib/generate.ts:15](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator/lib/generate.ts#L15)
