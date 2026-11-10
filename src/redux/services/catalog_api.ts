import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    CategoryPage,
    MarketSearchMatch,
    ProductDetail,
    ProductListPage,
    ServiceStatePage,
} from "@/types/api";

export const CatalogApi = createApi({
    reducerPath: "catalogApi",
    baseQuery: dukkaBaseQuery,
    tagTypes: ["Products", "Categories", "Market"],
    endpoints: (builder) => ({
        searchMarket: builder.query<MarketSearchMatch | null, void>({
            query: () => "/markets/search",
            providesTags: ["Market"],
        }),
        getProducts: builder.query<
            ProductListPage,
            {
                market_id?: string;
                category_id?: string;
                name?: string;
                limit?: number;
                cursor?: string;
            }
        >({
            query: (params) => ({
                url: "/products",
                params,
            }),
            providesTags: ["Products"],
        }),
        getProduct: builder.query<ProductDetail, { id: string; market_id: string }>({
            query: ({ id, market_id }) => ({
                url: `/products/${id}`,
                params: { market_id },
            }),
        }),
        getCategories: builder.query<CategoryPage, { market_id: string }>({
            query: (params) => ({
                url: "/categories",
                params,
            }),
            providesTags: ["Categories"],
        }),
        getServiceStates: builder.query<ServiceStatePage, { market_id: string }>({
            query: (params) => ({
                url: "/service/states",
                params,
            }),
        }),
    }),
});

export const {
    useSearchMarketQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetServiceStatesQuery,
} = CatalogApi;
