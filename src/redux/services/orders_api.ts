import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type { OrderDetail, OrderSummaryPage } from "@/types/api";

export const OrdersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrders: builder.query<OrderSummaryPage, { cursor?: string; limit?: number } | void>({
            query: (params) => ({
                url: "/orders",
                params: params ?? undefined,
            }),
            providesTags: ["Orders"],
        }),
        getOrder: builder.query<OrderDetail, string>({
            query: (id) => `/orders/${id}`,
            providesTags: ["Orders"],
        }),
        cancelOrder: builder.mutation<unknown, string>({
            query: (id) => ({
                url: `/orders/${id}/cancel`,
                method: "POST",
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCancelOrderMutation,
} = OrdersApi;
