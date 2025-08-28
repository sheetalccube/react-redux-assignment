import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
export interface response {
  data: Product[];
  first: number;
  last: number;
  pages: number;
  items: number;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: Product[]; total: number }, // Result type
      { page: number; limit: number } // Arg type
    >({
      query: ({ page, limit }) => `products?_page=${page}&_per_page=${limit}`,
      transformResponse: (response: Response) => {
        return {
          data: response?.data,
          total: response.items,
        };
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
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
