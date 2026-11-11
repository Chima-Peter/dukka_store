import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductTypes, CartTypes } from "../../types/cart_type";
import type { CartView } from "@/types/api";
import { getProductPlaceholder } from "@/utils/product_placeholders";

const initialState: CartTypes = {
    cart: [],
    total: 0,
    server_cart_id: null,
    market_id: null,
};

function recalculateTotal(cart: CartProductTypes[]) {
    return cart.reduce(
        (sum, item) =>
            sum +
            Math.max(Number(item.price) - Number(item.discount_amount ?? 0), 0) *
                (item.quantity || 1),
        0,
    );
}

export function mapCartViewToState(view: CartView): CartTypes {
    const cart = (view.items ?? []).map((item) => ({
        id: item.id,
        name: item.product_name,
        image:
            item.product_image ||
            getProductPlaceholder(item.market_variant_id || item.product_name),
        price: Number(item.price ?? 0),
        quantity: item.quantity,
        market_variant_id: item.market_variant_id,
        discount_amount: Number(item.discount_amount ?? 0),
        currency: item.currency,
        sold_out: item.sold_out,
        product_specs: item.product_specs,
    }));
    const serverTotal = Number(view.total ?? 0);
    return {
        server_cart_id: view.id,
        total: serverTotal > 0 ? serverTotal : recalculateTotal(cart),
        market_id: view.market_id,
        cart,
    };
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setCartFromServer: (state, action: PayloadAction<CartView>) => {
            const mapped = mapCartViewToState(action.payload);
            state.cart = mapped.cart;
            state.total = mapped.total;
            state.server_cart_id = mapped.server_cart_id;
            state.market_id = mapped.market_id;
        },
        clearCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.server_cart_id = null;
            state.market_id = null;
        },
        restoreCartSnapshot: (state, action: PayloadAction<CartTypes>) => {
            state.cart = action.payload.cart.map((item) => ({ ...item }));
            state.total = action.payload.total ?? 0;
            state.server_cart_id = action.payload.server_cart_id ?? null;
            state.market_id = action.payload.market_id ?? null;
        },
        addToCart: (state, action: PayloadAction<CartProductTypes>) => {
            const key = action.payload.market_variant_id || action.payload.name;
            const item = state.cart.find(
                (entry) =>
                    (entry.market_variant_id &&
                        entry.market_variant_id === action.payload.market_variant_id) ||
                    entry.name === action.payload.name,
            );

            if (item) {
                item.quantity += action.payload.quantity ?? 1;
            } else {
                state.cart.push({
                    ...action.payload,
                    quantity: action.payload.quantity ?? 1,
                    id: action.payload.id ?? key,
                });
            }

            state.total = recalculateTotal(state.cart);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(
                (item) =>
                    item.id !== action.payload &&
                    item.name !== action.payload &&
                    item.market_variant_id !== action.payload,
            );
            state.total = recalculateTotal(state.cart);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ name: string; quantity: number; id?: string }>,
        ) => {
            const item = state.cart.find(
                (entry) =>
                    entry.id === action.payload.id ||
                    entry.name === action.payload.name ||
                    entry.market_variant_id === action.payload.name,
            );
            if (item) {
                item.quantity = action.payload.quantity;
                state.total = recalculateTotal(state.cart);
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    setCartFromServer,
    clearCart,
    restoreCartSnapshot,
} = cartSlice.actions;

export default cartSlice.reducer;
