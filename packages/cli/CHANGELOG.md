# @baeta/cli

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
  - @baeta/plugin-graphql@2.0.0-next.0
  - @baeta/generator@2.0.0-next.0
  - @baeta/util-path@2.0.0-next.0

## 1.0.11

### Patch Changes

- [`b5024ae`](https://github.com/andreisergiu98/baeta/commit/b5024ae31964e69bc672d9acb081038b40db86b2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Use sigterm instead of sigkill to terminate builder processes

- Updated dependencies [[`c7b9c05`](https://github.com/andreisergiu98/baeta/commit/c7b9c0523eb9827c99b2bcfc7dbe02f5ef389f21)]:
  - @baeta/plugin-graphql@1.0.11
  - @baeta/generator@1.0.2

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- [`dd686bf`](https://github.com/andreisergiu98/baeta/commit/dd686bf8057f0786ab12273cc3a0736f34bf07b7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Fix cli not closing after generate

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3)]:
  - @baeta/compiler@1.0.9
  - @baeta/generator@1.0.1
  - @baeta/plugin-graphql@1.0.9
  - @baeta/util-path@1.0.1

## 1.0.8

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228), [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc)]:
  - @baeta/compiler@1.0.8
  - @baeta/generator@1.0.0
  - @baeta/plugin-graphql@1.0.8
  - @baeta/util-path@1.0.0

## 1.0.5

### Patch Changes

