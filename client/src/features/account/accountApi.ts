import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../../app/api/baseApi"
import type { Address, User } from "../../app/models/user"
import type { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
  reducerPath: "accountApi", // key for accountApi rtk query
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginSchema>({
      query: (creds) => {
        return {
          url: 'login?useCookies=true',
          method: 'POST',
          body: creds
        }
      },
      async onQueryStarted(_, {dispatch, queryFulfilled} ) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(['UserInfo']))
        } catch (error) {
          console.log(error);
        }
      }
    }),
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: 'account/register',
          method: 'POST',
          body: creds
        }
      },
      async onQueryStarted(_, {queryFulfilled} ) {
        try {
          await queryFulfilled;
          toast.success("Registration successful - you can now sign in!");
          router.navigate('/login');
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }),
    userInfo: builder.query<User, void>({
      query: () => 'account/user-info',
      providesTags: ['UserInfo']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'account/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled} ) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(['UserInfo']))
        router.navigate('/');
      }
    }),
    fetchAddress: builder.query<Address, void>({
      query: () => ({
        url: 'account/address'
      })
    }),
    updateUserAddress: builder.mutation<Address, Address>({
      query: (address) => ({
        url: 'account/address',
        method: 'POST',
        body: address
      }),
      onQueryStarted: async (address, {dispatch, queryFulfilled}) => {
        const patchResult = dispatch(
          accountApi.util.updateQueryData('fetchAddress', undefined, (draft) => {
            Object.assign(draft, {...address})
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
          toast.error("Error in updating address.")
        }
      }
    }),
  })
});


export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useLazyUserInfoQuery,
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} = accountApi;