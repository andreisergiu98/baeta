export interface PrismaPluginOptions {
	generateClient?: boolean;
	generateCommand?: string;
	prismaSchema: string;
	generatedSchemaPath: string;
}