- [#184](https://github.com/andreisergiu98/baeta/pull/184) [`bf2d1a3`](https://github.com/andreisergiu98/baeta/commit/bf2d1a326235e5f34e723a5acc81cd7b974b913b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add option to run the app without compiling

- [#184](https://github.com/andreisergiu98/baeta/pull/184) [`bf2d1a3`](https://github.com/andreisergiu98/baeta/commit/bf2d1a326235e5f34e723a5acc81cd7b974b913b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add option to run command if build is not necessary

- [#184](https://github.com/andreisergiu98/baeta/pull/184) [`bf2d1a3`](https://github.com/andreisergiu98/baeta/commit/bf2d1a326235e5f34e723a5acc81cd7b974b913b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - try importing baeta.ts before compiling

- Updated dependencies []:
  - @baeta/generator@0.1.5
  - @baeta/plugin-graphql@0.1.5

## 1.0.4

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/compiler@0.1.4
  - @baeta/generator@0.1.4
  - @baeta/plugin-graphql@0.1.4
  - @baeta/util-path@0.1.4

## 1.0.3

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Drop support for CommonJS config files

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/compiler@0.1.3
  - @baeta/generator@0.1.3
  - @baeta/plugin-graphql@0.1.3
  - @baeta/util-path@0.1.3

## 1.0.2

### Patch Changes

- [#170](https://github.com/andreisergiu98/baeta/pull/170) [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [`1497d54`](https://github.com/andreisergiu98/baeta/commit/1497d541ad844c746c272668c4634be96ac33153) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix spinner animation

- [`cf9f094`](https://github.com/andreisergiu98/baeta/commit/cf9f09468f84d99b069eb0f55e1fc207e2a41dd8) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - remove unused imports

- Updated dependencies [[`e3fb6f8`](https://github.com/andreisergiu98/baeta/commit/e3fb6f877b4b20e248ad79cbaa3655cabe973f6b), [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321), [`e84137f`](https://github.com/andreisergiu98/baeta/commit/e84137f5a0cd65402e88cd56224fff450057c473)]:
  - @baeta/generator@0.1.2
  - @baeta/compiler@0.1.2
  - @baeta/plugin-graphql@0.1.2
  - @baeta/util-path@0.1.2

## 1.0.1

### Patch Changes

- [#157](https://github.com/andreisergiu98/baeta/pull/157) [`b9638eb`](https://github.com/andreisergiu98/baeta/commit/b9638eb9fb713507efa9821b4f04cc7896a997b1) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - stricter linting, better type safety

- [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix exports order in package.json

- [#161](https://github.com/andreisergiu98/baeta/pull/161) [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`7f1958c`](https://github.com/andreisergiu98/baeta/commit/7f1958c44d1b9bed473e48c875fdaa7020c434fa), [`b6e87ce`](https://github.com/andreisergiu98/baeta/commit/b6e87ce347406164a9c0fca49172f1d5d4f50f74), [`1c42409`](https://github.com/andreisergiu98/baeta/commit/1c424095518f47a057dd8b475c3c634eeb59bb92), [`b9638eb`](https://github.com/andreisergiu98/baeta/commit/b9638eb9fb713507efa9821b4f04cc7896a997b1), [`9d8d6a1`](https://github.com/andreisergiu98/baeta/commit/9d8d6a15d63579a2e0bdaa07b7efdcf10aff2492), [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a), [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0), [`34877dc`](https://github.com/andreisergiu98/baeta/commit/34877dce585a36abd3bb21adfaa2b84075a416a9), [`b6e87ce`](https://github.com/andreisergiu98/baeta/commit/b6e87ce347406164a9c0fca49172f1d5d4f50f74)]:
  - @baeta/plugin-graphql@0.1.1
  - @baeta/compiler@0.1.1
  - @baeta/generator@0.1.1
  - @baeta/util-path@0.1.1

## 1.0.0

### Minor Changes

- [#156](https://github.com/andreisergiu98/baeta/pull/156) [`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise engine requirement to node >= 22

### Patch Changes

- [#152](https://github.com/andreisergiu98/baeta/pull/152) [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update formatter

- [#145](https://github.com/andreisergiu98/baeta/pull/145) [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8), [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7), [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2)]:
  - @baeta/compiler@0.1.0
  - @baeta/generator@0.1.0
  - @baeta/plugin-graphql@0.1.0
  - @baeta/util-path@0.1.0

## 0.0.50

### Patch Changes

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update typescript

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update ink and switch to official release

- Updated dependencies [[`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4), [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4), [`c403694`](https://github.com/andreisergiu98/baeta/commit/c403694c89aa51259866dddc9b93f3cf4566e341)]:
  - @baeta/compiler@0.0.34
  - @baeta/generator@0.0.30
  - @baeta/plugin-graphql@0.0.34
  - @baeta/util-path@0.0.6

## 0.0.49

### Patch Changes

- Updated dependencies [[`966e1b7`](https://github.com/andreisergiu98/baeta/commit/966e1b7697090b1de5a3ed1638aee474b48088c3)]:
  - @baeta/plugin-graphql@0.0.33

## 0.0.48

### Patch Changes

- Updated dependencies [[`5d22b52`](https://github.com/andreisergiu98/baeta/commit/5d22b520e0181ee44111f6438036380050d140c3)]:
  - @baeta/plugin-graphql@0.0.32

## 0.0.47

### Patch Changes

- Updated dependencies [[`325f623`](https://github.com/andreisergiu98/baeta/commit/325f623caa9aab2d6ae45258f214be1d7518396a)]:
  - @baeta/plugin-graphql@0.0.31

## 0.0.46

### Patch Changes

- Updated dependencies [[`0896994`](https://github.com/andreisergiu98/baeta/commit/089699451b41dbbe92d96bb4b9987e13893e7501)]:
  - @baeta/plugin-graphql@0.0.30

## 0.0.45

### Patch Changes

- [#128](https://github.com/andreisergiu98/baeta/pull/128) [`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4)]:
  - @baeta/compiler@0.0.33
  - @baeta/generator@0.0.29
  - @baeta/plugin-graphql@0.0.29
  - @baeta/util-path@0.0.5

## 0.0.44

### Patch Changes

- Updated dependencies [[`74a06d6`](https://github.com/andreisergiu98/baeta/commit/74a06d65345e1ae3bd454e9015ff70f7178b5ff2)]:
  - @baeta/plugin-graphql@0.0.28

## 0.0.43

### Patch Changes

- [#121](https://github.com/andreisergiu98/baeta/pull/121) [`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update Node to v20

- Updated dependencies [[`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454), [`5ab9740`](https://github.com/andreisergiu98/baeta/commit/5ab97405bbdeac3d9baa59cfe9502cdbff101163)]:
  - @baeta/compiler@0.0.32
  - @baeta/generator@0.0.28
  - @baeta/plugin-graphql@0.0.27
  - @baeta/util-path@0.0.4

## 0.0.42

### Patch Changes

- [#117](https://github.com/andreisergiu98/baeta/pull/117) [`18db339`](https://github.com/andreisergiu98/baeta/commit/18db339719aa309c619372d2161c5fdbc08fa316) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add comments to config types

- [#119](https://github.com/andreisergiu98/baeta/pull/119) [`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`18db339`](https://github.com/andreisergiu98/baeta/commit/18db339719aa309c619372d2161c5fdbc08fa316), [`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a)]:
  - @baeta/generator@0.0.27
  - @baeta/compiler@0.0.31
  - @baeta/plugin-graphql@0.0.26
  - @baeta/util-path@0.0.3

## 0.0.41

### Patch Changes

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#104](https://github.com/andreisergiu98/baeta/pull/104) [`de442e8`](https://github.com/andreisergiu98/baeta/commit/de442e8dcb48681e2be8064b934cad5af38a1829) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix error when installing ink

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies and builder

- [#106](https://github.com/andreisergiu98/baeta/pull/106) [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add compatibility with windows

- Updated dependencies [[`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e), [`03d1353`](https://github.com/andreisergiu98/baeta/commit/03d1353bcedf211d3b7dcfbe38132e43422742b1)]:
  - @baeta/compiler@0.0.30
  - @baeta/generator@0.0.26
  - @baeta/plugin-graphql@0.0.25
  - @baeta/util-path@0.0.2

## 0.0.40

### Patch Changes

- [#69](https://github.com/andreisergiu98/baeta/pull/69) [`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#91](https://github.com/andreisergiu98/baeta/pull/91) [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`5d0420e`](https://github.com/andreisergiu98/baeta/commit/5d0420ead92cef8b3d14854be2efcfa8b125064b), [`3ff5e54`](https://github.com/andreisergiu98/baeta/commit/3ff5e54f31cf42ba2264b12309338d6e78710722), [`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37), [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546), [`4a5fbfa`](https://github.com/andreisergiu98/baeta/commit/4a5fbfa0c97253fcd49178a702ca96e9f6248100)]:
  - @baeta/generator@0.0.25
  - @baeta/plugin-graphql@0.0.24
  - @baeta/compiler@0.0.29

## 0.0.39

### Patch Changes

- [#66](https://github.com/andreisergiu98/baeta/pull/66) [`9a4a021`](https://github.com/andreisergiu98/baeta/commit/9a4a0214351b70295ce4f7eecaa8c49ab0e1325b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - replace chokidar with @parcel/watcher

- Updated dependencies [[`9a4a021`](https://github.com/andreisergiu98/baeta/commit/9a4a0214351b70295ce4f7eecaa8c49ab0e1325b), [`9a4a021`](https://github.com/andreisergiu98/baeta/commit/9a4a0214351b70295ce4f7eecaa8c49ab0e1325b)]:
  - @baeta/generator@0.0.24
  - @baeta/plugin-graphql@0.0.23

## 0.0.38

### Patch Changes

- Updated dependencies []:
  - @baeta/generator@0.0.23
  - @baeta/plugin-graphql@0.0.22

## 0.0.37

### Patch Changes

- [#61](https://github.com/andreisergiu98/baeta/pull/61) [`d969dca`](https://github.com/andreisergiu98/baeta/commit/d969dca6f7f81f3387032887ff96ad00c35b6081) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix(cli): add missing shebang

## 0.0.36

### Patch Changes

- [#52](https://github.com/andreisergiu98/baeta/pull/52) [`d88cca7`](https://github.com/andreisergiu98/baeta/commit/d88cca7c271ce99e6296396e2ada5e3a905f886a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`d88cca7`](https://github.com/andreisergiu98/baeta/commit/d88cca7c271ce99e6296396e2ada5e3a905f886a)]:
  - @baeta/plugin-graphql@0.0.21

## 0.0.35

### Patch Changes

- [#47](https://github.com/andreisergiu98/baeta/pull/47) [`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#43](https://github.com/andreisergiu98/baeta/pull/43) [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - bump dependencies

- Updated dependencies [[`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9), [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2)]:
  - @baeta/generator@0.0.22
  - @baeta/plugin-graphql@0.0.20

## 0.0.34

### Patch Changes

- Updated dependencies [[`f122a1e`](https://github.com/andreisergiu98/baeta/commit/f122a1e2970d915ce3c24931d4309db26665c739)]:
  - @baeta/generator@0.0.21

## 0.0.33

### Patch Changes

- [#40](https://github.com/andreisergiu98/baeta/pull/40) [`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - normalize config

- [#40](https://github.com/andreisergiu98/baeta/pull/40) [`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - change generator plugin order

- Updated dependencies [[`9f937f4`](https://github.com/andreisergiu98/baeta/commit/9f937f47d3464a082680047414ee13a76cf6c056)]:
  - @baeta/generator@0.0.20
  - @baeta/plugin-graphql@0.0.19

## 0.0.32

### Patch Changes

- [`d1190c1`](https://github.com/andreisergiu98/baeta/commit/d1190c10e3c259c73ddeeb73a4bd312b22bf2ea4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - create cli sdk
  release prisma plugin
  update dependencies
  refactor generator plugins
- Updated dependencies [[`d1190c1`](https://github.com/andreisergiu98/baeta/commit/d1190c10e3c259c73ddeeb73a4bd312b22bf2ea4)]:
  - @baeta/generator@0.0.19
  - @baeta/plugin-graphql@0.0.18

## 0.0.31

### Patch Changes

- [`02936ae`](https://github.com/andreisergiu98/baeta/commit/02936aeb606c75a2a79b6ce4524851c6c62afb82) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - bump packages

- Updated dependencies [[`02936ae`](https://github.com/andreisergiu98/baeta/commit/02936aeb606c75a2a79b6ce4524851c6c62afb82)]:
  - @baeta/generator@0.0.18
  - @baeta/plugin-graphql@0.0.17

## 0.0.28

### Patch Changes

- [#25](https://github.com/andreisergiu98/baeta/pull/25) [`c2c5875`](https://github.com/andreisergiu98/baeta/commit/c2c5875f8356e166f34a20b3e4384f9bce093e61) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add support for ts config files

- [#25](https://github.com/andreisergiu98/baeta/pull/25) [`c2c5875`](https://github.com/andreisergiu98/baeta/commit/c2c5875f8356e166f34a20b3e4384f9bce093e61) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - refactor cli and plugins

- Updated dependencies [[`c2c5875`](https://github.com/andreisergiu98/baeta/commit/c2c5875f8356e166f34a20b3e4384f9bce093e61)]:
  - @baeta/generator@0.0.15
  - @baeta/plugin-graphql@0.0.16

## 0.0.27

## 0.0.26

### Patch Changes

- [`c034d77`](https://github.com/andreisergiu98/baeta/commit/c034d77a1e3c75871ed768ab8bf3594635b02c0a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - drop support for baeta.ts

- [`11031eb`](https://github.com/andreisergiu98/baeta/commit/11031ebf71808e1c20e8f8e98259359ceb50cd77) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add a more reliable publishing method

- Updated dependencies [[`c034d77`](https://github.com/andreisergiu98/baeta/commit/c034d77a1e3c75871ed768ab8bf3594635b02c0a), [`11031eb`](https://github.com/andreisergiu98/baeta/commit/11031ebf71808e1c20e8f8e98259359ceb50cd77)]:
  - @baeta/config@0.0.9
  - @baeta/generator@0.0.14
  - @baeta/plugin@0.0.14

## 0.0.22

### Patch Changes

- [#21](https://github.com/andreisergiu98/baeta/pull/21) [`034fd48`](https://github.com/andreisergiu98/baeta/commit/034fd488d9942e27e4debc1044bf8084231fced2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - rewrite config loader

- [#21](https://github.com/andreisergiu98/baeta/pull/21) [`034fd48`](https://github.com/andreisergiu98/baeta/commit/034fd488d9942e27e4debc1044bf8084231fced2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - move onSuccess responsability to cli

## 0.0.21

### Patch Changes

- Updated dependencies [[`dfaf0dc`](https://github.com/andreisergiu98/baeta/commit/dfaf0dc108244b0ada332ab978aa7f39fbfe7e7d)]:
  - @baeta/config@0.0.8
  - @baeta/generator@0.0.13
  - @baeta/plugin@0.0.13

## 0.0.20

### Patch Changes

- [`55f1d45`](https://github.com/andreisergiu98/baeta/commit/55f1d45572ae1f0c0b1c8934172f8482c6897674) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - remove import.meta

## 0.0.19

### Patch Changes

- [`528794c`](https://github.com/andreisergiu98/baeta/commit/528794cea68558efb0e468f4812c0e992a36345b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - use the cjs version of binary

## 0.0.18

### Patch Changes

- [`a4a64a3`](https://github.com/andreisergiu98/baeta/commit/a4a64a35a75e66ca4077a86a9fd5d3ffad481b55) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix broken publishing

- Updated dependencies [[`a4a64a3`](https://github.com/andreisergiu98/baeta/commit/a4a64a35a75e66ca4077a86a9fd5d3ffad481b55)]:
  - @baeta/generator@0.0.12
  - @baeta/config@0.0.7
  - @baeta/plugin@0.0.12

## 0.0.17

### Patch Changes

- [#15](https://github.com/andreisergiu98/baeta/pull/15) [`af4859a`](https://github.com/andreisergiu98/baeta/commit/af4859ae2aee4768d5710189d094059d50647e59) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - support for runtime extensions part 1

- Updated dependencies [[`af4859a`](https://github.com/andreisergiu98/baeta/commit/af4859ae2aee4768d5710189d094059d50647e59)]:
  - @baeta/generator@0.0.11
  - @baeta/config@0.0.6
  - @baeta/plugin@0.0.11

## 0.0.16

### Patch Changes

- [`f2429cd`](https://github.com/andreisergiu98/baeta/commit/f2429cdec7fe4522f7df0a90d582a06fcf792ef7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix build, remove turborepo

- Updated dependencies [[`f2429cd`](https://github.com/andreisergiu98/baeta/commit/f2429cdec7fe4522f7df0a90d582a06fcf792ef7)]:
  - @baeta/config@0.0.5
  - @baeta/generator@0.0.10
  - @baeta/plugin@0.0.10

## 0.0.15

### Patch Changes

- [`a262a56`](https://github.com/andreisergiu98/baeta/commit/a262a56db0f5b08a9b256e0a8402e60cd1be7b51) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix type declarations

- Updated dependencies [[`a262a56`](https://github.com/andreisergiu98/baeta/commit/a262a56db0f5b08a9b256e0a8402e60cd1be7b51)]:
  - @baeta/config@0.0.4
  - @baeta/generator@0.0.9
  - @baeta/plugin@0.0.9

## 0.0.14

### Patch Changes

- [`ef5d66b`](https://github.com/andreisergiu98/baeta/commit/ef5d66b1a4fb6abf837de73c1e77125ed2b92ba3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix cli exports

## 0.0.13

### Patch Changes

- [`5804575`](https://github.com/andreisergiu98/baeta/commit/5804575f17ede2fb76fa733230c7996f193523f3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix cli release version

## 0.0.12

### Patch Changes

- [`f87d828`](https://github.com/andreisergiu98/baeta/commit/f87d828a87a6a12326a3bfcb5846b4390431f0c4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - change export dir

- Updated dependencies [[`f87d828`](https://github.com/andreisergiu98/baeta/commit/f87d828a87a6a12326a3bfcb5846b4390431f0c4)]:
  - @baeta/config@0.0.3
  - @baeta/generator@0.0.8
  - @baeta/plugin@0.0.8

## 0.0.12

### Patch Changes

- [`ae7a358`](https://github.com/andreisergiu98/baeta/commit/ae7a3588d5fb81094d3a46cecf6d736811e9557d) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Export index

## 0.0.11

### Patch Changes

- [#7](https://github.com/andreisergiu98/baeta/pull/7) [`913c1cf`](https://github.com/andreisergiu98/baeta/commit/913c1cf803a1a1058729d9a6eabcd0d9b1208321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Drop graphql-modules
  Fix circular dependencies
  Switch to rome and pnpm
- Updated dependencies [[`913c1cf`](https://github.com/andreisergiu98/baeta/commit/913c1cf803a1a1058729d9a6eabcd0d9b1208321)]:
  - @baeta/config@0.0.2
  - @baeta/generator@0.0.7
  - @baeta/plugin@0.0.7

## 0.0.10

### Patch Changes

- [`9358a06`](https://github.com/andreisergiu98/baeta/commit/9358a06f23665d6f920538cf1ee636b489d93b3e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix changeset release

- Updated dependencies [[`9358a06`](https://github.com/andreisergiu98/baeta/commit/9358a06f23665d6f920538cf1ee636b489d93b3e)]:
  - @baeta/core@0.0.13
  - @baeta/generator@0.0.6

## 0.0.9

### Patch Changes

- [`ffa2fe8`](https://github.com/andreisergiu98/baeta/commit/ffa2fe83df6798375252a01ad14bbd37ffd07d50) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add repository information to package.json

- Updated dependencies [[`ffa2fe8`](https://github.com/andreisergiu98/baeta/commit/ffa2fe83df6798375252a01ad14bbd37ffd07d50)]:
  - @baeta/core@0.0.12
  - @baeta/generator@0.0.5
