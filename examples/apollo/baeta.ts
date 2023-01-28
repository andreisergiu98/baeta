import { defineConfig } from '@baeta/cli';
import { prismaPlugin } from '@baeta/plugin-prisma';

export default defineConfig({
  graphql: {
    schemas: ['src/**/*.gql'],
    modulesDir: 'src/modules',
    baseTypesPath: 'src/__generated__/types.ts',
    contextType: 'src/types/context#Context',
    scalars: {
      DateTime: 'Date',
    },
  },
  compiler: {
    src: './src/app',
    dist: './dist',
    bundleWorkspaces: true,
    esbuild: {
      format: 'cjs',
    },
  },
  plugins: [
    prismaPlugin({
      prismaSchema: 'schema.prisma',
      generateCommand: 'yarn prisma generate',
      generatedSchemaPath: 'src/__generated__/prisma/schema.prisma',
    }),
  ],
});
