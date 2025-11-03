# Extension

## Constructors

### Constructor

> **new Extension**(): `Extension`

#### Returns

`Extension`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="version"></a> `version`

</td>
<td>

[`V1`](../enumerations/ExtensionVersion.md#v1)

</td>
<td>

`ExtensionVersion.V1`

</td>
</tr>
</tbody>
</table>

## Methods

### build()

> **build**(`module`, `mapper`): `void`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`mapper`

</td>
<td>

[`ResolverMapper`](ResolverMapper.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### getModuleExtensions()

> **getModuleExtensions**(): `object`

#### Returns

`object`

---

### getResolverExtensions()

> **getResolverExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `type`, `field`): `object`

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

`Root`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

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

`Root`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getSubscriptionResolveExtensions()

> **getSubscriptionResolveExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

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

`Root`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getSubscriptionSubscribeExtensions()

> **getSubscriptionSubscribeExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

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

`Root`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

---

### getTransformers()

> **getTransformers**(): [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

#### Returns

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

---

### getTypeExtensions()

> **getTypeExtensions**\<`Result`, `Context`\>(`module`, `type`): `object`

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

`Context`

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

`module`

</td>
<td>

[`ModuleBuilder`](ModuleBuilder.md)

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`
