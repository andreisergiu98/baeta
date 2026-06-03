---
"@baeta/plugin-gitignore": major
---

The gitignore plugin still auto-populates `.gitignore` with Baeta's generated files, but its options changed. `ignoreTags` was renamed to `skipTags`, and a new `skipFilesGlobs` option lets you exclude specific generated files by glob. Files marked `disableOverwrite` are now also excluded from `.gitignore`.

**v1:**

```typescript
gitignorePlugin({
  ignoreTags: ["cloudflare"],
});
```

**v2:**

```typescript
gitignorePlugin({
  skipTags: ["cloudflare"],
  skipFilesGlobs: ["src/modules/**/schema.ts"],
});
```
