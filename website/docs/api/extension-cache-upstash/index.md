# @baeta/extension-cache-upstash

## Classes

### UpstashClient

#### Extends

- `Redis`

#### Constructors

##### new UpstashClient()

> **new UpstashClient**(`options`): [`UpstashClient`](index.md#upstashclient)

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

`options`

</td>
<td>

`Omit`\<`RedisConfigNodejs`, `"automaticDeserialization"`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`UpstashClient`](index.md#upstashclient)

###### Overrides

`Redis.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="addtelemetry"></a> `addTelemetry`

</td>
<td>

`protected`

</td>
<td>

(`telemetry`: `Telemetry`) => `void`

</td>
<td>

Technically this is not private, we can hide it from intellisense by doing this

</td>
<td>

`Redis.addTelemetry`

</td>
</tr>
<tr>
<td>

<a id="append"></a> `append`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `value`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/append

</td>
<td>

`Redis.append`

</td>
</tr>
<tr>
<td>

<a id="autopipeline"></a> `autoPipeline`

</td>
<td>

`protected`

</td>
<td>

() => `Redis`

</td>
<td>

&hyphen;

</td>
<td>

`Redis.autoPipeline`

</td>
</tr>
<tr>
<td>

<a id="bitcount"></a> `bitcount`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `start`: `number`, `end`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/bitcount

</td>
<td>

`Redis.bitcount`

</td>
</tr>
<tr>
<td>

<a id="bitfield"></a> `bitfield`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `BitFieldCommand`\<`Promise`\<`number`[]\>\>

</td>
<td>

Returns an instance that can be used to execute `BITFIELD` commands on one key.

**Example**

```typescript
redis.set("mykey", 0);
const result = await redis
  .bitfield("mykey")
  .set("u4", 0, 16)
  .incr("u4", "#1", 1)
  .exec();
console.log(result); // [0, 1]
```

**See**

https://redis.io/commands/bitfield

</td>
<td>

`Redis.bitfield`

</td>
</tr>
<tr>
<td>

<a id="bitop"></a> `bitop`

</td>
<td>

`public`

</td>
<td>

(`op`: `"and"` \| `"or"` \| `"xor"`, `destinationKey`: `string`, `sourceKey`: `string`, ...`sourceKeys`: `string`[]) => `Promise`\<`number`\>(`op`: `"not"`, `destinationKey`: `string`, `sourceKey`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/bitop

</td>
<td>

`Redis.bitop`

</td>
</tr>
<tr>
<td>

<a id="bitpos"></a> `bitpos`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `bit`: `0` \| `1`, `start`?: `number`, `end`?: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/bitpos

</td>
<td>

`Redis.bitpos`

</td>
</tr>
<tr>
<td>

<a id="client"></a> `client`

</td>
<td>

`protected`

</td>
<td>

`Requester`

</td>
<td>

&hyphen;

</td>
<td>

`Redis.client`

</td>
</tr>
<tr>
<td>

<a id="copy"></a> `copy`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `destinationKey`: `string`, `opts`?: `object`) => `Promise`\<`"COPIED"` \| `"NOT_COPIED"`\>

</td>
<td>

**See**

https://redis.io/commands/copy

</td>
<td>

`Redis.copy`

</td>
</tr>
<tr>
<td>

<a id="dbsize"></a> `dbsize`

</td>
<td>

`public`

</td>
<td>

() => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/dbsize

</td>
<td>

`Redis.dbsize`

</td>
</tr>
<tr>
<td>

<a id="decr"></a> `decr`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/decr

</td>
<td>

`Redis.decr`

</td>
</tr>
<tr>
<td>

<a id="decrby"></a> `decrby`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `decrement`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/decrby

</td>
<td>

`Redis.decrby`

</td>
</tr>
<tr>
<td>

<a id="del"></a> `del`

</td>
<td>

`public`

</td>
<td>

(...`args`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/del

</td>
<td>

`Redis.del`

</td>
</tr>
<tr>
<td>

<a id="echo"></a> `echo`

</td>
<td>

`public`

</td>
<td>

(`message`: `string`) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/echo

</td>
<td>

`Redis.echo`

</td>
</tr>
<tr>
<td>

<a id="enableautopipelining"></a> `enableAutoPipelining`

</td>
<td>

`protected`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

`Redis.enableAutoPipelining`

</td>
</tr>
<tr>
<td>

<a id="enabletelemetry"></a> `enableTelemetry`

</td>
<td>

`protected`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

`Redis.enableTelemetry`

</td>
</tr>
<tr>
<td>

<a id="eval"></a> `eval`

</td>
<td>

`public`

</td>
<td>

\<`TArgs`, `TData`\>(`script`: `string`, `keys`: `string`[], `args`: `TArgs`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/eval

</td>
<td>

`Redis.eval`

</td>
</tr>
<tr>
<td>

<a id="evalsha"></a> `evalsha`

</td>
<td>

`public`

</td>
<td>

\<`TArgs`, `TData`\>(`sha1`: `string`, `keys`: `string`[], `args`: `TArgs`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/evalsha

</td>
<td>

`Redis.evalsha`

</td>
</tr>
<tr>
<td>

<a id="exec"></a> `exec`

</td>
<td>

`public`

</td>
<td>

\<`TResult`\>(`args`: \[`string`, ...args: (string \| number \| boolean)\[\]\]) => `Promise`\<`TResult`\>

</td>
<td>

Generic method to execute any Redis command.

</td>
<td>

`Redis.exec`

</td>
</tr>
<tr>
<td>

<a id="exists"></a> `exists`

</td>
<td>

`public`

</td>
<td>

(...`args`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/exists

</td>
<td>

`Redis.exists`

</td>
</tr>
<tr>
<td>

<a id="expire"></a> `expire`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `seconds`: `number`, `option`?: `"NX"` \| `"nx"` \| `"XX"` \| `"xx"` \| `"GT"` \| `"gt"` \| `"LT"` \| `"lt"`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/expire

</td>
<td>

`Redis.expire`

</td>
</tr>
<tr>
<td>

<a id="expireat"></a> `expireat`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `unix`: `number`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/expireat

</td>
<td>

`Redis.expireat`

</td>
</tr>
<tr>
<td>

<a id="flushall"></a> `flushall`

</td>
<td>

`public`

</td>
<td>

(`args`?: \[\{ `async`: `boolean`; \}\]) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/flushall

</td>
<td>

`Redis.flushall`

</td>
</tr>
<tr>
<td>

<a id="flushdb"></a> `flushdb`

</td>
<td>

`public`

</td>
<td>

(`opts`?: `object`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/flushdb

</td>
<td>

`Redis.flushdb`

</td>
</tr>
<tr>
<td>

<a id="geoadd"></a> `geoadd`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`args_0`: `string`, `args_1`: `GeoMember`\<`TData`\> \| `GeoAddCommandOptions`, ...`args_2`: `GeoMember`\<`TData`\>[]) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/geoadd

</td>
<td>

`Redis.geoadd`

</td>
</tr>
<tr>
<td>

<a id="geodist"></a> `geodist`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member1`: `TData`, `member2`: `TData`, `unit`?: `"M"` \| `"KM"` \| `"FT"` \| `"MI"`) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/geodist

