import { Ctx } from '@baeta/generator-sdk';
import { createExecPlugin } from '@baeta/plugin-exec';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { PrismaPluginOptions } from './options';

async function compareSchemas(cwd: string, current: string, generated: string) {
  const [currentSchema, generatedSchema] = await Promise.all([
    readFile(resolve(cwd, current), 'utf-8'),
    readFile(resolve(cwd, generated), 'utf-8').catch(() => null),
  ]);
  return currentSchema === generatedSchema;
}

export function createPrismaClientPlugin(options: PrismaPluginOptions) {
  const { prismaSchema, generateCommand, generatedSchemaPath } = options;

  const skip = async (ctx: Ctx) => {
    const schema = resolve(ctx.generatorOptions.cwd, prismaSchema);

    if (ctx.watching && ctx.changedFile !== schema) {
      return true;
    }

    if (!ctx.watching && generatedSchemaPath) {
      return compareSchemas(ctx.generatorOptions.cwd, prismaSchema, generatedSchemaPath);
    }

    return false;
  };

  return createExecPlugin({
    name: 'prisma-client',
    actionName: 'Prisma client',
    exec: generateCommand ?? 'prisma generate',
    watch: (generatorOptions) => {
      return {
        include: [resolve(generatorOptions.cwd, prismaSchema)],
        ignore: [],
      };
    },
    skip,
  });
}