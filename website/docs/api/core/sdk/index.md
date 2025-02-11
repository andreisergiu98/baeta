# sdk

## Namespaces

- [BaetaExtensions](namespaces/BaetaExtensions.md)

## Enumerations

### ExtensionVersion

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="v1"></a> `V1`

</td>
<td>

`"v1"`

</td>
</tr>
</tbody>
</table>

## Classes

### Extension

#### Constructors

##### new Extension()

> **new Extension**(): [`Extension`](index.md#extension)

###### Returns

[`Extension`](index.md#extension)

#### Properties

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

[`V1`](index.md#v1)

</td>
<td>

`ExtensionVersion.V1`

</td>
</tr>
</tbody>
</table>

#### Methods

##### build()

> **build**(`module`, `mapper`): `void`

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

</td>
</tr>
<tr>
<td>

`mapper`

</td>
<td>

[`ResolverMapper`](index.md#resolvermapper)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### getModuleExtensions()

> **getModuleExtensions**(): `object`

###### Returns

`object`

##### getResolverExtensions()

> **getResolverExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `type`, `field`): `object`

###### Type Parameters

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

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

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

###### Returns

`object`

##### getSubscriptionExtensions()

> **getSubscriptionExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

###### Type Parameters

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

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

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

###### Returns

`object`

##### getSubscriptionResolveExtensions()

> **getSubscriptionResolveExtensions**\<`Result`, `Root`, `Context`, `Args`\>(`module`, `field`): `object`

###### Type Parameters

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

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

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

###### Returns

`object`

##### getSubscriptionSubscribeExtensions()

> **getSubscriptionSubscribeExtensions**\<`Root`, `Context`, `Args`\>(`module`, `field`): `object`

###### Type Parameters

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

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

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

###### Returns

`object`

##### getTransformers()

> **getTransformers**(): [`SchemaTransformer`](index.md#schematransformer)[]

###### Returns

[`SchemaTransformer`](index.md#schematransformer)[]

##### getTypeExtensions()

> **getTypeExtensions**\<`Result`, `Context`\>(`module`, `type`): `object`

###### Type Parameters

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

###### Parameters

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

[`ModuleBuilder`](index.md#modulebuilder)

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

###### Returns

`object`

---

### ModuleBuilder

#### Constructors

##### new ModuleBuilder()

> **new ModuleBuilder**(`id`, `dirname`, `hashes`, `typedef`, `extensions`): [`ModuleBuilder`](index.md#modulebuilder)

###### Parameters

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`dirname`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`hashes`

</td>
<td>

[`TypeHashMap`](index.md#typehashmap)

</td>
</tr>
<tr>
<td>

`typedef`

</td>
<td>

`DocumentNode`

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

[`Extension`](index.md#extension)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ModuleBuilder`](index.md#modulebuilder)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="dirname"></a> `dirname`

</td>
<td>

`readonly`

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

<a id="hashes"></a> `hashes`

</td>
<td>

`readonly`

</td>
<td>

[`TypeHashMap`](index.md#typehashmap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`readonly`

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

<a id="mapper"></a> `mapper`

</td>
<td>

`readonly`

</td>
<td>

[`ResolverMapper`](index.md#resolvermapper)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="transformers"></a> `transformers`

</td>
<td>

`readonly`

</td>
<td>

[`SchemaTransformer`](index.md#schematransformer)[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

<a id="typedef"></a> `typedef`

</td>
<td>

`readonly`

</td>
<td>

`DocumentNode`

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

#### Methods

##### build()

> **build**(): `object`

###### Returns

`object`

| Name        | Type                          |
| ----------- | ----------------------------- |
| `resolvers` | `IResolvers`                  |
| `transform` | (`schema`) => `GraphQLSchema` |
| `typedef`   | `DocumentNode`                |

##### createMiddlewareBuilder()

> **createMiddlewareBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`middleware`) => `void`

###### Type Parameters

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

###### Parameters

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
</tbody>
</table>

###### Returns

`Function`

###### Parameters

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

`middleware`

</td>
<td>

[`Middleware`](../module_index.md#middlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### createModuleMethods()

> **createModuleMethods**\<`Context`\>(): [`ModuleExtensions`](namespaces/BaetaExtensions.md#moduleextensions) & `object`

###### Type Parameters

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
</tbody>
</table>

###### Returns

[`ModuleExtensions`](namespaces/BaetaExtensions.md#moduleextensions) & `object`

##### createResolverBuilder()

> **createResolverBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`resolver`) => `void` & [`ResolverExtensions`](namespaces/BaetaExtensions.md#resolverextensionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\> & `object`

###### Type Parameters

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

###### Parameters

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
</tbody>
</table>

###### Returns

(`resolver`) => `void` & [`ResolverExtensions`](namespaces/BaetaExtensions.md#resolverextensionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\> & `object`

##### createResolveType()

> **createResolveType**\<`Result`, `Value`, `Context`\>(`type`): (`resolver`) => `void`

###### Type Parameters

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

`Value`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

###### Parameters

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
</tbody>
</table>

###### Returns

`Function`

###### Parameters

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

`resolver`

</td>
<td>

[`TypeResolver`](../module_index.md#typeresolverresult-value-context)\<`Result`, `Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### createScalarBuilder()

> **createScalarBuilder**(`scalar`): (`resolver`) => `void`

###### Parameters

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

`scalar`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Function`

###### Parameters

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

`resolver`

</td>
<td>

[`ScalarResolver`](../module_index.md#scalarresolver)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### createSubscriptionBuilder()

> **createSubscriptionBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`field`): \<`Payload`\>(`subscription`) => `void` & `object`

###### Type Parameters

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

###### Parameters

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
</tbody>
</table>

###### Returns

\<`Payload`\>(`subscription`) => `void` & `object`

##### createSubscriptionMethods()

> **createSubscriptionMethods**\<`Root`, `Context`\>(): [`TypeExtensions`](namespaces/BaetaExtensions.md#typeextensionsroot-context)\<`Root`, `Context`\> & `object` & `object`

###### Type Parameters

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
</tbody>
</table>

###### Returns

[`TypeExtensions`](namespaces/BaetaExtensions.md#typeextensionsroot-context)\<`Root`, `Context`\> & `object` & `object`

##### createTypeMethods()

> **createTypeMethods**\<`Root`, `Context`\>(`type`): [`TypeExtensions`](namespaces/BaetaExtensions.md#typeextensionsroot-context)\<`Root`, `Context`\> & `object`

###### Type Parameters

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
</tbody>
</table>

###### Parameters

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
</tbody>
</table>

###### Returns

[`TypeExtensions`](namespaces/BaetaExtensions.md#typeextensionsroot-context)\<`Root`, `Context`\> & `object`

---

### ResolverMapper

#### Constructors

##### new ResolverMapper()

> **new ResolverMapper**(): [`ResolverMapper`](index.md#resolvermapper)

###### Returns

[`ResolverMapper`](index.md#resolvermapper)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="middlewares"></a> `middlewares`

</td>
<td>

`readonly`

</td>
<td>

[`MiddlewareMap`](index.md#middlewaremap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="prependedmiddlewares"></a> `prependedMiddlewares`

</td>
<td>

`readonly`

</td>
<td>

[`MiddlewareMap`](index.md#middlewaremap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="resolvers"></a> `resolvers`

</td>
<td>

`readonly`

</td>
<td>

[`ResolversMap`](index.md#resolversmap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="scalars"></a> `scalars`

</td>
<td>

`readonly`

</td>
<td>

[`ScalarsMap`](index.md#scalarsmap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="typefields"></a> `typeFields`

</td>
<td>

`readonly`

</td>
<td>

`Record`\<`string`, `undefined` \| `string`[]\>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="types"></a> `types`

</td>
<td>

`readonly`

</td>
<td>

`string`[]

</td>
<td>

`[]`

</td>
</tr>
</tbody>
</table>

#### Methods

##### addMiddleware()

> **addMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

###### Type Parameters

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

###### Parameters

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

`middleware`

</td>
<td>

[`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### addMiddlewareToMap()

> `protected` **addMiddlewareToMap**\<`Result`, `Root`, `Context`, `Args`\>(`map`, `type`, `field`, `middleware`): `void`

###### Type Parameters

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

###### Parameters

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

`map`

</td>
<td>

[`MiddlewareMap`](index.md#middlewaremap)

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
<tr>
<td>

`middleware`

</td>
<td>

[`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### compose()

> **compose**(): `IResolvers`

###### Returns

`IResolvers`

##### getTypeFields()

> **getTypeFields**(`type`): `string`[]

###### Parameters

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
</tbody>
</table>

###### Returns

`string`[]

##### getTypes()

> **getTypes**(): `string`[]

###### Returns

`string`[]

##### prependMiddleware()

> **prependMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

###### Type Parameters

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

###### Parameters

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

`middleware`

</td>
<td>

[`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### registerTypeField()

> **registerTypeField**(`type`, `field`): `void`

###### Parameters

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
</tbody>
</table>

###### Returns

`void`

##### setDefaultFieldResolver()

> **setDefaultFieldResolver**(`type`, `field`): `void`

###### Parameters

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
</tbody>
</table>

###### Returns

`void`

##### setResolver()

> **setResolver**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `resolver`): `void`

###### Type Parameters

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

###### Parameters

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

`resolver`

</td>
<td>

[`NativeResolver`](index.md#nativeresolverresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setScalar()

> **setScalar**(`scalar`, `resolver`): `void`

###### Parameters

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

`scalar`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`ScalarResolver`](../module_index.md#scalarresolver)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setSubscription()

> **setSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>(`field`, `resolver`): `void`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Payload`

</td>
</tr>
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

###### Parameters

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

`resolver`

</td>
<td>

[`NativeSubscription`](index.md#nativesubscriptionpayload-result-root-context-args)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setTypenameResolver()

> **setTypenameResolver**\<`Result`, `Value`, `Context`\>(`type`, `resolver`): `void`

###### Type Parameters

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

`Value`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

###### Parameters

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

`resolver`

</td>
<td>

[`NativeTypeResolver`](index.md#nativetyperesolverresult-value-context)\<`Result`, `Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

## Interfaces

### Module\<T\>

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

`T`

</td>
</tr>
</tbody>
</table>

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

<a id="createmanager"></a> `createManager`

</td>
<td>

(`builder`: [`ModuleBuilder`](index.md#modulebuilder)) => `T`

</td>
</tr>
<tr>
<td>

<a id="dirname-1"></a> `dirname`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="hashes-1"></a> `hashes`

</td>
<td>

[`TypeHashMap`](index.md#typehashmap)

</td>
</tr>
<tr>
<td>

<a id="id-1"></a> `id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="typedef-1"></a> `typedef`

</td>
<td>

`DocumentNode`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### ExtensionFactory()\<E\>

> **ExtensionFactory**\<`E`\>: () => `E`

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

`E` _extends_ [`Extension`](index.md#extension)

</td>
</tr>
</tbody>
</table>

#### Returns

`E`

---

### FieldResolvers

> **FieldResolvers**: `Record`\<`string`, [`NativeResolver`](index.md#nativeresolverresult-root-context-args)\> & `object`

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

`__resolveType`?

</td>
<td>

[`NativeTypeResolver`](index.md#nativetyperesolverresult-value-context)

</td>
</tr>
</tbody>
</table>

---

### MiddlewareMap

> **MiddlewareMap**: `Record`\<`string`, [`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)[] \| `undefined`\>

---

### NativeMiddleware()\<Result, Root, Context, Args\>

> **NativeMiddleware**\<`Result`, `Root`, `Context`, `Args`\>: (`next`) => `GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

#### Type Parameters

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

`Result`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args`

</td>
<td>

`unknown`

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

`next`

</td>
<td>

`GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

---

### NativeResolver\<Result, Root, Context, Args\>

> **NativeResolver**\<`Result`, `Root`, `Context`, `Args`\>: `GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result`\>

#### Type Parameters

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

`Result`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

---

### NativeSubscription\<Payload, Result, Root, Context, Args\>

> **NativeSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>: `object`

#### Type Parameters

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

`Payload`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Result`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

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

<a id="subscribe"></a> `subscribe`

</td>
<td>

[`NativeSubscriptionSubscribe`](index.md#nativesubscriptionsubscribepayload-root-context-args)\<`Payload`, `Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`?

</td>
<td>

`GraphQLFieldResolver`\<`Payload`, `Context`, `Args`, `Result`\>

</td>
</tr>
</tbody>
</table>

---

### NativeSubscriptionSubscribe()\<Payload, Root, Context, Args\>

> **NativeSubscriptionSubscribe**\<`Payload`, `Root`, `Context`, `Args`\>: (`source`, `args`, `context`, `info`) => `AsyncIterator`\<`Payload`\> \| `Promise`\<`AsyncIterator`\<`Payload`\>\>

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

`Payload`

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

`source`

</td>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`args`

</td>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`info`

</td>
<td>

`GraphQLResolveInfo`

</td>
</tr>
</tbody>
</table>

#### Returns

`AsyncIterator`\<`Payload`\> \| `Promise`\<`AsyncIterator`\<`Payload`\>\>

---

### NativeTypeResolver\<Result, Value, Context\>

> **NativeTypeResolver**\<`Result`, `Value`, `Context`\>: `GraphQLTypeResolver`\<`Value`, `Context`\>

#### Type Parameters

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

`Result`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Value`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

---

### ResolversMap

> **ResolversMap**: `object` & [`SubscriptionsResolvers`](index.md#subscriptionsresolvers)

---

### ScalarsMap

> **ScalarsMap**: `Record`\<`string`, [`ScalarResolver`](../module_index.md#scalarresolver) \| `undefined`\>

---

### SchemaTransformer()

> **SchemaTransformer**: (`schema`) => `GraphQLSchema`

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

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLSchema`

---

### SubscriptionsResolvers

> **SubscriptionsResolvers**: `object`

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

<a id="subscription"></a> `Subscription`?

</td>
<td>

`Record`\<`string`, [`NativeSubscription`](index.md#nativesubscriptionpayload-result-root-context-args) \| `undefined`\>

</td>
</tr>
</tbody>
</table>

---

### TypeHash

> **TypeHash**: `object`

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

<a id="fieldshashes"></a> `fieldsHashes`

</td>
<td>

`Record`\<`string`, `string` \| `undefined`\>

</td>
</tr>
<tr>
<td>

<a id="hash"></a> `hash`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### TypeHashMap

> **TypeHashMap**: `Record`\<`string`, [`TypeHash`](index.md#typehash) \| `undefined`\>

## Functions

### addValidationToSchema()

> **addValidationToSchema**(`schema`): `GraphQLSchema`

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

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLSchema`

---

### createMiddlewareAdapter()

> **createMiddlewareAdapter**\<`Result`, `Root`, `Context`, `Args`\>(`middleware`): [`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

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

`middleware`

</td>
<td>

[`Middleware`](../module_index.md#middlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`NativeMiddleware`](index.md#nativemiddlewareresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

---

### createModuleManager()

> **createModuleManager**\<`T`\>(`moduleMetadata`, `extensions`?): `Omit`\<`T`, `"$builder"`\>

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

`T`

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

`moduleMetadata`

</td>
<td>

[`Module`](index.md#modulet)\<`T`\>

</td>
</tr>
<tr>
<td>

`extensions`?

</td>
<td>

[`ExtensionFactory`](index.md#extensionfactorye)\<[`Extension`](index.md#extension)\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Omit`\<`T`, `"$builder"`\>

---

### createObjectLens()

> **createObjectLens**\<`T`\>(`input`, `path`): `object`

A lens to get and set values in an object, that fails silently if the path does not exist.

#### Type Parameters

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

`T`

</td>
<td>

`unknown`

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

`input`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

(`string` \| `number`)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name  | Type                   |
| ----- | ---------------------- |
| `get` | () => `null` \| `T`    |
| `set` | (`value`) => `boolean` |

---

### createResolverAdapter()

> **createResolverAdapter**\<`Result`, `Root`, `Context`, `Args`\>(`resolver`): [`NativeResolver`](index.md#nativeresolverresult-root-context-args)\<`Result` \| `PromiseLike`\<`Result`\>, `Root`, `Context`, `Args`\>

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

`resolver`

</td>
<td>

[`Resolver`](../module_index.md#resolverresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`NativeResolver`](index.md#nativeresolverresult-root-context-args)\<`Result` \| `PromiseLike`\<`Result`\>, `Root`, `Context`, `Args`\>

---

### createSingletonModule()

> **createSingletonModule**\<`T`\>(`create`): () => `T`

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

`T`

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

`create`

</td>
<td>

() => `T`

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

##### Returns

`T`

---

### createSubscriptionAdapter()

> **createSubscriptionAdapter**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>(`subscription`): [`NativeSubscription`](index.md#nativesubscriptionpayload-result-root-context-args)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

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

`Payload`

</td>
</tr>
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

`subscription`

</td>
<td>

[`Subscription`](../module_index.md#subscriptionpayload-result-root-context-args)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`NativeSubscription`](index.md#nativesubscriptionpayload-result-root-context-args)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

---

### createTypeResolverAdapter()

> **createTypeResolverAdapter**\<`Result`, `Value`, `Context`\>(`resolver`): [`NativeTypeResolver`](index.md#nativetyperesolverresult-value-context)\<`Result`, `Value`, `Context`\>

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

`Value`

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

`resolver`

</td>
<td>

[`TypeResolver`](../module_index.md#typeresolverresult-value-context)\<`Result`, `Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`NativeTypeResolver`](index.md#nativetyperesolverresult-value-context)\<`Result`, `Value`, `Context`\>

---

### extendFunction()

> **extendFunction**\<`B`, `M`\>(`fn`, `ext`): `B` & `M`

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

`B` _extends_ (...`args`) => `any`

</td>
</tr>
<tr>
<td>

`M` _extends_ `object`

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

`fn`

</td>
<td>

`B`

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`M`

</td>
</tr>
</tbody>
</table>

#### Returns

`B` & `M`

---

### getModuleBuilder()

> **getModuleBuilder**(`module`): [`ModuleBuilder`](index.md#modulebuilder)

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

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`ModuleBuilder`](index.md#modulebuilder)

---

### mergeExtensions()

> **mergeExtensions**\<`T`, `K`\>(`items`, `callback`): `Record`\<`string`, `unknown`\>

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

`T`

</td>
</tr>
<tr>
<td>

`K` _extends_ `Record`\<`string`, `unknown`\>

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

`items`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`item`) => `K`

</td>
</tr>
</tbody>
</table>

#### Returns

`Record`\<`string`, `unknown`\>

---

### mergeMiddlewareMaps()

> **mergeMiddlewareMaps**(`target`, `source`): [`MiddlewareMap`](index.md#middlewaremap)

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

`target`

</td>
<td>

[`MiddlewareMap`](index.md#middlewaremap)

</td>
</tr>
<tr>
<td>

`source`

</td>
<td>

[`MiddlewareMap`](index.md#middlewaremap)

</td>
</tr>
</tbody>
</table>

#### Returns

[`MiddlewareMap`](index.md#middlewaremap)

---

### nameFunction()

> **nameFunction**(`fn`, `name`): `void`

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

`fn`

</td>
<td>

(...`args`) => `any`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### resolveExtensions()

> **resolveExtensions**\<`T`\>(`list`): `T`[]

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

`T`

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

`list`

</td>
<td>

() => `T`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`T`[]

---

### transformSchema()

> **transformSchema**(`schema`, `transformers`): `GraphQLSchema`

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

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
<tr>
<td>

`transformers`

</td>
<td>

[`SchemaTransformer`](index.md#schematransformer)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLSchema`

---

### withExtensions()

> **withExtensions**\<`Core`, `Ext`\>(`core`, `ext`): `Ext` & `Core`

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

`Core`

</td>
</tr>
<tr>
<td>

`Ext`

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

`core`

</td>
<td>

`Core`

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`Ext`

</td>
</tr>
</tbody>
</table>

#### Returns

`Ext` & `Core`
