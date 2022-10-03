import { camelCase, paramCase, pascalCase, snakeCase } from 'change-case-all';

export type Casing = 'camelCase' | 'PascalCase' | 'snake_case' | 'kebab-case';

export function changeCase(input: string, casing: Casing) {
  if (casing === 'camelCase') {
    return camelCase(input);
  }

  if (casing === 'PascalCase') {
    return pascalCase(input);
  }

  if (casing === 'snake_case') {
    return snakeCase(input);
  }

  if (casing === 'kebab-case') {
    return paramCase(input);
  }

  return input;
}
