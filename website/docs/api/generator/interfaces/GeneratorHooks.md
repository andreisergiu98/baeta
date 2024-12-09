# Interface: GeneratorHooks

## Properties

### onEnd()?

> `optional` **onEnd**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>

---

### onError()?

> `optional` **onError**: (`error`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **error**: `unknown`

#### Returns

`void` \| `Promise`\<`void`\>

---

### onPluginStepEnd()?

> `optional` **onPluginStepEnd**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

---

### onPluginStepStart()?

> `optional` **onPluginStepStart**: (`plugin`, `step`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **plugin**: [`GeneratorPluginV1`](GeneratorPluginV1.md)\<`unknown`\>

• **step**: `"end"` \| `"setup"` \| `"generate"`

#### Returns

`void` \| `Promise`\<`void`\>

---

### onStart()?

> `optional` **onStart**: () => `void` \| `Promise`\<`void`\>

#### Returns

`void` \| `Promise`\<`void`\>
