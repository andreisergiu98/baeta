# Function: createTypedPubSub()

> **createTypedPubSub**\<`Engine`, `Map`\>(`pubsub`, `options`?): [`TypedPubSub`](../type-aliases/TypedPubSub.md)\<`Engine`, `Map`\>

Creates a type-safe wrapper around a PubSub implementation.

This utility ensures that your subscription channels and their payloads
are properly typed, helping catch potential errors at compile time.

## Type Parameters

• **Engine** _extends_ [`PubSubEngineV2`](../interfaces/PubSubEngineV2.md) \| [`PubSubEngineV3`](../interfaces/PubSubEngineV3.md)

• **Map** _extends_ `Record`\<`string`, `any`\>

## Parameters

### pubsub

`Engine`

The PubSub engine instance (e.g., PubSub, RedisPubSub)

### options?

[`TypedPubSubOptions`](../interfaces/TypedPubSubOptions.md)

Configuration options

## Returns

[`TypedPubSub`](../type-aliases/TypedPubSub.md)\<`Engine`, `Map`\>

## Example

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
