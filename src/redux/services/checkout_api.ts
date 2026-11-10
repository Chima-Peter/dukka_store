import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    AddressRecord,
    CheckoutRequest,
    CheckoutResult,
    CreateAddressRequest,
    PaymentMethod,
} from "@/types/api";

export const CheckoutApi = createApi({
    reducerPath: "checkoutApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Addresses", "PaymentMethods"],
    endpoints: (builder) => ({
        createShippingAddress: builder.mutation<AddressRecord, CreateAddressRequest>({
            query: (body) => ({
                url: "/address/shipping",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Addresses"],
        }),
        createBillingAddress: builder.mutation<AddressRecord, CreateAddressRequest>({
            query: (body) => ({
                url: "/address/billing",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Addresses"],
        }),
        getPaymentMethods: builder.query<
            { items?: PaymentMethod[] } | PaymentMethod[],
            void
        >({
            query: () => "/payments/methods",
            providesTags: ["PaymentMethods"],
        }),
        getPrecheckout: builder.query<unknown, { cart_id?: string } | void>({
            query: (params) => ({
                url: "/checkout/precheckout",
                params: params ?? undefined,
            }),
        }),
        checkout: builder.mutation<CheckoutResult, CheckoutRequest>({
            query: (body) => ({
                url: "/checkout",
                method: "POST",
                body,
                headers: {
                    "X-Idempotency-Key":
                        typeof crypto !== "undefined" && "randomUUID" in crypto
                            ? crypto.randomUUID()
                            : `${Date.now()}`,
                },
            }),
        }),
    }),
});

export const {
    useCreateShippingAddressMutation,
    useCreateBillingAddressMutation,
    useGetPaymentMethodsQuery,
    useGetPrecheckoutQuery,
    useLazyGetPrecheckoutQuery,
    useCheckoutMutation,
} = CheckoutApi;
