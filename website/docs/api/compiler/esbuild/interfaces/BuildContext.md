# Interface: BuildContext\<ProvidedOptions\>

## Type Parameters

• **ProvidedOptions** _extends_ [`BuildOptions`](BuildOptions.md) = [`BuildOptions`](BuildOptions.md)

## Methods

### cancel()

> **cancel**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### dispose()

> **dispose**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### rebuild()

> **rebuild**(): `Promise`\<[`BuildResult`](BuildResult.md)\<`ProvidedOptions`\>\>

Documentation: https://esbuild.github.io/api/#rebuild

#### Returns

`Promise`\<[`BuildResult`](BuildResult.md)\<`ProvidedOptions`\>\>

---

### serve()

> **serve**(`options`?): `Promise`\<[`ServeResult`](ServeResult.md)\>

Documentation: https://esbuild.github.io/api/#serve

#### Parameters

• **options?**: [`ServeOptions`](ServeOptions.md)

#### Returns

`Promise`\<[`ServeResult`](ServeResult.md)\>

---

### watch()

> **watch**(`options`?): `Promise`\<`void`\>

Documentation: https://esbuild.github.io/api/#watch

#### Parameters

• **options?**: [`WatchOptions`](WatchOptions.md)

#### Returns

`Promise`\<`void`\>
