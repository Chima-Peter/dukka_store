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
import { setCartFromServer } from "@/redux/features/cart_slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
    clearGuestCartId,
    getAccessToken,
    getGuestCartId,
    setGuestCartId,
} from "@/lib/cookies";
import type { CartView } from "@/types/api";

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
        async (market_variant_id: string, quantity = 1) => {
            if (!market_variant_id) {
                throw new Error("Missing market variant");
            }
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
        },
        [addCustomerItem, addGuestItem, applyCart, isAuthenticated],
    );

    const setQuantity = useCallback(
        async (itemId: string, quantity: number) => {
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
        },
        [applyCart, isAuthenticated, updateCustomerItem, updateGuestItem],
    );

    const removeItems = useCallback(
        async (itemIds: string[]) => {
            if (!itemIds.length) return;
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
        },
        [applyCart, deleteCustomerItems, deleteGuestItems, isAuthenticated],
    );

    return { addItem, setQuantity, removeItems };
}
