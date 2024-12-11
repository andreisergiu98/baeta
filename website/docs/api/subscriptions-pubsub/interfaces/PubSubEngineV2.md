# Interface: PubSubEngineV2

## Properties

### asyncIterator()

> **asyncIterator**: \<`T`\>(`triggers`, ...`rest`) => `AsyncIterator`\<`T`, `any`, `any`\>

#### Type Parameters

• **T**

#### Parameters

##### triggers

`string` | `string`[]

##### rest

...`any`[]

#### Returns

`AsyncIterator`\<`T`, `any`, `any`\>

---

### publish()

> **publish**: (`triggerName`, `payload`, ...`rest`) => `Promise`\<`void`\>

#### Parameters

##### triggerName

`string`

##### payload

`any`

##### rest

...`any`[]

#### Returns

`Promise`\<`void`\>

---

### subscribe()

> **subscribe**: (`triggerName`, `onMessage`, ...`rest`) => `Promise`\<`number`\>

#### Parameters

##### triggerName

`string`

##### onMessage

(`message`) => `void` \| `Promise`\<`void`\>

##### rest

...`any`[]

#### Returns

`Promise`\<`number`\>

---

### unsubscribe()

> **unsubscribe**: (`subId`, ...`rest`) => `void`

#### Parameters

##### subId

`number`

##### rest

...`any`[]

#### Returns

`void`
