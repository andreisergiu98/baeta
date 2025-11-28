# UpstashClient

## Extends

- `Redis`

## Constructors

### Constructor

> **new UpstashClient**(`options`): `UpstashClient`

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

`Omit`\<`RedisConfigNodejs`, `"automaticDeserialization"`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`UpstashClient`

#### Overrides

`Redis.constructor`

## Properties

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

(`telemetry`) => `void`

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

(`key`, `value`) => `Promise`\<`number`\>

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

(`key`, `start`, `end`) => `Promise`\<`number`\>

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

(`key`) => `BitFieldCommand`\<`Promise`\<`number`[]\>\>

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

\{(`op`, `destinationKey`, `sourceKey`, ...`sourceKeys`): `Promise`\<`number`\>; (`op`, `destinationKey`, `sourceKey`): `Promise`\<`number`\>; \}

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

(`key`, `bit`, `start?`, `end?`) => `Promise`\<`number`\>

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

(`key`, `destinationKey`, `opts?`) => `Promise`\<`"COPIED"` \| `"NOT_COPIED"`\>

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

(`key`) => `Promise`\<`number`\>

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

(`key`, `decrement`) => `Promise`\<`number`\>

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

(...`args`) => `Promise`\<`number`\>

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

(`message`) => `Promise`\<`string`\>

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

\<`TArgs`, `TData`\>(`script`, `keys`, `args`) => `Promise`\<`TData`\>

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

<a id="evalro"></a> `evalRo`

</td>
<td>

`public`

</td>
<td>

\<`TArgs`, `TData`\>(`script`, `keys`, `args`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/eval_ro

</td>
<td>

`Redis.evalRo`

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

\<`TArgs`, `TData`\>(`sha1`, `keys`, `args`) => `Promise`\<`TData`\>

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

<a id="evalsharo"></a> `evalshaRo`

</td>
<td>

`public`

</td>
<td>

\<`TArgs`, `TData`\>(`sha1`, `keys`, `args`) => `Promise`\<`TData`\>

</td>
<td>

**See**

https://redis.io/commands/evalsha_ro

</td>
<td>

`Redis.evalshaRo`

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

\<`TResult`\>(`args`) => `Promise`\<`TResult`\>

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

(...`args`) => `Promise`\<`number`\>

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

(`key`, `seconds`, `option?`) => `Promise`\<`0` \| `1`\>

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

(`key`, `unix`, `option?`) => `Promise`\<`0` \| `1`\>

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

(`args?`) => `Promise`\<`"OK"`\>

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

(`opts?`) => `Promise`\<`"OK"`\>

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

\<`TData`\>(`args_0`, `args_1`, ...`args_2`) => `Promise`\<`null` \| `number`\>

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

\<`TData`\>(`key`, `member1`, `member2`, `unit?`) => `Promise`\<`null` \| `number`\>

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

\<`TData`\>(`args_0`, ...`args_1`) => `Promise`\<(`null` \| `string`)[]\>

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

\<`TData`\>(`args_0`, ...`args_1`) => `Promise`\<`object`[]\>

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

\<`TData`\>(`key`, `centerPoint`, `shape`, `order`, `opts?`) => `Promise`\<`object` & `object`[]\>

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

\<`TData`\>(`destination`, `key`, `centerPoint`, `shape`, `order`, `opts?`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`) => `Promise`\<`null` \| `TData`\>

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

(`key`, `offset`) => `Promise`\<`0` \| `1`\>

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

\<`TData`\>(`key`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, `opts?`) => `Promise`\<`null` \| `TData`\>

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

(`key`, `start`, `end`) => `Promise`\<`string`\>

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

\<`TData`\>(`key`, `value`) => `Promise`\<`null` \| `TData`\>

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

(`key`, ...`fields`) => `Promise`\<`0` \| `1`\>

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

(`key`, `field`) => `Promise`\<`number`\>

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

<a id="hexpire"></a> `hexpire`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`, `seconds`, `option?`) => `Promise`\<(`-2` \| `0` \| `1` \| `2`)[]\>

</td>
<td>

**See**

https://redis.io/commands/hexpire

</td>
<td>

`Redis.hexpire`

</td>
</tr>
<tr>
<td>

<a id="hexpireat"></a> `hexpireat`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`, `timestamp`, `option?`) => `Promise`\<(`-2` \| `0` \| `1` \| `2`)[]\>

</td>
<td>

**See**

https://redis.io/commands/hexpireat

</td>
<td>

`Redis.hexpireat`

</td>
</tr>
<tr>
<td>

<a id="hexpiretime"></a> `hexpiretime`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`) => `Promise`\<`number`[]\>

