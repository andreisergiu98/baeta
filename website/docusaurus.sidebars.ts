const typedocSidebar = require('./docs/api/typedoc-sidebar.cjs');

export function injectTypeDocSidebar(sidebar) {
	return sidebar.map((item) => {
		if (item?.link?.id === 'api/index') {
			return {
				...item,
				label: 'API',
				items: typedocSidebar,
			};
		}
		return item;
	});
}
