import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationType } from "../../types/authentication_type";

const initialState: AuthenticationType = {
    isAuthenticated: false,
    email: "",
    first_name: "",
    full_name: "",
    cart_id: null,
    customer_id: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthenticationType>) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.full_name = action.payload.full_name;
            state.first_name =
                action.payload.first_name ||
                action.payload.full_name?.split(" ")[0] ||
                "";
            state.cart_id = action.payload.cart_id ?? null;
            state.customer_id = action.payload.customer_id;
        },
        signup: (state, payload: PayloadAction<AuthenticationType>) => {
            state.isAuthenticated = true;
            state.email = payload.payload.email;
            state.first_name =
                payload.payload.full_name?.split(" ")[0] ||
                payload.payload.first_name ||
                "";
            state.full_name = payload.payload.full_name;
            state.cart_id = payload.payload.cart_id ?? null;
            state.customer_id = payload.payload.customer_id;
        },
        login: (state, payload: PayloadAction<AuthenticationType>) => {
            state.isAuthenticated = true;
            state.email = payload.payload.email;
            state.full_name = payload.payload.full_name;
            state.first_name =
                payload.payload.first_name ||
                payload.payload.full_name?.split(" ")[0] ||
                payload.payload.email?.split("@")[0] ||
                "";
            state.cart_id = payload.payload.cart_id ?? null;
            state.customer_id = payload.payload.customer_id;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.email = "";
            state.first_name = "";
            state.full_name = "";
            state.cart_id = null;
            state.customer_id = undefined;
        },
    },
});

export const { signup, login, logout, setAuth } = authSlice.actions;

export default authSlice.reducer;
