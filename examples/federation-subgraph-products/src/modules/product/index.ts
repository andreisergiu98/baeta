import { ProductModule } from './typedef.ts';

const { Product, Query } = ProductModule;

const ProductResolver = Product.$fields({
	id: Product.id.key('id'),
	name: Product.name.key('name'),
	price: Product.price.key('price'),
	owner: Product.owner.key('owner'),
});

const QueryResolver = Query.$fields({
	product: Query.product.resolve(({ args }) => {
		return {
			__typename: 'Product',
			id: args.id,
			name: `Product ${args.id}`,
			price: 9.99,
			owner: {
				id: '1',
			},
		};
	}),
});

export default ProductModule.$schema({
	Product: ProductResolver,
	Query: QueryResolver,
});
