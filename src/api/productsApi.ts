import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getSearchProducts: builder.query<Product[], string>({
			query: (search) => ({
				url: `products/search?query=${search}`,
			}),
			providesTags: ['Products'],
		}),
		getProductByID: builder.query<Product, string>({
			query: (productId) => ({
				url: `products/${productId}`,
			}),
			providesTags: (result) => [{ type: 'Products', id: `${result?._id}` }],
		}),
		changeFavoriteProduct: builder.mutation<
			Product,
			{ id: string; like: boolean }
		>({
			query: ({ id, like }) => ({
				url: `products/likes/${id}`,
				method: like ? 'DELETE' : 'PUT',
			}),
			invalidatesTags: () => [{ type: 'Products' }],
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
	useGetSearchProductsQuery,
	useGetProductByIDQuery,
	useCreateProductMutation,
	useCreateProductReviewMutation,
	useChangeFavoriteProductMutation,
} = productsApi;
