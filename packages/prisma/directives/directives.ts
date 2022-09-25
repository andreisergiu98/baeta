import { ModuleRegisterer } from "../module";
import { registerInputConstraintDirective } from "./input-constraint";

export function registerDirectives(module: ModuleRegisterer) {
  module.$directive(registerInputConstraintDirective);
}
