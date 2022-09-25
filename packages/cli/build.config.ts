import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["index.ts"],
  clean: true,
  declaration: true,
  outDir: "dist",
});