</td>
<td>

**See**

https://redis.io/commands/hexpiretime

</td>
<td>

`Redis.hexpiretime`

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

\<`TData`\>(`key`, `field`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`) => `Promise`\<`null` \| `TData`\>

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

(`key`, `field`, `increment`) => `Promise`\<`number`\>

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

(`key`, `field`, `increment`) => `Promise`\<`number`\>

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

(`key`) => `Promise`\<`string`[]\>

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

(`key`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, ...`fields`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, `kv`) => `Promise`\<`"OK"`\>

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

<a id="hpersist"></a> `hpersist`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`) => `Promise`\<(`-2` \| `-1` \| `1`)[]\>

</td>
<td>

**See**

https://redis.io/commands/hpersist

</td>
<td>

`Redis.hpersist`

</td>
</tr>
<tr>
<td>

<a id="hpexpire"></a> `hpexpire`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`, `milliseconds`, `option?`) => `Promise`\<(`-2` \| `0` \| `1` \| `2`)[]\>

</td>
<td>

**See**

https://redis.io/commands/hpexpire

</td>
<td>

`Redis.hpexpire`

</td>
</tr>
<tr>
<td>

<a id="hpexpireat"></a> `hpexpireat`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`, `timestamp`, `option?`) => `Promise`\<(`-2` \| `0` \| `1` \| `2`)[]\>

</td>
<td>

**See**

https://redis.io/commands/hpexpireat

</td>
<td>

`Redis.hpexpireat`

</td>
</tr>
<tr>
<td>

<a id="hpexpiretime"></a> `hpexpiretime`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`) => `Promise`\<`number`[]\>

</td>
<td>

**See**

https://redis.io/commands/hpexpiretime

</td>
<td>

`Redis.hpexpiretime`

</td>
</tr>
<tr>
<td>

<a id="hpttl"></a> `hpttl`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`) => `Promise`\<`number`[]\>

</td>
<td>

**See**

https://redis.io/commands/hpttl

</td>
<td>

`Redis.hpttl`

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

\{(`key`): `Promise`\<`null` \| `string`\>; (`key`, `count`): `Promise`\<`string`[]\>; \<`TData`\>(`key`, `count`, `withValues`): `Promise`\<`Partial`\<`TData`\>\>; \}

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

(`key`, `cursor`, `cmdOpts?`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

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

\<`TData`\>(`key`, `kv`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `field`, `value`) => `Promise`\<`0` \| `1`\>

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

(`key`, `field`) => `Promise`\<`number`\>

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

<a id="httl"></a> `httl`

</td>
<td>

`public`

</td>
<td>

(`key`, `fields`) => `Promise`\<`number`[]\>

</td>
<td>

**See**

https://redis.io/commands/httl

</td>
<td>

`Redis.httl`

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

(`key`) => `Promise`\<`any`\>

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

(`key`) => `Promise`\<`number`\>

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

(`key`, `value`) => `Promise`\<`number`\>

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

(`key`, `value`) => `Promise`\<`number`\>

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

(`pattern`) => `Promise`\<`string`[]\>

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

(`key`, `index`) => `Promise`\<`any`\>

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

\<`TData`\>(`key`, `direction`, `pivot`, `value`) => `Promise`\<`number`\>

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

(`key`) => `Promise`\<`number`\>

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

\<`TData`\>(`source`, `destination`, `whereFrom`, `whereTo`) => `Promise`\<`TData`\>

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

\<`TData`\>(`numkeys`, `keys`, `args_2`, `count?`) => `Promise`\<`null` \| \[`string`, `TData`[]\]\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, `element`, `opts?`) => `Promise`\<`TData`\>

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

\<`TData`\>(`key`, ...`elements`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, ...`elements`) => `Promise`\<`number`\>

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

\<`TResult`\>(`key`, `start`, `end`) => `Promise`\<`TResult`[]\>

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

\<`TData`\>(`key`, `count`, `value`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `index`, `value`) => `Promise`\<`"OK"`\>

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

(`key`, `start`, `end`) => `Promise`\<`"OK"`\>

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

