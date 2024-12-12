# sdk

## Interfaces

### ConfigProps

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

`initialConfig`

</td>
<td>

[`LoadedBaetaConfig`](sdk.md#loadedbaetaconfig)

</td>
</tr>
<tr>
<td>

`watchConfig?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

---

### ErrorsProps

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

`errors?`

</td>
<td>

[`TextOutput`](sdk.md#textoutput)[]

</td>
</tr>
<tr>
<td>

`warnings?`

</td>
<td>

[`TextOutput`](sdk.md#textoutput)[]

</td>
</tr>
</tbody>
</table>

---

### LayoutProps

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

`color?`

</td>
<td>

`LiteralUnion`\<keyof ForegroundColor, `string`\>

</td>
</tr>
<tr>
<td>

`loading?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`time?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`timePrefix?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`title?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### LoadedBaetaConfig

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

`config`

</td>
<td>

[`BaetaOptions`](module_index.md#baetaoptions)

</td>
</tr>
<tr>
<td>

`location`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`relativeLocation`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### TimeProps

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

`prefix?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### ConfigEventMap

> **ConfigEventMap**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`update`

</td>
<td>

[[`LoadedBaetaConfig`](sdk.md#loadedbaetaconfig)]

</td>
</tr>
</tbody>
</table>

---

### TextOutput

> **TextOutput**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Variables

### errorNamespace

> `const` **errorNamespace**: `string`

## Functions

### ConfigProvider()

> **ConfigProvider**(`props`): `Element`

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

`props`

</td>
<td>

`PropsWithChildren`\<[`ConfigProps`](sdk.md#configprops)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### ConfigProviderBase()

> **ConfigProviderBase**(`props`): `Element`

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

`props`

</td>
<td>

`PropsWithChildren`\<[`ConfigProps`](sdk.md#configprops)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### ConfigStatus()

> **ConfigStatus**(): `null` \| `Element`

#### Returns

`null` \| `Element`

---

### createCommand()

> **createCommand**\<`Args`\>(`options`): `CommandModule`\<`Args`, `Args`\>

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

`Args`

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

`options`

</td>
<td>

`CommandModule`\<`Args`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`CommandModule`\<`Args`, `Args`\>

---

### Errors()

> **Errors**(`props`): `Element`

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

`props`

</td>
<td>

[`ErrorsProps`](sdk.md#errorsprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### Layout()

> **Layout**(`props`): `Element`

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

`props`

</td>
<td>

`PropsWithChildren`\<[`LayoutProps`](sdk.md#layoutprops)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### makeErrorMessage()

> **makeErrorMessage**(`message`, `bold`): `string`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`bold`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### makeErrorOutput()

> **makeErrorOutput**(`id`, `message`, `bold`): `object`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`bold`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name   | Type     |
| ------ | -------- |
| `id`   | `string` |
| `text` | `string` |

---

### renderComponent()

> **renderComponent**\<`P`\>(`Component`, `props`, `configProps`?): `void`

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

`P` _extends_ `object`

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

`Component`

</td>
<td>

`FunctionComponent`\<`P`\>

</td>
</tr>
<tr>
<td>

`props`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`configProps`?

</td>
<td>

[`ConfigProps`](sdk.md#configprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### renderComponentWithoutConfig()

> **renderComponentWithoutConfig**\<`P`\>(`component`, `props`?): `void`

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

`P` _extends_ `object`

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

`component`

</td>
<td>

`FunctionComponent`\<`P`\>

</td>
</tr>
<tr>
<td>

`props`?

</td>
<td>

`null` \| `P`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### Spinner()

> **Spinner**(): `Element`

#### Returns

`Element`

---

### Time()

> **Time**(`props`): `null` \| `Element`

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

`props`

</td>
<td>

[`TimeProps`](sdk.md#timeprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `Element`

---

### useConfig()

> **useConfig**(): `object`

#### Returns

`object`

| Name               | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| `config`           | [`BaetaOptions`](module_index.md#baetaoptions)              |
| `events`           | `EventEmitter`\<[`ConfigEventMap`](sdk.md#configeventmap)\> |
| `location`         | `string`                                                    |
| `relativeLocation` | `string`                                                    |

---

### useConfigStore()

> **useConfigStore**(`props`): `object`

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

`props`

</td>
<td>

[`ConfigProps`](sdk.md#configprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name               | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| `config`           | [`BaetaOptions`](module_index.md#baetaoptions)              |
| `events`           | `EventEmitter`\<[`ConfigEventMap`](sdk.md#configeventmap)\> |
| `location`         | `string`                                                    |
| `relativeLocation` | `string`                                                    |
