import { createInputDirective } from '@baeta/core';
import { BadUserInput } from '@baeta/errors';
import { Definition } from '../definition';

interface Args {
  minFields?: number;
  maxFields?: number;
}

const name = 'constraints';

const sdl = `directive @${name}(
    minFields: Int
    maxFields: Int
) on INPUT_OBJECT
`;

const directive = createInputDirective<Args>({
  name,
  target: 'object',
  resolve(params) {
    const value = params.getValue();

    if (typeof value !== 'object' || value == null) {
      return;
    }

    const config = params.directiveConfig;
    const keys = Object.keys(value);

    if (config.maxFields && keys.length > config.maxFields) {
      throw new BadUserInput(
        `Maximum ${config.maxFields} number of fields allowed, got ${keys.length}!`,
      );
    }

    if (config.minFields && keys.length < config.minFields) {
      throw new BadUserInput(
        `Minimum ${config.minFields} number of fields allowed, got ${keys.length}!`,
      );
    }
  },
});

export const inputConstraints: Definition = {
  sdl,
  directive,
};
