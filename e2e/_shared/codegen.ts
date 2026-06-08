import { readFile, writeFile } from 'node:fs/promises';
import type { CodegenConfig } from '@graphql-codegen/cli';

export function createCodegenConfig(config: {
	schema: string | string[];
	documents: string | string[];
	output?: string;
}): CodegenConfig {
	return {
		schema: config.schema,
		documents: config.documents,
		ignoreNoDocuments: true,
		importExtension: '.ts',
		generates: {
			[config.output ?? './src/__generated__/gql/']: {
				preset: 'client',
				config: {
					useTypeImports: true,
					enumsAsTypes: true,
				},
				presetConfig: {
					fragmentMasking: false,
				},
			},
		},
		hooks: {
			afterAllFileWrite: [
				async (...files: string[]) => {
					await Promise.all(files.map(patchDocumentNodeType));
				},
			],
		},
	};
}

async function patchDocumentNodeType(filePath: string) {
	const content = await readFile(filePath, 'utf-8');
	if (!content.includes('@graphql-typed-document-node/core')) {
		return;
	}
	await writeFile(
		filePath,
		content.replaceAll('@graphql-typed-document-node/core', '@baeta/e2e-shared/document-node'),
	);
}
