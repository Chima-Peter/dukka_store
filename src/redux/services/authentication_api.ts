import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignUpResponse, SignUpRequest, LoginResponse, LoginRequest } from "../../types/authentication_type";


// api for authenticating users
export const AuthApi = createApi({
    reducerPath: 'authApi',                     // name of api slice
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'        // define api url
    }),
    endpoints: (builder) => ({                  // define endpoints

        postSignUp: builder.mutation<SignUpResponse, SignUpRequest>({     // endpoint for posting signup request
            query:(data: SignUpRequest) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),

        postLogin: builder.mutation<LoginResponse, LoginRequest>({        // endpoint for posting signin request
            query:(data: LoginRequest) => ({
                url: '/signin',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    usePostSignUpMutation, usePostLoginMutation
} = AuthApi