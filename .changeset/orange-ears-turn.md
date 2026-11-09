---
"@baeta/generator-sdk": major
"@baeta/generator": major
---

`File.persisted` is replaced by `File.state`, and generated files start with a `@fileHash` comment.
`Ctx` has `plugins` and `pluginStates` instead of `didSetup`, `didGenerate`, `didEnd` and `pluginNames`. `changedFile` is now `changedFiles`, because watch mode batches changes made during a run into one rerun.
The generator cache moved from the system temp folder to `node_modules/.cache/baeta`, set with the new `cacheDir` option, and is only saved after a successful run.
`FileManager` keeps only `files`, `add`, `createAndAdd` and `get`; the generator writes files after each step and removes stale ones at the end of a run.
