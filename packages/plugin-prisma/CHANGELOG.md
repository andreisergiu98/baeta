# @baeta/plugin-prisma

## 2.0.0-next.2

### Patch Changes

- Fix broken types

- Updated dependencies []:
  - @baeta/generator-sdk@2.0.0-next.2
  - @baeta/plugin-exec@2.0.0-next.2
  - @baeta/util-path@2.0.0-next.2

## 2.0.0-next.1

### Patch Changes

- Fix release version

- Updated dependencies []:
  - @baeta/generator-sdk@2.0.0-next.1
  - @baeta/plugin-exec@2.0.0-next.1
  - @baeta/util-path@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#214](https://github.com/andreisergiu98/baeta/pull/214) [`31d1a50`](https://github.com/andreisergiu98/baeta/commit/31d1a509f96535b43ae85d19c770eb1a5f09dc94) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Baeta v2 – major refactor
  - **Side-effect-free type generation & resolver definitions.**
    The types generator and resolver definitions were reworked to be side-effect free, improving type safety.
  - **Stricter type safety.**
    You must now **explicitly define resolvers for every field** during development—breakages that used to surface at runtime are now caught at compile time.
  - **Removed `@baeta/compiler`.**
    Since modern runtimes can execute TypeScript natively, the separate compiler package is no longer needed. Use your runtime’s native TS support or your existing build setup.
  - **Subscriptions update.**
    `@baeta/subscriptions-pubsub` now targets **`graphql-subscriptions` v3**.

### Patch Changes

