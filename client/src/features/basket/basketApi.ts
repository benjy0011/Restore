import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { BasketItem, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";

// if return true, product is BasketItem type
function isBasketItem(product: Product | BasketItem): product is BasketItem  {
  return (product as BasketItem).quantity !== undefined; // look for the distinctive property for type check
}

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
    addBasketItem: builder.mutation<Basket, {product: Product | BasketItem, quantity: number}> ({ // mutation: changing the state
      query: ({product, quantity}) => {
        const productId = isBasketItem(product) ? product.productId : product.id;

        return { 
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: 'POST'
        }
      },
      onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => { // invalidate 'Basket' cache upon this action
        const patchResult = dispatch(
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const productId = isBasketItem(product) ? product.productId : product.id;
            const existingItem = draft.items.find(item => item.productId === productId);

            if (existingItem) existingItem.quantity += quantity;
            else draft.items.push(
              isBasketItem(product) 
              ? product
              : new BasketItem(product, quantity)
            );
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
      }),
      onQueryStarted: async ({productId, quantity}, {dispatch, queryFulfilled}) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const itemIndex = draft.items.findIndex(item => item.productId === productId);
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        )

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      }
    })
  })
})

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;