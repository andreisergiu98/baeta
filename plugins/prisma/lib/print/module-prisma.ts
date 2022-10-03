export function printPrismaModule() {
  const imports = [
    `import { registerPrismaModule } from "@baeta/prisma";`,
    `import { createPrismaModule } from "./typedef";`,
  ].join("\n");

  const content = [
    `export const prismaModule = createPrismaModule();`,
    `registerPrismaModule(prismaModule);`,
  ].join("\n");

  return [imports, content].join("\n");
}