- Updated dependencies [[`31d1a50`](https://github.com/andreisergiu98/baeta/commit/31d1a509f96535b43ae85d19c770eb1a5f09dc94)]:
  - @baeta/generator-sdk@2.0.0-next.0
  - @baeta/plugin-exec@2.0.0-next.0
  - @baeta/util-path@2.0.0-next.0

## 1.0.11

### Patch Changes

- Updated dependencies [[`7cbd2ef`](https://github.com/andreisergiu98/baeta/commit/7cbd2ef5b7697f703e4cc6f8d9612c7d01a10dd1), [`c7b9c05`](https://github.com/andreisergiu98/baeta/commit/c7b9c0523eb9827c99b2bcfc7dbe02f5ef389f21)]:
  - @baeta/generator-sdk@1.0.2
  - @baeta/plugin-exec@1.0.11

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3)]:
  - @baeta/generator-sdk@1.0.1
  - @baeta/plugin-exec@1.0.9
  - @baeta/util-path@1.0.1

## 1.0.8

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- [#165](https://github.com/andreisergiu98/baeta/pull/165) [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - mark as stable

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228), [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc)]:
  - @baeta/generator-sdk@1.0.0
  - @baeta/plugin-exec@1.0.8
  - @baeta/util-path@1.0.0

## 0.1.5

### Patch Changes

- Updated dependencies [[`bf2d1a3`](https://github.com/andreisergiu98/baeta/commit/bf2d1a326235e5f34e723a5acc81cd7b974b913b)]:
  - @baeta/generator-sdk@0.1.5
  - @baeta/plugin-exec@0.1.5

## 0.1.4

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/generator-sdk@0.1.4
  - @baeta/plugin-exec@0.1.4
  - @baeta/util-path@0.1.4

## 0.1.3

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [#174](https://github.com/andreisergiu98/baeta/pull/174) [`3f2befb`](https://github.com/andreisergiu98/baeta/commit/3f2befbb4b645e2970727482e970c4e78f0ed598) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix skip generate

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/generator-sdk@0.1.3
  - @baeta/plugin-exec@0.1.3
  - @baeta/util-path@0.1.3

## 0.1.2

### Patch Changes

- [#170](https://github.com/andreisergiu98/baeta/pull/170) [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`e3fb6f8`](https://github.com/andreisergiu98/baeta/commit/e3fb6f877b4b20e248ad79cbaa3655cabe973f6b), [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321)]:
  - @baeta/generator-sdk@0.1.2
  - @baeta/plugin-exec@0.1.2
  - @baeta/util-path@0.1.2

## 0.1.1

### Patch Changes

- [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix exports order in package.json

- [#161](https://github.com/andreisergiu98/baeta/pull/161) [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#162](https://github.com/andreisergiu98/baeta/pull/162) [`1c42409`](https://github.com/andreisergiu98/baeta/commit/1c424095518f47a057dd8b475c3c634eeb59bb92) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - make generated schema path required

- Updated dependencies [[`7f1958c`](https://github.com/andreisergiu98/baeta/commit/7f1958c44d1b9bed473e48c875fdaa7020c434fa), [`b9638eb`](https://github.com/andreisergiu98/baeta/commit/b9638eb9fb713507efa9821b4f04cc7896a997b1), [`fd3a5d2`](https://github.com/andreisergiu98/baeta/commit/fd3a5d27b497aca4b8807155e801b1c1197c5fe2), [`9d8d6a1`](https://github.com/andreisergiu98/baeta/commit/9d8d6a15d63579a2e0bdaa07b7efdcf10aff2492), [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a), [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0)]:
  - @baeta/generator-sdk@0.1.1
  - @baeta/plugin-exec@0.1.1
  - @baeta/util-path@0.1.1

## 0.1.0

### Minor Changes

- [#156](https://github.com/andreisergiu98/baeta/pull/156) [`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise engine requirement to node >= 22

### Patch Changes

- [#152](https://github.com/andreisergiu98/baeta/pull/152) [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update formatter

- [#145](https://github.com/andreisergiu98/baeta/pull/145) [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8), [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7), [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2)]:
  - @baeta/generator-sdk@0.1.0
  - @baeta/plugin-exec@0.1.0
  - @baeta/util-path@0.1.0

## 0.0.24

### Patch Changes

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update typescript

- Updated dependencies [[`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4), [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4)]:
  - @baeta/generator-sdk@0.0.14
  - @baeta/plugin-exec@0.0.12
  - @baeta/util-path@0.0.6

## 0.0.23

### Patch Changes

- [#128](https://github.com/andreisergiu98/baeta/pull/128) [`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4)]:
  - @baeta/generator-sdk@0.0.13
  - @baeta/plugin-exec@0.0.11
  - @baeta/util-path@0.0.5

## 0.0.22

### Patch Changes

- [#121](https://github.com/andreisergiu98/baeta/pull/121) [`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update Node to v20

- Updated dependencies [[`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454), [`d94ee47`](https://github.com/andreisergiu98/baeta/commit/d94ee47bc485c541ff011290c4ac6ef0c145c83f)]:
  - @baeta/generator-sdk@0.0.12
  - @baeta/plugin-exec@0.0.10
  - @baeta/util-path@0.0.4

## 0.0.21

### Patch Changes

- [#119](https://github.com/andreisergiu98/baeta/pull/119) [`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`18db339`](https://github.com/andreisergiu98/baeta/commit/18db339719aa309c619372d2161c5fdbc08fa316), [`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a)]:
  - @baeta/generator-sdk@0.0.11
  - @baeta/plugin-exec@0.0.9
  - @baeta/util-path@0.0.3

## 0.0.20

### Patch Changes

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies and builder

- [#106](https://github.com/andreisergiu98/baeta/pull/106) [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add compatibility with windows

- Updated dependencies [[`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e)]:
  - @baeta/generator-sdk@0.0.10
  - @baeta/plugin-exec@0.0.8
  - @baeta/util-path@0.0.2

## 0.0.19

### Patch Changes

- [#69](https://github.com/andreisergiu98/baeta/pull/69) [`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#91](https://github.com/andreisergiu98/baeta/pull/91) [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`3ff5e54`](https://github.com/andreisergiu98/baeta/commit/3ff5e54f31cf42ba2264b12309338d6e78710722), [`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37), [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546)]:
  - @baeta/generator-sdk@0.0.9
  - @baeta/plugin-exec@0.0.7

## 0.0.18

### Patch Changes

- [#66](https://github.com/andreisergiu98/baeta/pull/66) [`9a4a021`](https://github.com/andreisergiu98/baeta/commit/9a4a0214351b70295ce4f7eecaa8c49ab0e1325b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - replace chokidar with @parcel/watcher

- Updated dependencies [[`9a4a021`](https://github.com/andreisergiu98/baeta/commit/9a4a0214351b70295ce4f7eecaa8c49ab0e1325b)]:
  - @baeta/generator-sdk@0.0.8
  - @baeta/plugin-exec@0.0.6

## 0.0.17

### Patch Changes

- Updated dependencies [[`6a2dd11`](https://github.com/andreisergiu98/baeta/commit/6a2dd110d6ffd2bff25d9c4501faebb052e0cd40)]:
  - @baeta/plugin-exec@0.0.5
  - @baeta/generator-sdk@0.0.7

## 0.0.16

### Patch Changes

- [#47](https://github.com/andreisergiu98/baeta/pull/47) [`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#43](https://github.com/andreisergiu98/baeta/pull/43) [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - bump dependencies

- Updated dependencies [[`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9), [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2)]:
  - @baeta/generator-sdk@0.0.6
  - @baeta/plugin-exec@0.0.4

## 0.0.15

### Patch Changes

- [#40](https://github.com/andreisergiu98/baeta/pull/40) [`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - normalize config

- Updated dependencies [[`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056), [`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056)]:
  - @baeta/generator-sdk@0.0.5
  - @baeta/plugin-exec@0.0.3

## 0.0.14

### Patch Changes

- [`d1190c1`](https://github.com/andreisergiu98/baeta/commit/d1190c10e3c259c73ddeeb73a4bd312b22bf2ea4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - create cli sdk
  release prisma plugin
  update dependencies
  refactor generator plugins
- Updated dependencies [[`d1190c1`](https://github.com/andreisergiu98/baeta/commit/d1190c10e3c259c73ddeeb73a4bd312b22bf2ea4)]:
  - @baeta/generator-sdk@0.0.4
  - @baeta/plugin-exec@0.0.2
