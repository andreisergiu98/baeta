# TypedPubSub\<Engine, Map\>

Creates a type-safe wrapper around a PubSub implementation.

This utility ensures that your subscription channels and their payloads
are properly typed, helping catch potential errors at compile time.

## Param

The PubSub engine instance (e.g., PubSub, RedisPubSub)

## Param

Configuration options

## Example

```typescript
// Define your event map
type PubSubMap = {
  "user-updated": User;
  [c: `user-updated-${string}`]: User;
};

// Create typed PubSub instance
const pubsub = new TypedPubSub<PubSub, PubSubMap>(new PubSub());

// Usage with Redis
const pubsub = new TypedPubSub<RedisPubSub, PubSubMap>(
  new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  }),
  {
    prefix: "feature-1:",
  },
);
```

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Engine` _extends_ `PubSubEngine`

</td>
</tr>
<tr>
<td>

`Map` _extends_ `PubSubMap`

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="channelprefix"></a> `channelPrefix`

</td>
<td>

`protected`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="pubsub"></a> `pubsub`

</td>
<td>

`protected`

</td>
<td>

`Engine`

</td>
</tr>
<tr>
<td>

<a id="options"></a> `options?`

</td>
<td>

`protected`

</td>
<td>

[`TypedPubSubOptions`](TypedPubSubOptions.md)

</td>
</tr>
</tbody>
</table>

## Methods

### asyncIterableIterator()

> **asyncIterableIterator**\<`C`\>(`triggers`, ...`rest`): `AsyncIterableIterator`\<`Map`\[`C`\], `any`, `any`\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ `string` \| `number` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`triggers`

</td>
<td>

`C` \| `C`[]

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`RestAsyncIterableIteratorFnArgs`\<`Engine`\[`"asyncIterableIterator"`\]\>

</td>
</tr>
</tbody>
</table>

#### Returns

`AsyncIterableIterator`\<`Map`\[`C`\], `any`, `any`\>

---

### mapChannel()

> `protected` **mapChannel**\<`C`\>(`channel`): `string`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ `string` \| `number` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`channel`

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### mapTriggers()

> `protected` **mapTriggers**\<`C`\>(`triggers`): `string` \| `string`[]

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ `string` \| `number` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`triggers`

</td>
<td>

`C` \| `C`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`string` \| `string`[]

---

### publish()

> **publish**\<`C`\>(`channel`, `message`, ...`rest`): `Promise`\<`void`\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ `string` \| `number` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`channel`

</td>
<td>

`C`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`Map`\[`C`\]

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`RestPayloadFnArgs`\<`Engine`\[`"publish"`\]\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### subscribe()

> **subscribe**\<`C`\>(`channel`, `onMessage`, ...`rest`): `Promise`\<`number`\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ `string` \| `number` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`channel`

</td>
<td>

`C`

</td>
</tr>
<tr>
<td>

`onMessage`

</td>
<td>

`OnMessage`\<`Map`\[`C`\]\>

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`RestSubscribeFnArgs`\<`Engine`\[`"subscribe"`\]\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`number`\>

---

### unsubscribe()

> **unsubscribe**(`subId`, ...`rest`): `void`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subId`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`RestUnsubscribeFnArgs`\<`Engine`\[`"unsubscribe"`\]\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
