import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
    clearAuthTokens,
    getAccessToken,
    getRefreshToken,
    setAuthTokens,
} from "@/lib/cookies";
import type { ApiResponse, AuthTokens } from "@/types/api";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1/dukka",
    prepareHeaders: (headers) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

async function refreshAccessToken(): Promise<boolean> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const result = await rawBaseQuery(
        {
            url: "/authentication/customer/refresh",
            method: "POST",
            headers: { "x-refresh-token": refreshToken },
        },
        {} as never,
        {},
    );

    if (result.error) {
        clearAuthTokens();
        return false;
    }

    const envelope = result.data as ApiResponse<AuthTokens>;
    const tokens = envelope?.data ?? (result.data as AuthTokens);
    if (!tokens?.accessToken || !tokens?.refreshToken) {
        clearAuthTokens();
        return false;
    }

    setAuthTokens(tokens.accessToken, tokens.refreshToken);
    return true;
}

export const dukkaBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    if (result.data && typeof result.data === "object" && result.data !== null && "data" in result.data) {
        const envelope = result.data as ApiResponse;
        return { ...result, data: envelope.data };
    }

    return result;
};
