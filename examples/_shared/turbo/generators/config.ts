import type { PlopTypes } from '@turbo/gen';
import { buildGraphqlrcAction } from './grapgqlrc.ts';
import { buildSyncActions } from './sync.ts';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('examples', {
		description: 'Sync shared source files between examples',
		prompts: [],
		actions: () => [...buildSyncActions(), buildGraphqlrcAction()],
	});
}
