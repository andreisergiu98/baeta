import { ModuleRegisterer } from '../module';
import { inputConstraintDirective } from './input-constraint';

export function registerDirectives(module: ModuleRegisterer) {
  module.$directive(inputConstraintDirective);
}
