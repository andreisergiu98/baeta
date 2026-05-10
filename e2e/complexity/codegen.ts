import { createCodegenConfig } from '@baeta/e2e-shared/codegen';

export default createCodegenConfig({
	schema: 'src/**/*.gql',
	documents: ['*.test.ts'],
});
