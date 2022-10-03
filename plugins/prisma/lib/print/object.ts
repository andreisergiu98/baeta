import { filterEmpty, indent } from '../../utils/string';

export function printObject(
  kind: string,
  name: string,
  fields: Array<string | undefined>,
  directive?: string
) {
  const directiveLine = directive ? ` ${directive}` : '';
  const firstLine = kind + ' ' + name + directiveLine + ' {';
  const content = filterEmpty(fields).map(indent(2)).join('\n');
  const lastLine = '}';

  return [firstLine, content, lastLine].join('\n');
}
