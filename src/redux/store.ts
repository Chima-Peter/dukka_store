"use client"

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import cartReducer from './features/cart_slice'
import authReducer from './features/authentication_slice'
import { AuthApi } from "./services/authentication_api";


const store = configureStore({
    reducer: {
        cart: cartReducer, // add cart slice to store
        auth: authReducer,


        [AuthApi.reducerPath]: AuthApi.reducer // slice for authentication state
    },
     // middleware to add the redux api middleware we defined above to our default redux middleware so it can be run with it
     middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
})

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;