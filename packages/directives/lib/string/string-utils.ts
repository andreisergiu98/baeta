import { createInputDirective } from '@baeta/core';
import { Definition } from '../definition';

interface TrimArgs {
  end?: boolean;
  start?: boolean;
}

const trimSdl =
  'directive @trim(start: Boolean, end: Boolean) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';

const upperSdl = 'directive @upper on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';
const lowerSdl = 'directive @lower on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';

const trimDirective = createInputDirective<TrimArgs>({
  name: 'trim',
  target: 'scalar',
  resolve(params) {
    const value = params.getValue();

    if (typeof value !== 'string') {
      return;
    }

    const config = params.directiveConfig;

    if (config.start === true && config.end !== true) {
      return params.setValue(value.trimStart());
    }

    if (config.end === true && config.start !== true) {
      return params.setValue(value.trimEnd());
    }

    console.log(params.args);
    params.setValue(value.trim());
    console.log(params.args);
  },
});

const lowerDirective = createInputDirective<{}>({
  name: 'lower',
  target: 'scalar',
  resolve(params) {
    const value = params.getValue();
    if (typeof value === 'string') {
      params.setValue(value.toLowerCase());
    }
  },
});

const upperDirective = createInputDirective<{}>({
  name: 'upper',
  target: 'scalar',
  resolve(params) {
    const value = params.getValue();
    if (typeof value === 'string') {
      params.setValue(value.toUpperCase());
    }
  },
});

export const trim: Definition = {
  sdl: trimSdl,
  directive: trimDirective,
};

export const lower: Definition = {
  sdl: lowerSdl,
  directive: lowerDirective,
};

export const upper: Definition = {
  sdl: upperSdl,
  directive: upperDirective,
};
