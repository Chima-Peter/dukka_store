import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductTypes, CartTypes } from "../../types/cart_type";

const initialState: CartTypes = {
    cart: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        // Add an item to the cart
        addToCart: (state, action: PayloadAction<CartProductTypes>) => {
            // Check if the product already exists in the cart
            const item = state.cart.find((item) => item.name === action.payload.name);
        
            if (item) {
                // Update the quantity only if a new quantity is provided
                item.quantity += action.payload.quantity ?? 1;
            } else {
                // Ensure quantity is at least 1 before adding the item
                state.cart.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
            }
        
            // Recalculate total price
            state.total = state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        },
        

        // Remove an item from the cart by name
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item.name !== action.payload);
            state.total = state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        },

        // Update the quantity of an item in the cart
        updateQuantity: (state, action: PayloadAction<{ name: string; quantity: number }>) => {
            const item = state.cart.find((item) => item.name === action.payload.name);
            if (item) {
                item.quantity = action.payload.quantity;
                state.total = state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

