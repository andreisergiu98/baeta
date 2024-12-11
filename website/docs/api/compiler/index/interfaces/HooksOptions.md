# Interface: HooksOptions

## Properties

### onBuildEnd()

> **onBuildEnd**: (`buildTime`, `warnings`, `errors`) => `void` \| `Promise`\<`void`\>

#### Parameters

##### buildTime

`number`

##### warnings

`string`[]

##### errors

`string`[]

#### Returns

`void` \| `Promise`\<`void`\>

---

### onBuildStart()

> **onBuildStart**: (`startTime`) => `void` \| `Promise`\<`void`\>

#### Parameters

##### startTime

`number`

#### Returns

`void` \| `Promise`\<`void`\>