</td>
<td>

`Redis.geodist`

</td>
</tr>
<tr>
<td>

<a id="geohash"></a> `geohash`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`args_0`: `string`, ...`args_1`: `TData`[]) => `Promise`\<(`null` \| `string`)[]\>

</td>
<td>

**See**

https://redis.io/commands/geohash

</td>
<td>

`Redis.geohash`

</td>
</tr>
<tr>
<td>

<a id="geopos"></a> `geopos`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`args_0`: `string`, ...`args_1`: `TData`[]) => `Promise`\<`object`[]\>

</td>
<td>

**See**

https://redis.io/commands/geopos

</td>
<td>

`Redis.geopos`

</td>
</tr>
<tr>
<td>

<a id="geosearch"></a> `geosearch`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `centerPoint`: \{ `coordinate`: \{ `lat`: `number`; `lon`: `number`; \}; `type`: `"FROMLONLAT"` \| `"fromlonlat"`; \} \| \{ `member`: `TData`; `type`: `"FROMMEMBER"` \| `"frommember"`; \}, `shape`: \{ `radius`: `number`; `radiusType`: `"M"` \| `"KM"` \| `"FT"` \| `"MI"`; `type`: `"BYRADIUS"` \| `"byradius"`; \} \| \{ `rect`: \{ `height`: `number`; `width`: `number`; \}; `rectType`: `"M"` \| `"KM"` \| `"FT"` \| `"MI"`; `type`: `"BYBOX"` \| `"bybox"`; \}, `order`: `"ASC"` \| `"DESC"` \| `"asc"` \| `"desc"`, `opts`?: `object`) => `Promise`\<`object` & `object`[]\>

</td>
<td>

**See**

https://redis.io/commands/geosearch

</td>
<td>

`Redis.geosearch`

</td>
</tr>
<tr>
<td>

<a id="geosearchstore"></a> `geosearchstore`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`destination`: `string`, `key`: `string`, `centerPoint`: \{ `coordinate`: \{ `lat`: `number`; `lon`: `number`; \}; `type`: `"FROMLONLAT"` \| `"fromlonlat"`; \} \| \{ `member`: `TData`; `type`: `"FROMMEMBER"` \| `"frommember"`; \}, `shape`: \{ `radius`: `number`; `radiusType`: `"M"` \| `"KM"` \| `"FT"` \| `"MI"`; `type`: `"BYRADIUS"` \| `"byradius"`; \} \| \{ `rect`: \{ `height`: `number`; `width`: `number`; \}; `rectType`: `"M"` \| `"KM"` \| `"FT"` \| `"MI"`; `type`: `"BYBOX"` \| `"bybox"`; \}, `order`: `"ASC"` \| `"DESC"` \| `"asc"` \| `"desc"`, `opts`?: `object`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/geosearchstore

</td>
<td>

`Redis.geosearchstore`

</td>
</tr>
<tr>
<td>

<a id="get"></a> `get`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/get

</td>
<td>

`Redis.get`

</td>
</tr>
<tr>
<td>

<a id="getbit"></a> `getbit`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `offset`: `number`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/getbit

</td>
<td>

`Redis.getbit`

</td>
</tr>
<tr>
<td>

<a id="getdel"></a> `getdel`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/getdel

</td>
<td>

`Redis.getdel`

</td>
</tr>
<tr>
<td>

<a id="getex"></a> `getex`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `opts`?: \{ `ex`: `number`; `exat`: `undefined`; `persist`: `undefined`; `px`: `undefined`; `pxat`: `undefined`; \} \| \{ `px`: `number`; `ex`: `undefined`; `exat`: `undefined`; `persist`: `undefined`; `pxat`: `undefined`; \} \| \{ `exat`: `number`; `ex`: `undefined`; `persist`: `undefined`; `px`: `undefined`; `pxat`: `undefined`; \} \| \{ `pxat`: `number`; `ex`: `undefined`; `exat`: `undefined`; `persist`: `undefined`; `px`: `undefined`; \} \| \{ `persist`: `true`; `ex`: `undefined`; `exat`: `undefined`; `px`: `undefined`; `pxat`: `undefined`; \} \| \{ `ex`: `undefined`; `exat`: `undefined`; `persist`: `undefined`; `px`: `undefined`; `pxat`: `undefined`; \}) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/getex

</td>
<td>

`Redis.getex`

</td>
</tr>
<tr>
<td>

<a id="getrange"></a> `getrange`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `start`: `number`, `end`: `number`) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/getrange

</td>
<td>

`Redis.getrange`

</td>
</tr>
<tr>
<td>

<a id="getset"></a> `getset`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `value`: `TData`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/getset

</td>
<td>

`Redis.getset`

</td>
</tr>
<tr>
<td>

<a id="hdel"></a> `hdel`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, ...`fields`: `string`[]) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/hdel

