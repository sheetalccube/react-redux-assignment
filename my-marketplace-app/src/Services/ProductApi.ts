import type { ApiResponse, Product } from "@/Types/commonTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: Product[]; total: number },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `products?_page=${page}&_per_page=${limit}`,
      transformResponse: (response: ApiResponse) => {
        return {
          data: response.data,
          total: response.items,
        };
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),

    addProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...rest }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
