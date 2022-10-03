export function filterEmpty<T>(items: Array<T | undefined | null>): T[] {
  return items.filter((item) => item != null && item != '') as T[];
}

export function indent(number = 2) {
  return (text: string) => {
    return ' '.repeat(number) + text;
  };
}
