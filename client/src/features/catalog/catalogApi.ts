import { 
  createApi, 
  // fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParams } from "../../app/models/productParams";
import { filterEmptyValues } from "../../lib/util";

export const catalogApi = createApi({
  reducerPath: 'catalogApi', // unique key for API
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://localhost:5001/api'
  // })
  baseQuery: baseQueryWithErrorHandling
  ,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], ProductParams>({ // <output, input>
      query: (productParams) => {
        return {
          url: 'products',
          params: filterEmptyValues(productParams)
        }        
      }
    })
    ,
    fetchProductDetail: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` })
    }),
    fetchFilters: builder.query<{brands: string[], types: string[]}, void>({
      query: () => 'products/filters'
    })
  })
});

export const {
  useFetchProductDetailQuery,
  useFetchProductsQuery,
  useFetchFiltersQuery
} = catalogApi;