</td>
<td>

`Redis.hdel`

</td>
</tr>
<tr>
<td>

<a id="hexists"></a> `hexists`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `field`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hexists

</td>
<td>

`Redis.hexists`

</td>
</tr>
<tr>
<td>

<a id="hget"></a> `hget`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `field`: `string`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/hget

</td>
<td>

`Redis.hget`

</td>
</tr>
<tr>
<td>

<a id="hgetall"></a> `hgetall`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/hgetall

</td>
<td>

`Redis.hgetall`

</td>
</tr>
<tr>
<td>

<a id="hincrby"></a> `hincrby`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `field`: `string`, `increment`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hincrby

</td>
<td>

`Redis.hincrby`

</td>
</tr>
<tr>
<td>

<a id="hincrbyfloat"></a> `hincrbyfloat`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `field`: `string`, `increment`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hincrbyfloat

</td>
<td>

`Redis.hincrbyfloat`

</td>
</tr>
<tr>
<td>

<a id="hkeys"></a> `hkeys`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`string`[]\>

</td>
<td>

**See**

https://redis.io/commands/hkeys

</td>
<td>

`Redis.hkeys`

</td>
</tr>
<tr>
<td>

<a id="hlen"></a> `hlen`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hlen

</td>
<td>

`Redis.hlen`

</td>
</tr>
<tr>
<td>

<a id="hmget"></a> `hmget`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`fields`: `string`[]) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/hmget

</td>
<td>

`Redis.hmget`

</td>
</tr>
<tr>
<td>

<a id="hmset"></a> `hmset`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `kv`: `Record`\<`string`, `TData`\>) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/hmset

</td>
<td>

`Redis.hmset`

</td>
</tr>
<tr>
<td>

<a id="hrandfield"></a> `hrandfield`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`null` \| `string`\>(`key`: `string`, `count`: `number`) => `Promise`\<`string`[]\>\<`TData`\>(`key`: `string`, `count`: `number`, `withValues`: `boolean`) => `Promise`\<`Partial`\<`TData`\>\>

</td>
<td>

**See**

https://redis.io/commands/hrandfield

</td>
<td>

`Redis.hrandfield`

</td>
</tr>
<tr>
<td>

<a id="hscan"></a> `hscan`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `cursor`: `string` \| `number`, `cmdOpts`?: `ScanCommandOptions`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

</td>
<td>

**See**

https://redis.io/commands/hscan

</td>
<td>

`Redis.hscan`

</td>
</tr>
<tr>
<td>

<a id="hset"></a> `hset`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `kv`: `Record`\<`string`, `TData`\>) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hset

</td>
<td>

`Redis.hset`

</td>
</tr>
<tr>
<td>

<a id="hsetnx"></a> `hsetnx`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `field`: `string`, `value`: `TData`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/hsetnx

</td>
<td>

`Redis.hsetnx`

</td>
</tr>
<tr>
<td>

<a id="hstrlen"></a> `hstrlen`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `field`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/hstrlen

</td>
<td>

`Redis.hstrlen`

</td>
</tr>
<tr>
<td>

<a id="hvals"></a> `hvals`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`any`\>

</td>
<td>

**See**

https://redis.io/commands/hvals

</td>
<td>

`Redis.hvals`

</td>
</tr>
<tr>
<td>

<a id="incr"></a> `incr`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/incr

</td>
<td>

`Redis.incr`

</td>
</tr>
<tr>
<td>

<a id="incrby"></a> `incrby`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `value`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/incrby

</td>
<td>

`Redis.incrby`

</td>
</tr>
<tr>
<td>

<a id="incrbyfloat"></a> `incrbyfloat`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `value`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/incrbyfloat

</td>
<td>

`Redis.incrbyfloat`

</td>
</tr>
<tr>
<td>

<a id="keys"></a> `keys`

</td>
<td>

`public`

</td>
<td>

(`pattern`: `string`) => `Promise`\<`string`[]\>

</td>
<td>

**See**

https://redis.io/commands/keys

</td>
<td>

`Redis.keys`

</td>
</tr>
<tr>
<td>

<a id="lindex"></a> `lindex`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `index`: `number`) => `Promise`\<`any`\>

</td>
<td>

**See**

https://redis.io/commands/lindex

</td>
<td>

`Redis.lindex`

</td>
</tr>
<tr>
<td>

<a id="linsert"></a> `linsert`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `direction`: `"before"` \| `"after"`, `pivot`: `TData`, `value`: `TData`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/linsert

</td>
<td>

`Redis.linsert`

</td>
</tr>
<tr>
<td>

<a id="llen"></a> `llen`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/llen

</td>
<td>

`Redis.llen`

</td>
</tr>
<tr>
<td>

<a id="lmove"></a> `lmove`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`source`: `string`, `destination`: `string`, `whereFrom`: `"left"` \| `"right"`, `whereTo`: `"left"` \| `"right"`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/lmove

</td>
<td>

`Redis.lmove`

</td>
</tr>
<tr>
<td>

<a id="lmpop"></a> `lmpop`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`numkeys`: `number`, `keys`: `string`[], `args_2`: `"LEFT"` \| `"RIGHT"`, `count`?: `number`) => `Promise`\<`null` \| \[`string`, `TData`[]\]\>

</td>
<td>

**See**

https://redis.io/commands/lmpop

</td>
<td>

`Redis.lmpop`

</td>
</tr>
<tr>
<td>

<a id="lpop"></a> `lpop`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/lpop

</td>
<td>

`Redis.lpop`

</td>
</tr>
<tr>
<td>

<a id="lpos"></a> `lpos`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `element`: `unknown`, `opts`?: `object`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/lpos

</td>
<td>

`Redis.lpos`

</td>
</tr>
<tr>
<td>

<a id="lpush"></a> `lpush`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`elements`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/lpush

</td>
<td>

`Redis.lpush`

</td>
</tr>
<tr>
<td>

<a id="lpushx"></a> `lpushx`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`elements`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/lpushx

