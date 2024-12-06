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

[lib/subscription.ts:8](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription.ts#L8)
