import path from "path";

export function fixPath(root: string, toFix: string) {
  return path.resolve(path.relative(root, toFix));
}
