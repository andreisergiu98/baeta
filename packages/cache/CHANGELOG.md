# @baeta/cache

## 2.0.0-next.15

### Patch Changes

- Drop Node v23 and v25 by [@andreisergiu98](https://github.com/andreisergiu98) in [#474](https://github.com/andreisergiu98/baeta/pull/474)

- Fix ttl override not being forwarded for queries by [@andreisergiu98](https://github.com/andreisergiu98) in [#496](https://github.com/andreisergiu98/baeta/pull/496)

- Validate indexes and query metadata by [@andreisergiu98](https://github.com/andreisergiu98) in [#507](https://github.com/andreisergiu98/baeta/pull/507)
- Updated dependencies [[`dc89e17`](https://github.com/andreisergiu98/baeta/commit/dc89e1728926f4bd5a5e1351635c38bf8d5938dc)]:
  - @baeta/util-encoding@2.0.0-next.4
  - @baeta/util-log@2.0.0-next.4

## 2.0.0-next.14

## 2.0.0-next.13

### Patch Changes

- [#283](https://github.com/andreisergiu98/baeta/pull/283) [`762c26f`](https://github.com/andreisergiu98/baeta/commit/762c26fba654c27d0ed53405d576cac9339476e4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix: do not overwrite with query items if they already exist to avoid missing invalidation events

## 2.0.0-next.12

### Minor Changes

- [#275](https://github.com/andreisergiu98/baeta/pull/275) [`54f4361`](https://github.com/andreisergiu98/baeta/commit/54f4361c857f2a3d32a29dd898b2be648ac0bb2c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Decouple cache from graphql
