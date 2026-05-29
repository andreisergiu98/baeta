# @baeta/cache-cloudflare

## 2.0.0-next.15

### Patch Changes

- Drop Node v23 and v25 by [@andreisergiu98](https://github.com/andreisergiu98) in [#474](https://github.com/andreisergiu98/baeta/pull/474)

- Clean-up expired keys when overwrite is disable by [@andreisergiu98](https://github.com/andreisergiu98) in [#503](https://github.com/andreisergiu98/baeta/pull/503)

- Improve performance for cloudflare cache alarm clean-up by [@andreisergiu98](https://github.com/andreisergiu98) in [#506](https://github.com/andreisergiu98/baeta/pull/506)
- Updated dependencies [[`dc89e17`](https://github.com/andreisergiu98/baeta/commit/dc89e1728926f4bd5a5e1351635c38bf8d5938dc), [`b7d088a`](https://github.com/andreisergiu98/baeta/commit/b7d088a79cddf256216cf932d82a67d35fc4264f), [`2c303b2`](https://github.com/andreisergiu98/baeta/commit/2c303b217c87fe2c585cfe8d60c3e901d5fedbe1)]:
  - @baeta/cache@2.0.0-next.15

## 2.0.0-next.14

### Patch Changes

- Updated dependencies:
  - @baeta/cache@2.0.0-next.14

## 2.0.0-next.13

### Patch Changes

- [#283](https://github.com/andreisergiu98/baeta/pull/283) [`762c26f`](https://github.com/andreisergiu98/baeta/commit/762c26fba654c27d0ed53405d576cac9339476e4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix: do not overwrite with query items if they already exist to avoid missing invalidation events

- [#389](https://github.com/andreisergiu98/baeta/pull/389) [`3e7a4d7`](https://github.com/andreisergiu98/baeta/commit/3e7a4d71a59543b8a506938f788aec8b5d907776) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Fix compatiblity with Zod update

- Updated dependencies [[`762c26f`](https://github.com/andreisergiu98/baeta/commit/762c26fba654c27d0ed53405d576cac9339476e4)]:
  - @baeta/cache@2.0.0-next.13

## 2.0.0-next.12

### Minor Changes

- [#275](https://github.com/andreisergiu98/baeta/pull/275) [`54f4361`](https://github.com/andreisergiu98/baeta/commit/54f4361c857f2a3d32a29dd898b2be648ac0bb2c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Decouple cache from graphql

### Patch Changes

- Updated dependencies [[`54f4361`](https://github.com/andreisergiu98/baeta/commit/54f4361c857f2a3d32a29dd898b2be648ac0bb2c)]:
  - @baeta/cache@2.0.0-next.12
