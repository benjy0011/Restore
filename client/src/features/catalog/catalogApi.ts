import { 
  createApi, 
  // fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://localhost:5001/api'
  // })
  baseQuery: baseQueryWithErrorHandling
  ,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({ // <output, input>
      query: () => ({ url: 'products' })
    })
    ,
    fetchProductDetail: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` })
    })
  })
});

export const {
  useFetchProductDetailQuery,
  useFetchProductsQuery
} = catalogApi;