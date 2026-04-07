import type { PlopTypes } from '@turbo/gen';
import { buildSyncActions } from './sync.ts';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('e2e', {
		description: 'Sync shared modules into e2e test fixtures',
		prompts: [],
		actions: () => buildSyncActions(),
	});
}
