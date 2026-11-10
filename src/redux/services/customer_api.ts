import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type { PublicCustomer } from "@/types/api";

export const CustomerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        getMe: builder.query<PublicCustomer, void>({
            query: () => "/customer/me",
            providesTags: ["Customer"],
        }),
        updateCustomer: builder.mutation<PublicCustomer, { name?: string }>({
            query: (body) => ({
                url: "/customer",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
        setActiveMarket: builder.mutation<PublicCustomer, { market_id: string }>({
            query: (body) => ({
                url: "/customer/active-market",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Customer"],
        }),
    }),
});

export const {
    useGetMeQuery,
    useUpdateCustomerMutation,
    useSetActiveMarketMutation,
} = CustomerApi;
