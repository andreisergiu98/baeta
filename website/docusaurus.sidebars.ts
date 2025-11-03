import type { Options } from '@docusaurus/plugin-content-docs';
import typedocSidebarCurrent from './docs/api/typedoc-sidebar.ts';
import typedocSidebarV1_0 from './versioned_docs/version-1.0/api/typedoc-sidebar.ts';

type SidebarItems = Awaited<ReturnType<Required<Options>['sidebarItemsGenerator']>>;

export function getItemsByVersion(version: string) {
	switch (version) {
		case 'current':
			return typedocSidebarCurrent;
		case '1.0':
			return typedocSidebarV1_0;
		default:
			throw new Error(`Sidebar not configured for version ${version}`);
	}
}

export function injectTypeDocSidebar(items: SidebarItems, version: string) {
	return items.map((item) => {
		if (item.type === 'category' && item.link?.type === 'doc' && item.link.id === 'api/index') {
			return {
				...item,
				...getItemsByVersion(version),
				label: 'API',
			};
		}
		return item;
	});
}