</td>
<td>

`Redis.lpushx`

</td>
</tr>
<tr>
<td>

<a id="lrange"></a> `lrange`

</td>
<td>

`public`

</td>
<td>

\<`TResult`\>(`key`: `string`, `start`: `number`, `end`: `number`) => `Promise`\<`TResult`[]\>

</td>
<td>

**See**

https://redis.io/commands/lrange

</td>
<td>

`Redis.lrange`

</td>
</tr>
<tr>
<td>

<a id="lrem"></a> `lrem`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`: `number`, `value`: `TData`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/lrem

</td>
<td>

`Redis.lrem`

</td>
</tr>
<tr>
<td>

<a id="lset"></a> `lset`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `index`: `number`, `value`: `TData`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/lset

</td>
<td>

`Redis.lset`

</td>
</tr>
<tr>
<td>

<a id="ltrim"></a> `ltrim`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `start`: `number`, `end`: `number`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/ltrim

</td>
<td>

`Redis.ltrim`

</td>
</tr>
<tr>
<td>

<a id="mget"></a> `mget`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(...`args`: `string`[] \| \[`string`[]\]) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/mget

</td>
<td>

`Redis.mget`

</td>
</tr>
<tr>
<td>

<a id="mset"></a> `mset`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`kv`: `Record`\<`string`, `TData`\>) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/mset

</td>
<td>

`Redis.mset`

</td>
</tr>
<tr>
<td>

<a id="msetnx"></a> `msetnx`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`kv`: `Record`\<`string`, `TData`\>) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/msetnx

</td>
<td>

`Redis.msetnx`

</td>
</tr>
<tr>
<td>

<a id="multi"></a> `multi`

</td>
<td>

`public`

</td>
<td>

() => `Pipeline`\<\[\]\>

</td>
<td>

Create a new transaction to allow executing multiple steps atomically.

All the commands in a transaction are serialized and executed sequentially. A request sent by
another client will never be served in the middle of the execution of a Redis Transaction. This
guarantees that the commands are executed as a single isolated operation.

**See**

Pipeline

</td>
<td>

`Redis.multi`

</td>
</tr>
<tr>
<td>

<a id="persist"></a> `persist`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/persist

</td>
<td>

`Redis.persist`

</td>
</tr>
<tr>
<td>

<a id="pexpire"></a> `pexpire`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `milliseconds`: `number`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/pexpire

</td>
<td>

`Redis.pexpire`

</td>
</tr>
<tr>
<td>

<a id="pexpireat"></a> `pexpireat`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `unix`: `number`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/pexpireat

</td>
<td>

`Redis.pexpireat`

</td>
</tr>
<tr>
<td>

<a id="pfadd"></a> `pfadd`

</td>
<td>

`public`

</td>
<td>

(`args_0`: `string`, ...`args_1`: `unknown`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/pfadd

</td>
<td>

`Redis.pfadd`

</td>
</tr>
<tr>
<td>

<a id="pfcount"></a> `pfcount`

</td>
<td>

`public`

</td>
<td>

(`args_0`: `string`, ...`args_1`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/pfcount

</td>
<td>

`Redis.pfcount`

</td>
</tr>
<tr>
<td>

<a id="pfmerge"></a> `pfmerge`

</td>
<td>

`public`

</td>
<td>

(`destination_key`: `string`, ...`args_1`: `string`[]) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/pfmerge

</td>
<td>

`Redis.pfmerge`

</td>
</tr>
<tr>
<td>

<a id="ping"></a> `ping`

</td>
<td>

`public`

</td>
<td>

(`args`?: \[`string`\]) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/ping

</td>
<td>

`Redis.ping`

</td>
</tr>
<tr>
<td>

<a id="pipeline"></a> `pipeline`

</td>
<td>

`public`

</td>
<td>

() => `Pipeline`\<\[\]\>

</td>
<td>

Create a new pipeline that allows you to send requests in bulk.

**See**

Pipeline

</td>
<td>

`Redis.pipeline`

</td>
</tr>
<tr>
<td>

<a id="psetex"></a> `psetex`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `ttl`: `number`, `value`: `TData`) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/psetex

</td>
<td>

`Redis.psetex`

</td>
</tr>
<tr>
<td>

<a id="psubscribe"></a> `psubscribe`

</td>
<td>

`public`

</td>
<td>

\<`TMessage`\>(`patterns`: `string` \| `string`[]) => `Subscriber`\<`TMessage`\>

</td>
<td>

**See**

https://redis.io/commands/psubscribe

</td>
<td>

`Redis.psubscribe`

</td>
</tr>
<tr>
<td>

<a id="pttl"></a> `pttl`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/pttl

</td>
<td>

`Redis.pttl`

</td>
</tr>
<tr>
<td>

<a id="publish"></a> `publish`

</td>
<td>

`public`

</td>
<td>

(`channel`: `string`, `message`: `unknown`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/publish

</td>
<td>

`Redis.publish`

</td>
</tr>
<tr>
<td>

<a id="randomkey"></a> `randomkey`

</td>
<td>

`public`

</td>
<td>

() => `Promise`\<`null` \| `string`\>

</td>
<td>

**See**

https://redis.io/commands/randomkey

</td>
<td>

`Redis.randomkey`

</td>
</tr>
<tr>
<td>

<a id="rename"></a> `rename`

</td>
<td>

`public`

</td>
<td>

(`source`: `string`, `destination`: `string`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/rename

</td>
<td>

`Redis.rename`

</td>
</tr>
<tr>
<td>

<a id="renamenx"></a> `renamenx`

</td>
<td>

`public`

</td>
<td>

(`source`: `string`, `destination`: `string`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/renamenx

</td>
<td>

`Redis.renamenx`

</td>
</tr>
<tr>
<td>

<a id="rpop"></a> `rpop`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/rpop

</td>
<td>

`Redis.rpop`

</td>
</tr>
<tr>
<td>

<a id="rpush"></a> `rpush`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`elements`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/rpush

</td>
<td>

`Redis.rpush`

</td>
</tr>
<tr>
<td>

<a id="rpushx"></a> `rpushx`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`elements`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/rpushx

</td>
<td>

`Redis.rpushx`

</td>
</tr>
<tr>
<td>

<a id="sadd"></a> `sadd`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member`: `TData`, ...`members`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/sadd

