import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type { ReviewPage } from "@/types/api";

export const ReviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        getReviews: builder.query<
            ReviewPage,
            { market_variant_id: string; limit?: number; cursor?: string }
        >({
            query: (params) => ({
                url: "/reviews",
                params,
            }),
            providesTags: ["Reviews"],
        }),
        createReview: builder.mutation<
            unknown,
            {
                market_variant_id: string;
                title: string;
                review: string;
                rating: number;
            }
        >({
            query: (body) => ({
                url: "/reviews",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Reviews"],
        }),
    }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = ReviewsApi;
