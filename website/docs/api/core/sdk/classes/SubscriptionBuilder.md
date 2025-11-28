# SubscriptionBuilder\<Result, Source, Context, Args, Info\>

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

> **new SubscriptionBuilder**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`field`, `extensions`, `store`, `middlewares`): `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<[`SubscriptionWrapper`](../type-aliases/SubscriptionWrapper.md), `Source`, `Context`, `Args`, `Info`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

## Accessors

### field

#### Get Signature

> **get** **field**(): `string`

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

(`middleware`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<SubscriptionWrapper, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> SubscriptionBuilder\<...\>; readonly commitToMethod...

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

(`key`, `value`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<SubscriptionWrapper, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> SubscriptionBuilder\<...\>; readonly commitToMethod...

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

> **toMethods**(): [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

#### Returns

[`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>