\<`TData`\>(...`args`) => `Promise`\<`TData`\>

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

\<`TData`\>(`kv`) => `Promise`\<`"OK"`\>

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

\<`TData`\>(`kv`) => `Promise`\<`number`\>

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

(`key`) => `Promise`\<`0` \| `1`\>

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

(`key`, `milliseconds`, `option?`) => `Promise`\<`0` \| `1`\>

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

(`key`, `unix`, `option?`) => `Promise`\<`0` \| `1`\>

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

(`args_0`, ...`args_1`) => `Promise`\<`number`\>

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

(`args_0`, ...`args_1`) => `Promise`\<`number`\>

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

(`destination_key`, ...`args_1`) => `Promise`\<`"OK"`\>

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

(`args?`) => `Promise`\<`string`\>

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

\<`TData`\>(`key`, `ttl`, `value`) => `Promise`\<`string`\>

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

\<`TMessage`\>(`patterns`) => `Subscriber`\<`TMessage`\>

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

(`key`) => `Promise`\<`number`\>

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

(`channel`, `message`) => `Promise`\<`number`\>

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

(`source`, `destination`) => `Promise`\<`"OK"`\>

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

(`source`, `destination`) => `Promise`\<`0` \| `1`\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, ...`elements`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, ...`elements`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `member`, ...`members`) => `Promise`\<`number`\>

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

<a id="scard"></a> `scard`

</td>
<td>

`public`

</td>
<td>

(`key`) => `Promise`\<`number`\>

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

(...`args`) => `Promise`\<`number`[]\>

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

(`opts?`) => `Promise`\<`"OK"`\>

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

(`script`) => `Promise`\<`string`\>

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

(`key`, ...`keys`) => `Promise`\<`unknown`[]\>

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

(`destination`, ...`keys`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `value`, `opts?`) => `Promise`\<`null` \| `"OK"` \| `TData`\>

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

(`key`, `offset`, `value`) => `Promise`\<`0` \| `1`\>

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

\<`TData`\>(`key`, `ttl`, `value`) => `Promise`\<`"OK"`\>

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

\<`TData`\>(`key`, `value`) => `Promise`\<`number`\>

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

(`key`, `offset`, `value`) => `Promise`\<`number`\>

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

(`key`, ...`keys`) => `Promise`\<`string`[]\>

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

(`destination`, `key`, ...`keys`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `member`) => `Promise`\<`0` \| `1`\>

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

\<`TData`\>(`key`) => `Promise`\<`TData`\>

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

\<`TMembers`\>(`key`, `members`) => `Promise`\<(`0` \| `1`)[]\>

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

\<`TData`\>(`source`, `destination`, `member`) => `Promise`\<`0` \| `1`\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`null` \| `TData`\>

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

\<`TData`\>(`key`, ...`members`) => `Promise`\<`number`\>

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

