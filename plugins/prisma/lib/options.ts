export interface PrismaPluginOptions {
  prismaSchema: string;
  generateClient?: boolean;
  generateCommand?: string;
  generatedSchemaPath?: string;
}
