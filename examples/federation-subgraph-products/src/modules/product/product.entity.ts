import type { ProductEntityHandler } from '../../__generated__/federation.ts';

export const handleProductEntity: ProductEntityHandler = async (representation) => {
	return {
		__typename: 'Product',
		id: representation.id,
		name: `Product ${representation.id}`,
		price: 9.99,
		owner: {
			id: '1',
		},
	};
};
