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

const QUANTITY_DEBOUNCE_MS = 400;
const pendingAdds = new Map<string, Promise<CartView>>();
const quantityTimers = new Map<string, ReturnType<typeof setTimeout>>();
const quantitySnapshots = new Map<string, CartTypes>();

function snapshotCart(state: CartTypes): CartTypes {
    return {
        cart: state.cart.map((item) => ({ ...item })),
        total: state.total,
        server_cart_id: state.server_cart_id,
        market_id: state.market_id,
    };
}

function cancelQuantityDebounce(itemId: string) {
    const timer = quantityTimers.get(itemId);
    if (timer) {
        clearTimeout(timer);
        quantityTimers.delete(itemId);
    }
    quantitySnapshots.delete(itemId);
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

    const syncQuantityToServer = useCallback(
        async (itemId: string, quantity: number, previous: CartTypes) => {
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

            const inFlight = pendingAdds.get(market_variant_id);
            if (inFlight) {
                return inFlight;
            }

            const request = (async () => {
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
                } finally {
                    pendingAdds.delete(market_variant_id);
                }
            })();

            pendingAdds.set(market_variant_id, request);
            return request;
        },
        [addCustomerItem, addGuestItem, applyCart, dispatch, isAuthenticated],
    );

    const setQuantity = useCallback(
        async (itemId: string, quantity: number) => {
            cancelQuantityDebounce(itemId);
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

            return syncQuantityToServer(itemId, quantity, previous);
        },
        [dispatch, syncQuantityToServer],
    );

    const setQuantityDebounced = useCallback(
        (itemId: string, quantity: number) => {
            if (!quantitySnapshots.has(itemId)) {
                quantitySnapshots.set(
                    itemId,
                    snapshotCart(store.getState().cart),
                );
            }

            const target = store
                .getState()
                .cart.cart.find((item) => item.id === itemId);
            if (target) {
                dispatch(
                    updateQuantity({
                        id: itemId,
                        name: target.name,
                        quantity,
                    }),
                );
            }

            const existingTimer = quantityTimers.get(itemId);
            if (existingTimer) clearTimeout(existingTimer);

            const timer = setTimeout(() => {
                quantityTimers.delete(itemId);
                const previous =
                    quantitySnapshots.get(itemId) ||
                    snapshotCart(store.getState().cart);
                quantitySnapshots.delete(itemId);

                const current = store
                    .getState()
                    .cart.cart.find((item) => item.id === itemId);
                if (!current) return;

                void syncQuantityToServer(
                    itemId,
                    current.quantity,
                    previous,
                ).catch(() => undefined);
            }, QUANTITY_DEBOUNCE_MS);

            quantityTimers.set(itemId, timer);
        },
        [dispatch, syncQuantityToServer],
    );

    const flushQuantityDebounces = useCallback(() => {
        const ids = [...quantityTimers.keys()];
        for (const itemId of ids) {
            const timer = quantityTimers.get(itemId);
            if (timer) clearTimeout(timer);
            quantityTimers.delete(itemId);

            const previous =
                quantitySnapshots.get(itemId) ||
                snapshotCart(store.getState().cart);
            quantitySnapshots.delete(itemId);

            const current = store
                .getState()
                .cart.cart.find((item) => item.id === itemId);
            if (!current) continue;

            void syncQuantityToServer(
                itemId,
                current.quantity,
                previous,
            ).catch(() => undefined);
        }
    }, [syncQuantityToServer]);

    const removeItems = useCallback(
        async (itemIds: string[]) => {
            if (!itemIds.length) return;
            for (const id of itemIds) {
                cancelQuantityDebounce(id);
            }

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

    return {
        addItem,
        setQuantity,
        setQuantityDebounced,
        flushQuantityDebounces,
        removeItems,
    };
}
