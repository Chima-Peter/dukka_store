import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    AddressRecord,
    CreateAddressRequest,
    UpdateAddressRequest,
} from "@/types/api";
import { CustomerApi } from "./customer_api";

const invalidateCustomerProfile = async (
    _: unknown,
    {
        dispatch,
        queryFulfilled,
    }: {
        dispatch: (action: unknown) => void;
        queryFulfilled: Promise<unknown>;
    },
) => {
    try {
        await queryFulfilled;
        dispatch(CustomerApi.util.invalidateTags(["Customer"]));
    } catch {
        // mutation error already surfaced by RTK Query
    }
};

export const AddressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["ShippingAddresses", "BillingAddresses"],
    endpoints: (builder) => ({
        getShippingAddresses: builder.query<AddressRecord[], void>({
            query: () => "/address/shipping",
            providesTags: ["ShippingAddresses"],
        }),
        createShippingAddress: builder.mutation<AddressRecord, CreateAddressRequest>({
            query: (body) => ({
                url: "/address/shipping",
                method: "POST",
                body,
            }),
            invalidatesTags: ["ShippingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
        updateShippingAddress: builder.mutation<
            AddressRecord,
            { id: string; body: UpdateAddressRequest }
        >({
            query: ({ id, body }) => ({
                url: `/address/shipping/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["ShippingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
        deleteShippingAddress: builder.mutation<{ data: null } | null, string>({
            query: (id) => ({
                url: `/address/shipping/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ShippingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
        getBillingAddresses: builder.query<AddressRecord[], void>({
            query: () => "/address/billing",
            providesTags: ["BillingAddresses"],
        }),
        createBillingAddress: builder.mutation<AddressRecord, CreateAddressRequest>({
            query: (body) => ({
                url: "/address/billing",
                method: "POST",
                body,
            }),
            invalidatesTags: ["BillingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
        updateBillingAddress: builder.mutation<
            AddressRecord,
            { id: string; body: UpdateAddressRequest }
        >({
            query: ({ id, body }) => ({
                url: `/address/billing/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["BillingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
        deleteBillingAddress: builder.mutation<{ data: null } | null, string>({
            query: (id) => ({
                url: `/address/billing/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BillingAddresses"],
            onQueryStarted: invalidateCustomerProfile,
        }),
    }),
});

export const {
    useGetShippingAddressesQuery,
    useCreateShippingAddressMutation,
    useUpdateShippingAddressMutation,
    useDeleteShippingAddressMutation,
    useGetBillingAddressesQuery,
    useCreateBillingAddressMutation,
    useUpdateBillingAddressMutation,
    useDeleteBillingAddressMutation,
} = AddressApi;
