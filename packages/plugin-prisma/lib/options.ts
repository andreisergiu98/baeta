/**
 * Configuration options for the Prisma plugin
 */
export interface PrismaPluginOptions {
	/**
	 * Whether to generate the Prisma client
	 * @default true
	 */
	generateClient?: boolean;

	/**
	 * Custom command to generate Prisma client
	 * @default 'prisma generate'
	 */
	generateCommand?: string;

	/**
	 * Path to the Prisma schema file
	 * @example 'prisma/schema.prisma'
	 */
	prismaSchema: string;

	/**
	 * Path to the generated schema file for comparison
	 * Used to avoid unnecessary regeneration
	 * @example 'node_modules/@prisma/client/schema.prisma'
	 */
	generatedSchemaPath: string;
}
