# Type Alias: TypedPubSub\<Engine, Map\>

> **TypedPubSub**\<`Engine`, `Map`\>: `Engine` *extends* `PubSubEngineV3` ? `TypedPubSubV3`\<`Engine`, `Map`\> : `Engine` *extends* `PubSubEngineV2` ? `TypedPubSubV2`\<`Engine`, `Map`\> : `never`

## Type Parameters

• **Engine** *extends* `PubSubEngineV2` \| `PubSubEngineV3`

• **Map** *extends* `PubSubMap`
