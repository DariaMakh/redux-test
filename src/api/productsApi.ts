import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], void>({
			query: () => ({
				url: 'products',
			}),
			providesTags: ['Products'],
		}),
		getSearchProducts: builder.query<Product[], string>({
			query: (search) => ({
				url: `products/search?query=${search}`,
			}),
		}),
		getProductByID: builder.query<Product, string>({
			query: (productId) => ({
				url: `products/${productId}`,
			}),
			// providesTags: (productId) => [{ type: 'Products', id: productId }],
		}),
		createProduct: builder.mutation<
			Product,
			Pick<
				Product,
				| 'name'
				| 'pictures'
				| 'description'
				| 'stock'
				| 'wight'
				| 'price'
				| 'discount'
				| 'available'
			>
		>({
			query: ({ ...body }) => ({
				url: 'products',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Products'],
		}),
		createProductReview: builder.mutation<
			Product,
			{ productId: string; body: { text: string } }
		>({
			query: ({ productId, body }) => ({
				url: `/products/review/${productId}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetSearchProductsQuery,
	useGetProductByIDQuery,
	useCreateProductMutation,
	useCreateProductReviewMutation,
} = productsApi;
