"use client";

import { useCallback } from "react";
import {
    useAddCustomerItemMutation,
    useAddGuestItemMutation,
    useDeleteCustomerItemsMutation,
    useDeleteGuestItemsMutation,
    useUpdateCustomerItemMutation,
    useUpdateGuestItemMutation,
} from "@/redux/services/cart_api";
import {
    addToCart,
    removeFromCart,
    restoreCartSnapshot,
    setCartFromServer,
    updateQuantity,
} from "@/redux/features/cart_slice";
import store, { useAppDispatch, useAppSelector } from "@/redux/store";
import {
    clearGuestCartId,
    getAccessToken,
    getGuestCartId,
    setGuestCartId,
} from "@/lib/cookies";
import type { CartView } from "@/types/api";
import type { CartProductTypes, CartTypes } from "@/types/cart_type";
import { getProductPlaceholder } from "@/utils/product_placeholders";

export type AddItemPreview = {
    name?: string;
    image?: string;
    price?: number;
    currency?: string | null;
};

function snapshotCart(state: CartTypes): CartTypes {
    return {
        cart: state.cart.map((item) => ({ ...item })),
        total: state.total,
        server_cart_id: state.server_cart_id,
        market_id: state.market_id,
    };
}

export function useCartActions() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const [addCustomerItem] = useAddCustomerItemMutation();
    const [addGuestItem] = useAddGuestItemMutation();
    const [updateCustomerItem] = useUpdateCustomerItemMutation();
    const [updateGuestItem] = useUpdateGuestItemMutation();
    const [deleteCustomerItems] = useDeleteCustomerItemsMutation();
    const [deleteGuestItems] = useDeleteGuestItemsMutation();

    const applyCart = useCallback(
        (cart: CartView) => {
            dispatch(setCartFromServer(cart));
            if (!getAccessToken() && cart.id) {
                setGuestCartId(cart.id);
            }
        },
        [dispatch],
    );

    const addItem = useCallback(
        async (
            market_variant_id: string,
            quantity = 1,
            preview?: AddItemPreview,
        ) => {
            if (!market_variant_id) {
                throw new Error("Missing market variant");
            }

            const previous = snapshotCart(store.getState().cart);
            const existing = previous.cart.find(
                (item) => item.market_variant_id === market_variant_id,
            );

            const optimisticItem: CartProductTypes = {
                id: existing?.id || `optimistic-${market_variant_id}`,
                market_variant_id,
                name: preview?.name || existing?.name || "Product",
                image:
                    preview?.image ||
                    existing?.image ||
                    getProductPlaceholder(market_variant_id),
                price: preview?.price ?? existing?.price ?? 0,
                currency: preview?.currency ?? existing?.currency ?? undefined,
                quantity,
                discount_amount: existing?.discount_amount ?? 0,
            };

            dispatch(addToCart(optimisticItem));

            try {
                if (isAuthenticated || getAccessToken()) {
                    clearGuestCartId();
                    const cart = await addCustomerItem({
                        market_variant_id,
                        quantity,
                    }).unwrap();
                    applyCart(cart);
                    return cart;
                }

                const cart = await addGuestItem({
                    cart_id: getGuestCartId(),
                    market_variant_id,
                    quantity,
                }).unwrap();
                applyCart(cart);
                return cart;
            } catch (error) {
                dispatch(restoreCartSnapshot(previous));
                throw error;
            }
        },
        [addCustomerItem, addGuestItem, applyCart, dispatch, isAuthenticated],
    );

    const setQuantity = useCallback(
        async (itemId: string, quantity: number) => {
            const previous = snapshotCart(store.getState().cart);
            const target = previous.cart.find((item) => item.id === itemId);
            if (target) {
                dispatch(
                    updateQuantity({
                        id: itemId,
                        name: target.name,
                        quantity,
                    }),
                );
            }

            try {
                if (isAuthenticated || getAccessToken()) {
                    const cart = await updateCustomerItem({
                        id: itemId,
                        quantity,
                    }).unwrap();
                    applyCart(cart);
                    return cart;
                }

                const guestCartId = getGuestCartId();
                if (!guestCartId) throw new Error("Missing guest cart");
                const cart = await updateGuestItem({
                    id: itemId,
                    cart_id: guestCartId,
                    quantity,
                }).unwrap();
                applyCart(cart);
                return cart;
            } catch (error) {
                dispatch(restoreCartSnapshot(previous));
                throw error;
            }
        },
        [
            applyCart,
            dispatch,
            isAuthenticated,
            updateCustomerItem,
            updateGuestItem,
        ],
    );

    const removeItems = useCallback(
        async (itemIds: string[]) => {
            if (!itemIds.length) return;
            const previous = snapshotCart(store.getState().cart);
            for (const id of itemIds) {
                dispatch(removeFromCart(id));
            }

            try {
                if (isAuthenticated || getAccessToken()) {
                    const cart = await deleteCustomerItems({
                        item_ids: itemIds,
                    }).unwrap();
                    applyCart(cart);
                    return cart;
                }

                const guestCartId = getGuestCartId();
                if (!guestCartId) throw new Error("Missing guest cart");
                const cart = await deleteGuestItems({
                    cart_id: guestCartId,
                    item_ids: itemIds,
                }).unwrap();
                applyCart(cart);
                return cart;
            } catch (error) {
                dispatch(restoreCartSnapshot(previous));
                throw error;
            }
        },
        [
            applyCart,
            deleteCustomerItems,
            deleteGuestItems,
            dispatch,
            isAuthenticated,
        ],
    );

    return { addItem, setQuantity, removeItems };
}
