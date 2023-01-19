import { Ctx } from '@baeta/generator-sdk';
import { createExecPlugin } from '@baeta/plugin-exec';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { PrismaPluginOptions } from './options';

async function compareSchemas(current: string, generated: string) {
  const [currentSchema, generatedSchema] = await Promise.all([
    readFile(resolve(process.cwd(), current), 'utf-8'),
    readFile(resolve(process.cwd(), generated), 'utf-8').catch(() => null),
  ]);
  return currentSchema === generatedSchema;
}

export function createPrismaClientPlugin(options: PrismaPluginOptions) {
  const { prismaSchema, generateCommand, generatedSchemaPath } = options;
  const schema = resolve(process.cwd(), prismaSchema);

  const skip = async (ctx: Ctx) => {
    if (ctx.watching && ctx.changedFile !== schema) {
      return true;
    }

    if (!ctx.watching && generatedSchemaPath) {
      return compareSchemas(prismaSchema, generatedSchemaPath);
    }

    return false;
  };

  return createExecPlugin({
    name: 'prisma-client',
    actionName: 'Prisma client',
    exec: generateCommand ?? 'prisma generate',
    watch: () => {
      return {
        include: [resolve(process.cwd(), prismaSchema)],
        ignore: [],
      };
    },
    skip,
  });
}
