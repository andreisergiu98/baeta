import { createPluginFactoryV1 } from '@baeta/generator-sdk';
import { createContext, Store } from './lib/context';
import { generate } from './lib/generator';
import { Casing } from './utils/casing';

export interface PrismaPluginOptions {
  casing?: Casing;
  schemaNamespace?: string;
  resolverNamespace?: string;
  resolverExport?: boolean;
}

export default createPluginFactoryV1<
  PrismaPluginOptions,
  {
    prisma: Store;
  }
>({
  name: 'prisma',
  watch: (generatorOptions, pluginOptions) => {
    const root = generatorOptions.modulesDir || 'src/modules';
    const modulesMatcher = `${root}/*/${pluginOptions.schemaNamespace || 'prisma-schema'}/**`;

    const prismaModule = `${root}/prisma/**`;

    return {
      include: [],
      ignore: [modulesMatcher, prismaModule],
    };
  },
  setup: async (params) => {
    params.ctx.prisma = await createContext();
    return params.next();
  },
  generate: async (params) => {
    const files = await generate(params.ctx.prisma, {
      modulesDir: params.ctx.generatorOptions.modulesDir || 'src/modules',
      casing: params.config.casing || 'kebab-case',
      schemaNamespace: params.config.schemaNamespace || 'prisma-schema',
      resolverNamespace: params.config.resolverNamespace || 'prisma-resolver',
      resolverExport: params.config.resolverExport ?? true,
    });
    params.ctx.fileManager.add(...files);
    await params.ctx.fileManager.writeByTag('prisma-sdl');
    return params.next();
  },
});
