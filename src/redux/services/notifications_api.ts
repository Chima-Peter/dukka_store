import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type { NotificationItem, NotificationsPage } from "@/types/api";

export const NotificationsApi = createApi({
    reducerPath: "notificationsApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Notifications"],
    endpoints: (builder) => ({
        getNotifications: builder.query<
            NotificationsPage,
            { limit?: number; cursor?: string; has_read?: boolean } | void
        >({
            query: (params) => ({
                url: "/notifications",
                params: params ?? undefined,
            }),
            providesTags: ["Notifications"],
        }),
        markNotificationsRead: builder.mutation<
            NotificationItem[],
            { ids: string[] }
        >({
            query: (body) => ({
                url: "/notifications/read",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkNotificationsReadMutation,
} = NotificationsApi;
