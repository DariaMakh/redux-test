import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsList, void>({
			query: () => ({
				url: 'products',
			}),
			providesTags: ['Products'],
		}),
		getSearchProducts: builder.mutation<ProductsList, { search: string }>({
			query: ({ search }) => ({
				url: `products/search?query=${search}`,
				method: 'GET',
			}),
		}),
		getProductByID: builder.mutation<Product, { productId: string }>({
			query: ({ productId }) => ({
				url: `products/${productId}`,
				method: 'GET',
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
	useGetProductByIDMutation,
	useGetSearchProductsMutation,
	useCreateProductMutation,
	useCreateProductReviewMutation,
} = productsApi;
