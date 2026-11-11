import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type { PointsHistoryPage, PublicCustomer } from "@/types/api";

export const CustomerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Customer", "Points"],
    endpoints: (builder) => ({
        getMe: builder.query<PublicCustomer, void>({
            query: () => "/customer/me",
            providesTags: ["Customer"],
        }),
        updateCustomer: builder.mutation<
            PublicCustomer,
            {
                name?: string;
                phone_number?: string;
                date_of_birth?: string;
            }
        >({
            query: (body) => ({
                url: "/customer",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        setActiveMarket: builder.mutation<
            { active_market_id: string },
            { market_id: string }
        >({
            query: (body) => ({
                url: "/customer/active-market",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        getPointsHistory: builder.query<
            PointsHistoryPage,
            { limit?: number; cursor?: string; status?: string } | void
        >({
            query: (params) => ({
                url: "/points/history",
                params: params ?? undefined,
            }),
            providesTags: ["Points"],
        }),
    }),
});

export const {
    useGetMeQuery,
    useUpdateCustomerMutation,
    useSetActiveMarketMutation,
    useGetPointsHistoryQuery,
} = CustomerApi;
