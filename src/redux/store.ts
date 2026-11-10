"use client"

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import cartReducer from './features/cart_slice'
import authReducer from './features/authentication_slice'
import { AuthApi } from "./services/authentication_api";
import { CustomerApi } from "./services/customer_api";
import { CatalogApi } from "./services/catalog_api";
import { CartApi } from "./services/cart_api";
import { CheckoutApi } from "./services/checkout_api";
import { OrdersApi } from "./services/orders_api";
import { ReviewsApi } from "./services/reviews_api";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [CustomerApi.reducerPath]: CustomerApi.reducer,
        [CatalogApi.reducerPath]: CatalogApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer,
        [CheckoutApi.reducerPath]: CheckoutApi.reducer,
        [OrdersApi.reducerPath]: OrdersApi.reducer,
        [ReviewsApi.reducerPath]: ReviewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            AuthApi.middleware,
            CustomerApi.middleware,
            CatalogApi.middleware,
            CartApi.middleware,
            CheckoutApi.middleware,
            OrdersApi.middleware,
            ReviewsApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
