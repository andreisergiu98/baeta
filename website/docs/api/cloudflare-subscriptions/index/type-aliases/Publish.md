# Type Alias: Publish()\<Map\>

> **Publish**\<`Map`\>: \<`C`, `P`\>(`topic`, `payload`) => `Promise`\<`void`\>

## Type Parameters

• **Map** *extends* `DefaultPubSubMap`

## Type Parameters

• **C** *extends* keyof `Map`

• **P** *extends* `Map`\[`C`\]

## Parameters

• **topic**: `C`

• **payload**: `P`

## Returns

`Promise`\<`void`\>

## Defined in

[lib/subscription.ts:18](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L18)
