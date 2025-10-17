import type { Options } from '@docusaurus/plugin-content-docs';
import typedocSidebar from './docs/api/typedoc-sidebar.ts';

type SidebarItems = Awaited<ReturnType<Required<Options>['sidebarItemsGenerator']>>;

export function injectTypeDocSidebar(items: SidebarItems) {
	return items.map((item) => {
		if (item.type === 'category' && item.link?.type === 'doc' && item.link.id === 'api/index') {
			return {
				...item,
				...typedocSidebar,
				label: 'API',
			};
		}
		return item;
	});
}
