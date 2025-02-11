# @baeta/subscriptions-pubsub

## Interfaces

### PubSubEngineV2

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="asynciterator"></a> `asyncIterator`

</td>
<td>

\<`T`\>(`triggers`: `string` \| `string`[], ...`rest`: `any`[]) => `AsyncIterator`\<`T`\>

</td>
</tr>
<tr>
<td>

<a id="publish"></a> `publish`

</td>
<td>

(`triggerName`: `string`, `payload`: `any`, ...`rest`: `any`[]) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="subscribe"></a> `subscribe`

</td>
<td>

(`triggerName`: `string`, `onMessage`: (`message`) => `void` \| `Promise`\<`void`\>, ...`rest`: `any`[]) => `Promise`\<`number`\>

</td>
</tr>
<tr>
<td>

<a id="unsubscribe"></a> `unsubscribe`

</td>
<td>

(`subId`: `number`, ...`rest`: `any`[]) => `void`

</td>
</tr>
</tbody>
</table>

---

### PubSubEngineV3

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="asynciterableiterator"></a> `asyncIterableIterator`

</td>
<td>

\<`T`\>(`triggers`: `string` \| readonly `string`[], ...`rest`: `any`[]) => `AsyncIterableIterator`\<`T`\>

</td>
</tr>
<tr>
<td>

<a id="publish-1"></a> `publish`

</td>
<td>

(`triggerName`: `string`, `payload`: `any`, ...`rest`: `any`[]) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="subscribe-1"></a> `subscribe`

</td>
<td>

(`triggerName`: `string`, `onMessage`: (`message`) => `void` \| `Promise`\<`void`\>, ...`rest`: `any`[]) => `Promise`\<`number`\>

</td>
</tr>
<tr>
<td>

<a id="unsubscribe-1"></a> `unsubscribe`

</td>
<td>

(`subId`: `number`, ...`rest`: `any`[]) => `void`

</td>
</tr>
</tbody>
</table>

---

### TypedPubSubOptions

Configuration options for TypedPubSub

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="prefix"></a> `prefix?`

</td>
<td>

`string`

</td>
<td>

Optional prefix for channel names

</td>
</tr>
</tbody>
</table>

## Type Aliases

### TypedPubSub\<Engine, Map\>

> **TypedPubSub**\<`Engine`, `Map`\>: `Engine` _extends_ [`PubSubEngineV3`](index.md#pubsubenginev3) ? `TypedPubSubV3`\<`Engine`, `Map`\> : `Engine` _extends_ [`PubSubEngineV2`](index.md#pubsubenginev2) ? `TypedPubSubV2`\<`Engine`, `Map`\> : `never`

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

`Engine` _extends_ [`PubSubEngineV2`](index.md#pubsubenginev2) \| [`PubSubEngineV3`](index.md#pubsubenginev3)

</td>
</tr>
<tr>
<td>

`Map` _extends_ `Record`\<`string`, `any`\>

</td>
</tr>
</tbody>
</table>

## Functions

### createTypedPubSub()

> **createTypedPubSub**\<`Engine`, `Map`\>(`pubsub`, `options`?): [`TypedPubSub`](index.md#typedpubsubengine-map)\<`Engine`, `Map`\>

Creates a type-safe wrapper around a PubSub implementation.

This utility ensures that your subscription channels and their payloads
are properly typed, helping catch potential errors at compile time.

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

`Engine` _extends_ [`PubSubEngineV2`](index.md#pubsubenginev2) \| [`PubSubEngineV3`](index.md#pubsubenginev3)

</td>
</tr>
<tr>
<td>

`Map` _extends_ `Record`\<`string`, `any`\>

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pubsub`

</td>
<td>

`Engine`

</td>
<td>

The PubSub engine instance (e.g., PubSub, RedisPubSub)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`TypedPubSubOptions`](index.md#typedpubsuboptions)

</td>
<td>

Configuration options

</td>
</tr>
</tbody>
</table>

#### Returns

[`TypedPubSub`](index.md#typedpubsubengine-map)\<`Engine`, `Map`\>

#### Example

```typescript
// Define your event map
type PubSubMap = {
  "user-updated": User;
  [c: `user-updated-${string}`]: User;
};

// Create typed PubSub instance
const pubsub = createTypedPubSub<PubSub, PubSubMap>(new PubSub());

// Usage with Redis
const pubsub = createTypedPubSub<RedisPubSub, PubSubMap>(
  new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  }),
  {
    prefix: "feature-1:",
  },
);
```