</td>
<td>

`Redis.sadd`

</td>
</tr>
<tr>
<td>

<a id="scan"></a> `scan`

</td>
<td>

`public`

</td>
<td>

(`cursor`: `string` \| `number`, `opts`?: `ScanCommandOptions`) => `Promise`\<\[`string`, `string`[]\]\>

</td>
<td>

**See**

https://redis.io/commands/scan

</td>
<td>

`Redis.scan`

</td>
</tr>
<tr>
<td>

<a id="scard"></a> `scard`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/scard

</td>
<td>

`Redis.scard`

</td>
</tr>
<tr>
<td>

<a id="scriptexists"></a> `scriptExists`

</td>
<td>

`public`

</td>
<td>

(...`args`: `string`[]) => `Promise`\<`number`[]\>

</td>
<td>

**See**

https://redis.io/commands/script-exists

</td>
<td>

`Redis.scriptExists`

</td>
</tr>
<tr>
<td>

<a id="scriptflush"></a> `scriptFlush`

</td>
<td>

`public`

</td>
<td>

(`opts`?: `ScriptFlushCommandOptions`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/script-flush

</td>
<td>

`Redis.scriptFlush`

</td>
</tr>
<tr>
<td>

<a id="scriptload"></a> `scriptLoad`

</td>
<td>

`public`

</td>
<td>

(`script`: `string`) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/script-load

</td>
<td>

`Redis.scriptLoad`

</td>
</tr>
<tr>
<td>

<a id="sdiff"></a> `sdiff`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, ...`keys`: `string`[]) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/sdiff

</td>
<td>

`Redis.sdiff`

</td>
</tr>
<tr>
<td>

<a id="sdiffstore"></a> `sdiffstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, ...`keys`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/sdiffstore

</td>
<td>

`Redis.sdiffstore`

</td>
</tr>
<tr>
<td>

<a id="set"></a> `set`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `value`: `TData`, `opts`?: `SetCommandOptions`) => `Promise`\<`null` \| `"OK"` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/set

</td>
<td>

`Redis.set`

</td>
</tr>
<tr>
<td>

<a id="setbit"></a> `setbit`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `offset`: `number`, `value`: `0` \| `1`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/setbit

</td>
<td>

`Redis.setbit`

</td>
</tr>
<tr>
<td>

<a id="setex"></a> `setex`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `ttl`: `number`, `value`: `TData`) => `Promise`\<`"OK"`\>

</td>
<td>

**See**

https://redis.io/commands/setex

</td>
<td>

`Redis.setex`

</td>
</tr>
<tr>
<td>

<a id="setnx"></a> `setnx`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `value`: `TData`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/setnx

</td>
<td>

`Redis.setnx`

</td>
</tr>
<tr>
<td>

<a id="setrange"></a> `setrange`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `offset`: `number`, `value`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/setrange

</td>
<td>

`Redis.setrange`

</td>
</tr>
<tr>
<td>

<a id="sinter"></a> `sinter`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, ...`keys`: `string`[]) => `Promise`\<`string`[]\>

</td>
<td>

**See**

https://redis.io/commands/sinter

</td>
<td>

`Redis.sinter`

</td>
</tr>
<tr>
<td>

<a id="sinterstore"></a> `sinterstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, `key`: `string`, ...`keys`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/sinterstore

</td>
<td>

`Redis.sinterstore`

</td>
</tr>
<tr>
<td>

<a id="sismember"></a> `sismember`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member`: `TData`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/sismember

</td>
<td>

`Redis.sismember`

</td>
</tr>
<tr>
<td>

<a id="smembers"></a> `smembers`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/smembers

</td>
<td>

`Redis.smembers`

</td>
</tr>
<tr>
<td>

<a id="smismember"></a> `smismember`

</td>
<td>

`public`

</td>
<td>

\<`TMembers`\>(`key`: `string`, `members`: `TMembers`) => `Promise`\<(`0` \| `1`)[]\>

</td>
<td>

**See**

https://redis.io/commands/smismember

</td>
<td>

`Redis.smismember`

</td>
</tr>
<tr>
<td>

<a id="smove"></a> `smove`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`source`: `string`, `destination`: `string`, `member`: `TData`) => `Promise`\<`0` \| `1`\>

</td>
<td>

**See**

https://redis.io/commands/smove

</td>
<td>

`Redis.smove`

</td>
</tr>
<tr>
<td>

<a id="spop"></a> `spop`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/spop

</td>
<td>

`Redis.spop`

</td>
</tr>
<tr>
<td>

<a id="srandmember"></a> `srandmember`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`null` \| `TData`\>

</td>
<td>

**See**

https://redis.io/commands/srandmember

</td>
<td>

`Redis.srandmember`

</td>
</tr>
<tr>
<td>

<a id="srem"></a> `srem`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`members`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/srem

</td>
<td>

`Redis.srem`

</td>
</tr>
<tr>
<td>

<a id="sscan"></a> `sscan`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `cursor`: `string` \| `number`, `opts`?: `ScanCommandOptions`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

</td>
<td>

**See**

https://redis.io/commands/sscan

</td>
<td>

`Redis.sscan`

</td>
</tr>
<tr>
<td>

<a id="strlen"></a> `strlen`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/strlen

</td>
<td>

`Redis.strlen`

</td>
</tr>
<tr>
<td>

<a id="subscribe"></a> `subscribe`

</td>
<td>

`public`

</td>
<td>

\<`TMessage`\>(`channels`: `string` \| `string`[]) => `Subscriber`\<`TMessage`\>

</td>
<td>

**See**

https://redis.io/commands/subscribe

</td>
<td>

`Redis.subscribe`

</td>
</tr>
<tr>
<td>

<a id="sunion"></a> `sunion`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, ...`keys`: `string`[]) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/sunion

</td>
<td>

`Redis.sunion`

</td>
</tr>
<tr>
<td>

<a id="sunionstore"></a> `sunionstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, `key`: `string`, ...`keys`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/sunionstore

