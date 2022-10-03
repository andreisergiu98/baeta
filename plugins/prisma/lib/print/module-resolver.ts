import { upperCaseFirst, camelCase } from "change-case-all";
import { ModelOperations } from "../model-operations";
import { ModelRelation } from "../model-relations";

export function printResolver(
  namespace: string,
  mapping: ModelOperations,
  prisma: string = "ctx.prisma"
) {
  const prismaModel = camelCase(mapping.model);
  const prismaMethod = mapping.prisma.replace("One", "");
  const expectError =
    mapping.prisma === "groupBy" ? "//@ts-expect-error difficult to infer\n  " : "";

  const instruction = `${expectError}return ${prisma}.${prismaModel}.${prismaMethod}(args);`;

  return printFunction(namespace, mapping.operation, instruction);
}

export function printRelationResolver(
  model: string,
  relation: ModelRelation,
  prisma: string = "ctx.prisma"
) {
  const prismaModel = camelCase(model);
  const instruction = `return ${prisma}.${prismaModel}.findUnique({where: {id: root.id}}).${relation.name}(args);`;

  return printFunction(model, relation.name, instruction, true);
}

function printFunction(
  namespace: string,
  func: string,
  content: string,
  rootArg = false
) {
  const args = ["args", "ctx"];

  if (rootArg) {
    args.unshift("root");
  }

  return [
    `${upperCaseFirst(namespace)}.${func}(({ ${args.join(", ")} }) => {`,
    `  ${content}`,
    `});`,
  ].join("\n");
}
