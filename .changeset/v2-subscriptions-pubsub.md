---
"@baeta/subscriptions-pubsub": major
---

`TypedPubSub` is now a concrete class you instantiate with `new`, the `createTypedPubSub()` factory has been removed, and the package targets `graphql-subscriptions` v3 only. Support for `graphql-subscriptions` v2 (and its runtime engine detection) is gone.

#### Creating the PubSub

In v1, `TypedPubSub` was a _type_ and you built the instance with the `createTypedPubSub()` factory, which detected the engine version (`asyncIterator` for v2, `asyncIterableIterator` for v3) at runtime. In v2, `TypedPubSub` is the class itself.

**v1:**

```typescript
import { createTypedPubSub } from "@baeta/subscriptions-pubsub";
import { PubSub } from "graphql-subscriptions";

export const pubsub = createTypedPubSub<PubSub, PubSubMap>(new PubSub());
```

**v2:**

```typescript
import { TypedPubSub } from "@baeta/subscriptions-pubsub";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new TypedPubSub<PubSub, PubSubMap>(new PubSub());
```

The optional `{ prefix }` options object is unchanged and still passed as the second argument.

#### Removed and changed exports

- `createTypedPubSub()` — removed; use `new TypedPubSub(...)`.
- `PubSubEngineV2` / `PubSubEngineV3` — removed. The package now targets a single `graphql-subscriptions` v3 engine.
- `TypedPubSub` — was a type alias in v1; is now the exported class.
- `TypedPubSubOptions` — unchanged.

Because v2 support is dropped, the `asyncIterator` method (the v2-only iterator) is no longer available — use `asyncIterableIterator(channel)` for the async iterable. `publish`, `subscribe`, and `unsubscribe` are unchanged.
