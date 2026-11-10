import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    AddCartItemRequest,
    AddGuestCartItemRequest,
    CartView,
} from "@/types/api";

export const CartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getCustomerCart: builder.query<CartView, void>({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),
        getGuestCart: builder.query<CartView, string>({
            query: (id) => `/cart/guest/${id}`,
            providesTags: ["Cart"],
        }),
        addCustomerItem: builder.mutation<CartView, AddCartItemRequest>({
            query: (body) => ({
                url: "/cart/items",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        addGuestItem: builder.mutation<CartView, AddGuestCartItemRequest>({
            query: (body) => ({
                url: "/cart/guest/items",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCustomerItem: builder.mutation<
            CartView,
            { id: string; quantity: number }
        >({
            query: ({ id, quantity }) => ({
                url: `/cart/items/${id}`,
                method: "PATCH",
                body: { quantity },
            }),
            invalidatesTags: ["Cart"],
        }),
        updateGuestItem: builder.mutation<
            CartView,
            { id: string; cart_id: string; quantity: number }
        >({
            query: ({ id, cart_id, quantity }) => ({
                url: `/cart/guest/items/${id}`,
                method: "PATCH",
                body: { cart_id, quantity },
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteCustomerItems: builder.mutation<CartView, { item_ids: string[] }>({
            query: (body) => ({
                url: "/cart/items",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteGuestItems: builder.mutation<
            CartView,
            { cart_id: string; item_ids: string[] }
        >({
            query: (body) => ({
                url: "/cart/guest/items",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCustomerCartQuery,
    useGetGuestCartQuery,
    useLazyGetCustomerCartQuery,
    useLazyGetGuestCartQuery,
    useAddCustomerItemMutation,
    useAddGuestItemMutation,
    useUpdateCustomerItemMutation,
    useUpdateGuestItemMutation,
    useDeleteCustomerItemsMutation,
    useDeleteGuestItemsMutation,
} = CartApi;
