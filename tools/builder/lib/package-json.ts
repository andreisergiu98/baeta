import fs from 'node:fs/promises';
import { z } from 'zod';

export const PkgExportSchema = z
	.object({
		types: z.string(),
		default: z.string(),
	})
	.strict();

export const PkgExportsSchema = z.record(z.string(), PkgExportSchema);

export const PkgBinSchema = z.union([z.string(), z.record(z.string(), z.string())]).optional();

export const PackageJSONSchema = z.looseObject({
	name: z.string(),
	type: z.string().optional(),
	files: z.array(z.string()).optional(),
	main: z.string().optional(),
	module: z.string().optional(),
	bin: PkgBinSchema.optional(),
	sideEffects: z.boolean().optional(),
	exports: PkgExportsSchema.optional(),
	publishConfig: z
		.object({
			bin: PkgBinSchema.optional(),
			exports: PkgExportsSchema,
		})
		.optional(),
	dependencies: z.record(z.string(), z.string().optional()).optional(),
	devDependencies: z.record(z.string(), z.string().optional()).optional(),
	peerDependencies: z.record(z.string(), z.string().optional()).optional(),
});

export type Pkg = z.infer<typeof PackageJSONSchema>;
export type PkgExport = z.infer<typeof PkgExportSchema>;
export type PkgExports = z.infer<typeof PkgExportsSchema>;

export async function loadPackageJson(file = `${process.cwd()}/package.json`): Promise<Pkg> {
	try {
		const content = await fs.readFile(file, 'utf-8');
		return PackageJSONSchema.parse(JSON.parse(content));
	} catch (error) {
		throw new Error(`Error loading package.json at ${file}: ${error}`);
	}
}
