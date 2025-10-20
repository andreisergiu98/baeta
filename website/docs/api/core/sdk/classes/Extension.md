# Extension\<Settings\>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Settings`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new Extension**\<`Settings`\>(): `Extension`\<`Settings`\>

#### Returns

`Extension`\<`Settings`\>

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

<a id="statekey"></a> `stateKey`

</td>
<td>

`abstract`

</td>
<td>

`symbol`

</td>
</tr>
</tbody>
</table>

## Methods

### getFieldExtensions()

> **getFieldExtensions**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`_builder`): `object`

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

`Result`

</td>
</tr>
<tr>
<td>

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`Info`

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

`_builder`

</td>
<td>

[`FieldBuilder`](FieldBuilder.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getModuleExtensions()

> **getModuleExtensions**\<`Context`, `Info`\>(`_builder`): `object`

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

`Context`

</td>
</tr>
<tr>
<td>

`Info`

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

`_builder`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)\<`Context`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getState()

> **getState**(`builder`): `Settings` \| `undefined`

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

`builder`

</td>
<td>

`EditableBuilderLike`

</td>
</tr>
</tbody>
</table>

#### Returns

`Settings` \| `undefined`

---

### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`_builder`): `object`

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

`Result`

</td>
</tr>
<tr>
<td>

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`Info`

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

`_builder`

</td>
<td>

[`SubscriptionBuilder`](SubscriptionBuilder.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getTypeExtensions()

> **getTypeExtensions**\<`Source`, `Context`, `Info`\>(`_builder`): `object`

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

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Info`

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

`_builder`

</td>
<td>

[`TypeBuilder`](TypeBuilder.md)\<`Source`, `Context`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### mutate()

> **mutate**(`_compilers`): `void`

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

`_compilers`

</td>
<td>

[`ModuleCompiler`](ModuleCompiler.md)\<`any`, `any`, `any`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### setState()

> **setState**(`builder`, `settings`): `void`

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

`builder`

</td>
<td>

`EditableBuilderLike`

</td>
</tr>
<tr>
<td>

`settings`

</td>
<td>

`Settings`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
