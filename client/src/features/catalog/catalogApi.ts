import { 
  createApi, 
  // fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParams } from "../../app/models/productParams";
import { filterEmptyValues } from "../../lib/util";
import type { Pagination } from "../../app/models/pagination";

export const catalogApi = createApi({
  reducerPath: 'catalogApi', // unique key for API
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://localhost:5001/api'
  // })
  baseQuery: baseQueryWithErrorHandling
  ,
  endpoints: (builder) => ({
    fetchProducts: builder.query<{items: Product[], pagination: Pagination}, ProductParams>({ // <output, input>
      query: (productParams) => {
        return {
          url: 'products',
          params: filterEmptyValues(productParams)
        }        
      },
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get('Pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        
        return {items, pagination};
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