</td>
<td>

`Redis.sunionstore`

</td>
</tr>
<tr>
<td>

<a id="time"></a> `time`

</td>
<td>

`public`

</td>
<td>

() => `Promise`\<\[`number`, `number`\]\>

</td>
<td>

**See**

https://redis.io/commands/time

</td>
<td>

`Redis.time`

</td>
</tr>
<tr>
<td>

<a id="touch"></a> `touch`

</td>
<td>

`public`

</td>
<td>

(...`args`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/touch

</td>
<td>

`Redis.touch`

</td>
</tr>
<tr>
<td>

<a id="ttl"></a> `ttl`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/ttl

</td>
<td>

`Redis.ttl`

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`Type`\>

</td>
<td>

**See**

https://redis.io/commands/type

</td>
<td>

`Redis.type`

</td>
</tr>
<tr>
<td>

<a id="unlink"></a> `unlink`

</td>
<td>

`public`

</td>
<td>

(...`args`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/unlink

</td>
<td>

`Redis.unlink`

</td>
</tr>
<tr>
<td>

<a id="use"></a> `use`

</td>
<td>

`public`

</td>
<td>

\<`TResult`\>(`middleware`: (`r`, `next`) => `Promise`\<`UpstashResponse`\<`TResult`\>\>) => `void`

</td>
<td>

Wrap a new middleware around the HTTP client.

</td>
<td>

`Redis.use`

</td>
</tr>
<tr>
<td>

<a id="xack"></a> `xack`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `group`: `string`, `id`: `string` \| `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/xack

</td>
<td>

`Redis.xack`

</td>
</tr>
<tr>
<td>

<a id="xadd"></a> `xadd`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `id`: `string`, `entries`: `Record`\<`string`, `unknown`\>, `opts`?: `object`) => `Promise`\<`string`\>

</td>
<td>

**See**

https://redis.io/commands/xadd

</td>
<td>

`Redis.xadd`

</td>
</tr>
<tr>
<td>

<a id="xautoclaim"></a> `xautoclaim`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `group`: `string`, `consumer`: `string`, `minIdleTime`: `number`, `start`: `string`, `options`?: `object`) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xautoclaim

</td>
<td>

`Redis.xautoclaim`

</td>
</tr>
<tr>
<td>

<a id="xclaim"></a> `xclaim`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `group`: `string`, `consumer`: `string`, `minIdleTime`: `number`, `id`: `string` \| `string`[], `options`?: `object`) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xclaim

</td>
<td>

`Redis.xclaim`

</td>
</tr>
<tr>
<td>

<a id="xdel"></a> `xdel`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `ids`: `string` \| `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/xdel

</td>
<td>

`Redis.xdel`

</td>
</tr>
<tr>
<td>

<a id="xgroup"></a> `xgroup`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `opts`: \{ `group`: `string`; `id`: `string`; `type`: `"CREATE"`; `options`: \{ `ENTRIESREAD`: `number`; `MKSTREAM`: `boolean`; \}; \} \| \{ `consumer`: `string`; `group`: `string`; `type`: `"CREATECONSUMER"`; \} \| \{ `consumer`: `string`; `group`: `string`; `type`: `"DELCONSUMER"`; \} \| \{ `group`: `string`; `type`: `"DESTROY"`; \} \| \{ `group`: `string`; `id`: `string`; `type`: `"SETID"`; `options`: \{ `ENTRIESREAD`: `number`; \}; \}) => `Promise`\<`never`\>

</td>
<td>

**See**

https://redis.io/commands/xgroup

</td>
<td>

`Redis.xgroup`

</td>
</tr>
<tr>
<td>

<a id="xinfo"></a> `xinfo`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `options`: \{ `group`: `string`; `type`: `"CONSUMERS"`; \} \| \{ `type`: `"GROUPS"`; \}) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xinfo

</td>
<td>

`Redis.xinfo`

</td>
</tr>
<tr>
<td>

<a id="xlen"></a> `xlen`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/xlen

</td>
<td>

`Redis.xlen`

</td>
</tr>
<tr>
<td>

<a id="xpending"></a> `xpending`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `group`: `string`, `start`: `string`, `end`: `string`, `count`: `number`, `options`?: `object`) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xpending

</td>
<td>

`Redis.xpending`

</td>
</tr>
<tr>
<td>

<a id="xrange"></a> `xrange`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `start`: `string`, `end`: `string`, `count`?: `number`) => `Promise`\<`Record`\<`string`, `Record`\<`string`, `unknown`\>\>\>

</td>
<td>

**See**

https://redis.io/commands/xrange

</td>
<td>

`Redis.xrange`

</td>
</tr>
<tr>
<td>

<a id="xread"></a> `xread`

</td>
<td>

`public`

</td>
<td>

(...`args`: \[`string`, `string`, `object`\] \| \[`string`[], `string`[], `object`\]) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xread

</td>
<td>

`Redis.xread`

</td>
</tr>
<tr>
<td>

<a id="xreadgroup"></a> `xreadgroup`

</td>
<td>

`public`

</td>
<td>

(...`args`: \[`string`, `string`, `string`, `string`, `Options`\] \| \[`string`, `string`, `string`[], `string`[], `Options`\]) => `Promise`\<`unknown`[]\>

</td>
<td>

**See**

https://redis.io/commands/xreadgroup

</td>
<td>

`Redis.xreadgroup`

</td>
</tr>
<tr>
<td>

<a id="xrevrange"></a> `xrevrange`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `end`: `string`, `start`: `string`, `count`?: `number`) => `Promise`\<`Record`\<`string`, `Record`\<`string`, `unknown`\>\>\>

</td>
<td>

**See**

https://redis.io/commands/xrevrange

</td>
<td>

`Redis.xrevrange`

