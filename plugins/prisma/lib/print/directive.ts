export const directives = [
  "directive @inputConstraint(minFields: Int, maxFields: Int) on INPUT_OBJECT",
];

export function printDirectives() {
  return directives.join("\n");
}

export function printInputConstraintDirective(
  minNumFields?: number | null,
  maxNumFields?: number | null
) {
  const args = [];

  if (minNumFields != null) {
    args.push(`minFields: ${minNumFields}`);
  }

  if (maxNumFields != null) {
    args.push(`maxFields: ${maxNumFields}`);
  }

  if (args.length === 0) {
    return;
  }

  return `@inputConstraint(${args.join(", ")})`;
}
