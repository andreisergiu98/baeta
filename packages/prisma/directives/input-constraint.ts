import { createInputDirective } from '@baeta/core';

type Constraint = { minFields?: number; maxFields?: number };

function createFieldMessage(count: number) {
  const variant = count === 1 ? 'field' : 'fields';
  return `${count} ${variant}`;
}

export function validate(arg: unknown, constraints: Constraint) {
  if (arg == null) {
    return;
  }

  const min = constraints.minFields;
  const max = constraints.maxFields;
  const fields = Object.keys(arg).length;

  if (min != null && fields < min) {
    throw new Error(
      `Expected at least ${createFieldMessage(min)}, got ${createFieldMessage(fields)}`
    );
  }

  if (max != null && fields > max) {
    throw new Error(
      `Expected at most ${createFieldMessage(max)}, got ${createFieldMessage(fields)}`
    );
  }
}

export const inputConstraintDirective = createInputDirective<Constraint>({
  name: 'inputConstraint',
  target: 'object',
  resolve: (params) => {
    validate(params.getValue(), params.directiveConfig);
  },
});
