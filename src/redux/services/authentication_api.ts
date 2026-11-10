import { createApi } from "@reduxjs/toolkit/query/react";
import { dukkaBaseQuery } from "./base_query";
import type {
    LoginData,
    LoginRequest,
    PublicCustomer,
    RegisterRequest,
} from "@/types/api";
import { getRefreshToken } from "@/lib/cookies";

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: dukkaBaseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<PublicCustomer, RegisterRequest>({
            query: (body) => ({
                url: "/authentication/customer/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<LoginData, LoginRequest>({
            query: (body) => ({
                url: "/authentication/customer/login",
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation<null, void>({
            query: () => ({
                url: "/authentication/customer/logout",
                method: "POST",
                headers: {
                    "x-refresh-token": getRefreshToken() ?? "",
                },
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = AuthApi;

/** @deprecated use useLoginMutation / useRegisterMutation */
export const usePostSignUpMutation = useRegisterMutation;
/** @deprecated use useLoginMutation */
export const usePostLoginMutation = useLoginMutation;
