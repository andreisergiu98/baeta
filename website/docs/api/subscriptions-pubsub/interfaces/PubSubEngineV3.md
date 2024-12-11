# Interface: PubSubEngineV3

## Properties

### asyncIterableIterator()

> **asyncIterableIterator**: \<`T`\>(`triggers`, ...`rest`) => `AsyncIterableIterator`\<`T`, `any`, `any`\>

#### Type Parameters

• **T**

#### Parameters

##### triggers

`string` | readonly `string`[]

##### rest

...`any`[]

#### Returns

`AsyncIterableIterator`\<`T`, `any`, `any`\>

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
