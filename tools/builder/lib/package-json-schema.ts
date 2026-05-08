import { z } from 'zod';

export const PkgExportSchema = z
	.object({
		types: z.string(),
		require: z.string().optional(),
		default: z.string(),
	})
	.strict();

export type PkgExport = z.infer<typeof PkgExportSchema>;

export const PkgExportsSchema = z.record(z.string(), PkgExportSchema);

export type PkgExports = z.infer<typeof PkgExportsSchema>;

export const PkgBinSchema = z.union([z.string(), z.record(z.string(), z.string())]).optional();

export type PkgBin = z.infer<typeof PkgBinSchema>;

export const PkgSchema = z.looseObject({
	name: z.string(),
	type: z.string().optional(),
	files: z.array(z.string()).optional(),
	main: z.string().optional(),
	module: z.string().optional(),
	bin: PkgBinSchema.optional(),
	sideEffects: z.boolean().optional(),
	private: z.boolean().optional(),
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

export type Pkg = z.infer<typeof PkgSchema>;