(`key`, `cursor`, `opts?`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

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

(`key`) => `Promise`\<`number`\>

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

\<`TMessage`\>(`channels`) => `Subscriber`\<`TMessage`\>

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

(`key`, ...`keys`) => `Promise`\<`unknown`[]\>

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

(`destination`, `key`, ...`keys`) => `Promise`\<`number`\>

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

(...`args`) => `Promise`\<`number`\>

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

(`key`) => `Promise`\<`number`\>

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

(`key`) => `Promise`\<`Type`\>

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

(...`args`) => `Promise`\<`number`\>

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

\<`TResult`\>(`middleware`) => `void`

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

(`key`, `group`, `id`) => `Promise`\<`number`\>

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

(`key`, `id`, `entries`, `opts?`) => `Promise`\<`string`\>

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

(`key`, `group`, `consumer`, `minIdleTime`, `start`, `options?`) => `Promise`\<`unknown`[]\>

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

(`key`, `group`, `consumer`, `minIdleTime`, `id`, `options?`) => `Promise`\<`unknown`[]\>

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

(`key`, `ids`) => `Promise`\<`number`\>

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

(`key`, `opts`) => `Promise`\<`never`\>

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

(`key`, `options`) => `Promise`\<`unknown`[]\>

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

(`key`) => `Promise`\<`number`\>

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

(`key`, `group`, `start`, `end`, `count`, `options?`) => `Promise`\<`unknown`[]\>

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

(`key`, `start`, `end`, `count?`) => `Promise`\<`Record`\<`string`, `Record`\<`string`, `unknown`\>\>\>

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

(...`args`) => `Promise`\<`unknown`[]\>

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

(...`args`) => `Promise`\<`unknown`[]\>

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

(`key`, `end`, `start`, `count?`) => `Promise`\<`Record`\<`string`, `Record`\<`string`, `unknown`\>\>\>

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

(`key`, `options`) => `Promise`\<`number`\>

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

\<`TData`\>(...`args`) => `Promise`\<`null` \| `number`\>

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

(`key`) => `Promise`\<`number`\>

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

(`key`, `min`, `max`) => `Promise`\<`number`\>

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

(`destination`, `numkeys`, ...`keys`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `increment`, `member`) => `Promise`\<`number`\>

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

(`destination`, `numKeys`, `keys`, `opts?`) => `Promise`\<`number`\>

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

(`key`, `min`, `max`) => `Promise`\<`number`\>

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

(`key`, `members`) => `Promise`\<`null` \| `number`[]\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`TData`[]\>

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

\<`TData`\>(`key`, `count?`) => `Promise`\<`TData`[]\>

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

\<`TData`\>(...`args`) => `Promise`\<`TData`\>

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

\<`TData`\>(`key`, `member`) => `Promise`\<`null` \| `number`\>

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

\<`TData`\>(`key`, ...`members`) => `Promise`\<`number`\>

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

(`key`, `min`, `max`) => `Promise`\<`number`\>

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

(`key`, `start`, `stop`) => `Promise`\<`number`\>

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

(`key`, `min`, `max`) => `Promise`\<`number`\>

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

\<`TData`\>(`key`, `member`) => `Promise`\<`null` \| `number`\>

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

(`key`, `cursor`, `opts?`) => `Promise`\<\[`string`, (`string` \| `number`)[]\]\>

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

\<`TData`\>(`key`, `member`) => `Promise`\<`null` \| `number`\>

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

(`numKeys`, `keys`, `opts?`) => `Promise`\<`any`\>

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

(`destination`, `numKeys`, `keys`, `opts?`) => `Promise`\<`number`\>

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

## Accessors

### json

#### Get Signature

> **get** **json**(): `object`

##### Returns

| Name          | Type                                                                               | Description                                      |
| ------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| `arrappend()` | (`key`, `path`, ...`values`) => `Promise`\<(`null` \| `number`)[]\>                | **See** https://redis.io/commands/json.arrappend |
| `arrindex()`  | (`key`, `path`, `value`, `start?`, `stop?`) => `Promise`\<(`null` \| `number`)[]\> | **See** https://redis.io/commands/json.arrindex  |
| `arrinsert()` | (`key`, `path`, `index`, ...`values`) => `Promise`\<(`null` \| `number`)[]\>       | **See** https://redis.io/commands/json.arrinsert |
| `arrlen()`    | (`key`, `path?`) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.arrlen    |
| `arrpop()`    | (`key`, `path?`, `index?`) => `Promise`\<`unknown`[]\>                             | **See** https://redis.io/commands/json.arrpop    |
| `arrtrim()`   | (`key`, `path?`, `start?`, `stop?`) => `Promise`\<(`null` \| `number`)[]\>         | **See** https://redis.io/commands/json.arrtrim   |
| `clear()`     | (`key`, `path?`) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.clear     |
| `del()`       | (`key`, `path?`) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.del       |
| `forget()`    | (`key`, `path?`) => `Promise`\<`number`\>                                          | **See** https://redis.io/commands/json.forget    |
| `get()`       | \<`TData`\>(...`args`) => `Promise`\<`null` \| `TData`\>                           | **See** https://redis.io/commands/json.get       |
| `merge()`     | (`key`, `path`, `value`) => `Promise`\<`null` \| `"OK"`\>                          | **See** https://redis.io/commands/json.merge     |
| `mget()`      | \<`TData`\>(`keys`, `path`) => `Promise`\<`TData`\>                                | **See** https://redis.io/commands/json.mget      |
| `mset()`      | (...`args`) => `Promise`\<`null` \| `"OK"`\>                                       | **See** https://redis.io/commands/json.mset      |
| `numincrby()` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.numincrby |
| `nummultby()` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.nummultby |
| `objkeys()`   | (`key`, `path?`) => `Promise`\<(`null` \| `string`[])[]\>                          | **See** https://redis.io/commands/json.objkeys   |
| `objlen()`    | (`key`, `path?`) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.objlen    |
| `resp()`      | (`key`, `path?`) => `Promise`\<`any`\>                                             | **See** https://redis.io/commands/json.resp      |
| `set()`       | (`key`, `path`, `value`, `opts?`) => `Promise`\<`null` \| `"OK"`\>                 | **See** https://redis.io/commands/json.set       |
| `strappend()` | (`key`, `path`, `value`) => `Promise`\<(`null` \| `number`)[]\>                    | **See** https://redis.io/commands/json.strappend |
| `strlen()`    | (`key`, `path?`) => `Promise`\<(`null` \| `number`)[]\>                            | **See** https://redis.io/commands/json.strlen    |
| `toggle()`    | (`key`, `path`) => `Promise`\<`number`[]\>                                         | **See** https://redis.io/commands/json.toggle    |
| `type()`      | (`key`, `path?`) => `Promise`\<`string`[]\>                                        | **See** https://redis.io/commands/json.type      |

#### Inherited from

`Redis.json`

---

### readYourWritesSyncToken

#### Get Signature

> **get** **readYourWritesSyncToken**(): `undefined` \| `string`

##### Returns

`undefined` \| `string`

#### Set Signature

> **set** **readYourWritesSyncToken**(`session`): `void`

##### Parameters

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

##### Returns

`void`

#### Inherited from

`Redis.readYourWritesSyncToken`

## Methods

### createScript()

> **createScript**\<`TResult`, `TReadonly`\>(`script`, `opts?`): `TReadonly` _extends_ `true` ? `ScriptRO`\<`TResult`\> : `Script`\<`TResult`\>

Creates a new script.

Scripts offer the ability to optimistically try to execute a script without having to send the
entire script to the server. If the script is loaded on the server, it tries again by sending
the entire script. Afterwards, the script is cached on the server.

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

`TResult`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`TReadonly` _extends_ `boolean`

</td>
<td>

`false`

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
<th>Description</th>
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
<td>

The script to create

</td>
</tr>
<tr>
<td>

`opts?`

</td>
<td>

\{ `readonly?`: `TReadonly`; \}

</td>
<td>

Optional options to pass to the script `{ readonly?: boolean }`

</td>
</tr>
<tr>
<td>

`opts.readonly?`

</td>
<td>

`TReadonly`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`TReadonly` _extends_ `true` ? `ScriptRO`\<`TResult`\> : `Script`\<`TResult`\>

A new script

#### Examples

```ts
const redis = new Redis({...})

const script = redis.createScript<string>("return ARGV[1];")
const arg1 = await script.eval([], ["Hello World"])
expect(arg1, "Hello World")
```

```ts
const redis = new Redis({...})

const script = redis.createScript<string>("return ARGV[1];", { readonly: true })
const arg1 = await script.evalRo([], ["Hello World"])
expect(arg1, "Hello World")
```

#### Inherited from

`Redis.createScript`

---

### scan()

#### Call Signature

> **scan**(`cursor`): `Promise`\<`ScanResultStandard`\>

##### Parameters

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

`cursor`

</td>
<td>

`string` \| `number`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`ScanResultStandard`\>

##### See

https://redis.io/commands/scan

##### Inherited from

`Redis.scan`

#### Call Signature

> **scan**\<`TOptions`\>(`cursor`, `opts`): `Promise`\<`TOptions` _extends_ `object` ? `ScanResultWithType` : `ScanResultStandard`\>

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`TOptions` _extends_ `ScanCommandOptions`

</td>
</tr>
</tbody>
</table>

##### Parameters

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

`cursor`

</td>
<td>

`string` \| `number`

</td>
</tr>
<tr>
<td>

`opts`

</td>
<td>

`TOptions`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`TOptions` _extends_ `object` ? `ScanResultWithType` : `ScanResultStandard`\>

##### See

https://redis.io/commands/scan

##### Inherited from

`Redis.scan`

---

### fromEnv()

> `static` **fromEnv**(`config?`): `Redis`

Create a new Upstash Redis instance from environment variables.

Use this to automatically load connection secrets from your environment
variables. For instance when using the Vercel integration.

This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
your environment using `process.env`.

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

`config?`

</td>
<td>

`Omit`\<`RedisConfigNodejs`, `"url"` \| `"token"`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Redis`

#### Inherited from

`Redis.fromEnv`
