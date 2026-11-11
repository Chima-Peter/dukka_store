import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    CategoryPage,
    MarketSearchMatch,
    OpenMarket,
    ProductDetail,
    ProductListPage,
    ProductSuggestionsPage,
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
        getOpenMarkets: builder.query<OpenMarket[], void>({
            query: () => "/markets/open",
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
        getProductSuggestions: builder.query<
            ProductSuggestionsPage,
            {
                q: string;
                market_id?: string;
                limit?: number;
            }
        >({
            query: (params) => ({
                url: "/products/suggestions",
                params,
            }),
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
    useGetOpenMarketsQuery,
    useGetProductsQuery,
    useGetProductSuggestionsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetServiceStatesQuery,
} = CatalogApi;