</td>
</tr>
<tr>
<td>

<a id="xtrim"></a> `xtrim`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `options`: `object`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/xtrim

</td>
<td>

`Redis.xtrim`

</td>
</tr>
<tr>
<td>

<a id="zadd"></a> `zadd`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(...`args`: \[`string`, `ScoreMember`\<`TData`\>, `...scoreMemberPairs: ScoreMember<TData>[]`\] \| \[`string`, `ZAddCommandOptions`, `ScoreMember`\<`TData`\>, `...ScoreMember<TData>[]`\]) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/zadd

</td>
<td>

`Redis.zadd`

</td>
</tr>
<tr>
<td>

<a id="zcard"></a> `zcard`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zcard

</td>
<td>

`Redis.zcard`

</td>
</tr>
<tr>
<td>

<a id="zcount"></a> `zcount`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `min`: `string` \| `number`, `max`: `string` \| `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zcount

</td>
<td>

`Redis.zcount`

</td>
</tr>
<tr>
<td>

<a id="zdiffstore"></a> `zdiffstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, `numkeys`: `number`, ...`keys`: `string`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zdiffstore

</td>
<td>

`Redis.zdiffstore`

</td>
</tr>
<tr>
<td>

<a id="zincrby"></a> `zincrby`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `increment`: `number`, `member`: `TData`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zincrby

</td>
<td>

`Redis.zincrby`

</td>
</tr>
<tr>
<td>

