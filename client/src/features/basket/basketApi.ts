import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { BasketItem, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";

export const basketApi = createApi({
  reducerPath: 'basketApi'
  ,
  baseQuery: baseQueryWithErrorHandling
  ,
  tagTypes: ['Basket'] // add a cache tag to this BasketApi
  ,
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => 'basket',
      providesTags: ['Basket'],
    }),
    addBasketItem: builder.mutation<Basket, {product: Product, quantity: number}> ({ // mutation: changing the state
      query: ({product, quantity}) => ({ 
        url: `basket?productId=${product.id}&quantity=${quantity}`,
        method: 'POST'
      }),
      onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => { // invalidate 'Basket' cache upon this action
        const patchResult = dispatch(
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const existingItem = draft.items.find(item => item.productId === product.id);
            if (existingItem) existingItem.quantity += quantity;
            else draft.items.push(new BasketItem(product, quantity));
          })
        )
        
        try {
          await queryFulfilled;
          // dispatch(basketApi.util.invalidateTags(['Basket']))  // removed as we directly update the existing/cached data
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      }
    }),
    removeBasketItem: builder.mutation<void, {productId: number, quantity: number}> ({
      query: ({productId, quantity}) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
} = basketApi;