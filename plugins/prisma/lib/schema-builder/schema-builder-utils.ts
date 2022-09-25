export function isOperation(name: string): name is "Query" | "Mutation" {
  return ["Query", "Mutation"].includes(name);
}