<a id="zinterstore"></a> `zinterstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, `numKeys`: `number`, `keys`: `string`[], `opts`?: `ZInterStoreCommandOptions`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zinterstore

</td>
<td>

`Redis.zinterstore`

</td>
</tr>
<tr>
<td>

<a id="zlexcount"></a> `zlexcount`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `min`: `string`, `max`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zlexcount

</td>
<td>

`Redis.zlexcount`

</td>
</tr>
<tr>
<td>

<a id="zmscore"></a> `zmscore`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `members`: `unknown`[]) => `Promise`\<`null` \| `number`[]\>

</td>
<td>

**See**

https://redis.io/commands/zmscore

</td>
<td>

`Redis.zmscore`

</td>
</tr>
<tr>
<td>

<a id="zpopmax"></a> `zpopmax`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`TData`[]\>

</td>
<td>

**See**

https://redis.io/commands/zpopmax

</td>
<td>

`Redis.zpopmax`

</td>
</tr>
<tr>
<td>

<a id="zpopmin"></a> `zpopmin`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `count`?: `number`) => `Promise`\<`TData`[]\>

</td>
<td>

**See**

https://redis.io/commands/zpopmin

</td>
<td>

`Redis.zpopmin`

</td>
</tr>
<tr>
<td>

<a id="zrange"></a> `zrange`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(...`args`: \[`string`, `number`, `number`, `ZRangeCommandOptions`\] \| \[`string`, `"-"` \| `"+"` \| `` `(${string}` `` \| `` `[${string}` ``, `"-"` \| `"+"` \| `` `(${string}` `` \| `` `[${string}` ``, `object` & `ZRangeCommandOptions`\] \| \[`string`, `number` \| `` `(${number}` `` \| `"-inf"` \| `"+inf"`, `number` \| `` `(${number}` `` \| `"-inf"` \| `"+inf"`, `object` & `ZRangeCommandOptions`\]) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/zrange

</td>
<td>

`Redis.zrange`

</td>
</tr>
<tr>
<td>

<a id="zrank"></a> `zrank`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member`: `TData`) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/zrank

</td>
<td>

`Redis.zrank`

</td>
</tr>
<tr>
<td>

<a id="zrem"></a> `zrem`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, ...`members`: `TData`[]) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zrem

</td>
<td>

`Redis.zrem`

</td>
</tr>
<tr>
<td>

<a id="zremrangebylex"></a> `zremrangebylex`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `min`: `string`, `max`: `string`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zremrangebylex

</td>
<td>

`Redis.zremrangebylex`

</td>
</tr>
<tr>
<td>

<a id="zremrangebyrank"></a> `zremrangebyrank`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `start`: `number`, `stop`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zremrangebyrank

</td>
<td>

`Redis.zremrangebyrank`

</td>
</tr>
<tr>
<td>

<a id="zremrangebyscore"></a> `zremrangebyscore`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `min`: `number`, `max`: `number`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zremrangebyscore

</td>
<td>

`Redis.zremrangebyscore`

</td>
</tr>
<tr>
<td>

<a id="zrevrank"></a> `zrevrank`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member`: `TData`) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/zrevrank

</td>
<td>

`Redis.zrevrank`

</td>
</tr>
<tr>
<td>

<a id="zscan"></a> `zscan`

</td>
<td>

`public`

</td>
<td>

(`key`: `string`, `cursor`: `string` \| `number`, `opts`?: `ScanCommandOptions`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

</td>
<td>

**See**

https://redis.io/commands/zscan

</td>
<td>

`Redis.zscan`

</td>
</tr>
<tr>
<td>

<a id="zscore"></a> `zscore`

</td>
<td>

`public`

</td>
<td>

\<`TData`\>(`key`: `string`, `member`: `TData`) => `Promise`\<`null` \| `number`\>

</td>
<td>

**See**

https://redis.io/commands/zscore

</td>
<td>

`Redis.zscore`

</td>
</tr>
<tr>
<td>

<a id="zunion"></a> `zunion`

</td>
<td>

`public`

</td>
<td>

(`numKeys`: `number`, `keys`: `string`[], `opts`?: `ZUnionCommandOptions`) => `Promise`\<`any`\>

</td>
<td>

**See**

https://redis.io/commands/zunion

</td>
<td>

`Redis.zunion`

</td>
</tr>
<tr>
<td>

<a id="zunionstore"></a> `zunionstore`

</td>
<td>

`public`

</td>
<td>

(`destination`: `string`, `numKeys`: `number`, `keys`: `string`[], `opts`?: `ZUnionStoreCommandOptions`) => `Promise`\<`number`\>

</td>
<td>

**See**

https://redis.io/commands/zunionstore

</td>
<td>

`Redis.zunionstore`

</td>
</tr>
<tr>
<td>

<a id="opts"></a> `opts?`

</td>
<td>

`protected`

</td>
<td>

`CommandOptions`\<`any`, `any`\>

</td>
<td>

&hyphen;

</td>
<td>

`Redis.opts`

</td>
</tr>
</tbody>
</table>

#### Accessors

##### json

###### Get Signature

> **get** **json**(): `object`

###### Returns

`object`

| Name        | Type                                                                               | Description                                      |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| `arrappend` | (`key`, `path`, ...`values`) => `Promise`\<(`null` \| `number`)[]\>                | **See** https://redis.io/commands/json.arrappend |
| `arrindex`  | (`key`, `path`, `value`, `start`?, `stop`?) => `Promise`\<(`null` \| `number`)[]\> | **See** https://redis.io/commands/json.arrindex  |
| `arrinsert` | (`key`, `path`, `index`, ...`values`) => `Promise`\<(`null` \| `number`)[]\>       | **See** https://redis.io/commands/json.arrinsert |
| `arrlen`    | (`key`, `path`?) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.arrlen    |
| `arrpop`    | (`key`, `path`?, `index`?) => `Promise`\<`unknown`[]\>                             | **See** https://redis.io/commands/json.arrpop    |
| `arrtrim`   | (`key`, `path`?, `start`?, `stop`?) => `Promise`\<(`null` \| `number`)[]\>         | **See** https://redis.io/commands/json.arrtrim   |
| `clear`     | (`key`, `path`?) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.clear     |
| `del`       | (`key`, `path`?) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.del       |
| `forget`    | (`key`, `path`?) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.forget    |
| `get`       | \<`TData`\>(...`args`) => `Promise`\<`null` \| `TData`\>                           | **See** https://redis.io/commands/json.get       |
| `mget`      | \<`TData`\>(`keys`, `path`) => `Promise`\<`TData`\>                                | **See** https://redis.io/commands/json.mget      |
| `mset`      | (...`args`) => `Promise`\<`null` \| `"OK"`\>                                       | **See** https://redis.io/commands/json.mset      |
| `numincrby` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.numincrby |
| `nummultby` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.nummultby |
| `objkeys`   | (`key`, `path`?) => `Promise`\<(`null` \| `string`[])[]\>                          | **See** https://redis.io/commands/json.objkeys   |
| `objlen`    | (`key`, `path`?) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.objlen    |
| `resp`      | (`key`, `path`?) => `Promise`\<`any`\>                                             | **See** https://redis.io/commands/json.resp      |
| `set`       | (`key`, `path`, `value`, `opts`?) => `Promise`\<`null` \| `"OK"`\>                 | **See** https://redis.io/commands/json.set       |
| `strappend` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.strappend |
| `strlen`    | (`key`, `path`?) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.strlen    |
| `toggle`    | (`key`, `path`) => `Promise`\<`number`[]\>                                         | **See** https://redis.io/commands/json.toggle    |
| `type`      | (`key`, `path`?) => `Promise`\<`string`[]\>                                        | **See** https://redis.io/commands/json.type      |

###### Inherited from

`Redis.json`

##### readYourWritesSyncToken

###### Get Signature

> **get** **readYourWritesSyncToken**(): `undefined` \| `string`

###### Returns

`undefined` \| `string`

###### Set Signature

> **set** **readYourWritesSyncToken**(`session`): `void`

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

`session`

</td>
<td>

`undefined` \| `string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

`Redis.readYourWritesSyncToken`

#### Methods

##### createScript()

> **createScript**(`script`): `Script`

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

`script`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Script`

###### Inherited from

`Redis.createScript`

##### fromEnv()

> `static` **fromEnv**(`config`?): `Redis`

Create a new Upstash Redis instance from environment variables.

Use this to automatically load connection secrets from your environment
variables. For instance when using the Vercel integration.

This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
your environment using `process.env`.

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

`config`?

</td>
<td>

`Omit`\<`RedisConfigNodejs`, `"url"` \| `"token"`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Redis`

###### Inherited from

`Redis.fromEnv`

---

### UpstashStore

Upstash Redis-based cache store implementation.
Provides a serverless-optimized caching solution ideal for edge and serverless environments.

#### Remarks

This implementation uses Upstash Redis and is designed for serverless architectures.

#### Example

```typescript
import { UpstashStore } from "@baeta/extension-cache-upstash";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "UPSTASH_REDIS_URL",
  token: "UPSTASH_REDIS_TOKEN",
});
const store = new UpstashStore(redis);

// Use with cache extension
const cacheExt = cacheExtension(store, {
  ttl: 3600,
});
```

#### Extends

- `Store`

#### Constructors

##### new UpstashStore()

> **new UpstashStore**(`client`): [`UpstashStore`](index.md#upstashstore)

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

`client`

</td>
<td>

[`UpstashClient`](index.md#upstashclient)

</td>
</tr>
</tbody>
</table>

###### Returns

[`UpstashStore`](index.md#upstashstore)

###### Overrides

`Store.constructor`

#### Properties

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

<a id="client-1"></a> `client`

</td>
<td>

`protected`

</td>
<td>

[`UpstashClient`](index.md#upstashclient)

</td>
</tr>
</tbody>
</table>

#### Methods

##### createStoreAdapter()

> **createStoreAdapter**\<`T`\>(`serializer`, `options`, `type`, `hash`): `StoreAdapter`\<`T`\>

Creates a new store adapter for a specific type

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

`T`

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializer`

</td>
<td>

`Serializer`

</td>
<td>

Serializer instance

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`StoreOptions`\<`T`\>

</td>
<td>

Store configuration options

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
<td>

Type name for the cached items

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
<td>

Unique hash for the type

</td>
</tr>
</tbody>
</table>

###### Returns

`StoreAdapter`\<`T`\>

###### Overrides

`Store.createStoreAdapter`
