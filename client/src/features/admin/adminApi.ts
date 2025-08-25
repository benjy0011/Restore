import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Product } from "../../app/models/product";
import type { CreateProductSchema } from "../../lib/schemas/createProductSchema";

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, CreateProductSchema>({
      query: (data: CreateProductSchema) => {
        return {
          url: 'products',
          method: 'POST',
          body: data,
        }
      }
    }),
    updateProduct: builder.mutation<void, {id: number, data: CreateProductSchema}>({
      query: ({id, data}) => {
        return {
          url: 'products',
          method: 'PUT',
          body: {...data, id},
        }
      }
    }),
  })
})

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
} = adminApi;