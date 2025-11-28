# TypeBuilder\<Source, Context, Info, FieldsBuilders, FieldsResolvers\>

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

`Source`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Info`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`FieldsBuilders` _extends_ [`FieldsBuildersMap`](../type-aliases/FieldsBuildersMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`Any`

</td>
</tr>
<tr>
<td>

`FieldsResolvers` _extends_ [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`Any`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new TypeBuilder**\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>(`type`, `fieldBuilders`, `extensions`, `store`, `middlewares`): `TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`fieldBuilders`

</td>
<td>

`Readonly`\<`FieldsBuilders`\>

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

readonly [`Extension`](Extension.md)\<`unknown`\>[]

</td>
</tr>
<tr>
<td>

`store`

</td>
<td>

`Map`\<`symbol`, `Readonly`\<`unknown`\>\>

</td>
</tr>
<tr>
<td>

`middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

## Accessors

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

## Methods

### edit()

> **edit**(): `object`

#### Returns

`object`

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

`addMiddleware()`

</td>
<td>

(`middleware`) => \{ readonly type: string; readonly addMiddleware: (middleware: Middleware\<unknown, Source, Context, unknown, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ get: () =\> T \| undefined; set: (value: Readonly\<...\>) =\> void; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> T...

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `any`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `any`\>

</td>
</tr>
<tr>
<td>

`setStore()`

</td>
<td>

(`key`, `value`) => \{ readonly type: string; readonly addMiddleware: (middleware: Middleware\<unknown, Source, Context, unknown, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ get: () =\> T \| undefined; set: (value: Readonly\<...\>) =\> void; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> T...

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

`useStore()`

</td>
<td>

\<`T`\>(`key`) => `object`

</td>
</tr>
</tbody>
</table>

---

### toMethods()

> **toMethods**(): [`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

#### Returns

[`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>
