# FieldBuilder\<Result, Source, Context, Args, Info\>

## Type Parameters

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

## Constructors

### Constructor

> **new FieldBuilder**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`type`, `field`, `extensions`, `store`, `middlewares`): `FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

`field`

</td>
<td>

`string`

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

## Accessors

### field

#### Get Signature

> **get** **field**(): `string`

##### Returns

`string`

---

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

(`middleware`) => \{ readonly type: string; readonly field: string; readonly addMiddleware: (middleware: Middleware\<Result, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> FieldBuilder\<...\>; readonly commitToMet...

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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
<tr>
<td>

`setStore()`

</td>
<td>

(`key`, `value`) => \{ readonly type: string; readonly field: string; readonly addMiddleware: (middleware: Middleware\<Result, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> FieldBuilder\<...\>; readonly commitToMet...

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

> **toMethods**(): [`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

#### Returns

[`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>
