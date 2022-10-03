import { createPluginFactoryV1, GeneratorCtx } from '@baeta/plugin';
import { createContext, Store } from './lib/context';
import { generate } from './lib/generator';
import { Casing } from './utils/casing';

export interface PrismaPluginOptions {
  casing?: Casing;
  schemaNamespace?: string;
  resolverNamespace?: string;
  resolverExport?: boolean;
}

export type PrismaPluginCtx = GeneratorCtx<{
  prisma: Store;
}>;

export default createPluginFactoryV1<PrismaPluginOptions, PrismaPluginCtx>({
  name: 'prisma',
  watch: (baetaConfig, pluginConfig) => {
    const root = baetaConfig.graphql.modulesDir || 'src/modules';
    const modulesMatcher =
      root + '/*/' + (pluginConfig.schemaNamespace || 'prisma-schema') + '/**';

    const prismaModule = root + '/prisma' + '/**';

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
      modulesDir: params.ctx.config.graphql.modulesDir || 'src/modules',
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
