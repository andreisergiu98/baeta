import { defineConfig } from "@baeta/prep/tsup";

export default defineConfig({
  entry: ["./index.ts", "!dist"],
  format: ["esm", "cjs"],
  clean: true,
});
