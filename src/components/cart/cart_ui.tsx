"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import EmptyCart from "@/components/cart/empty_cart";
import RenderCartProduct from "@/components/cart/render_cart_product";
import ProductCollection from "@/components/products/products_collection";
import { useCartActions } from "@/hooks/use_cart_actions";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useLazyGetPrecheckoutQuery } from "@/redux/services/checkout_api";
import { useAppSelector } from "@/redux/store";
import { formatMoney } from "@/utils/format_money";
import { normalizeList, toDetailsType } from "@/utils/map_product";
import { getAccessToken, getGuestCartId } from "@/lib/cookies";
import DukkaLoader from "@/components/ui/dukka_loader";

const CartUI = () => {
    const router = useRouter();
    const cartState = useAppSelector((state) => state.cart);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const marketId = useActiveMarketId();
    const { removeItems, flushQuantityDebounces } = useCartActions();
    const [triggerPrecheckout, { isFetching }] = useLazyGetPrecheckoutQuery();
    const [checkoutError, setCheckoutError] = useState("");

    useEffect(() => {
        return () => {
            flushQuantityDebounces();
        };
    }, [flushQuantityDebounces]);

    const { data } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const recommendations = normalizeList(data).map(toDetailsType);
    const items = cartState.cart;
    const lineCount = items.length;
    const unitCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const currency = items[0]?.currency;
    const totalAmount = items.reduce(
        (sum, item) =>
            sum +
            Math.max(Number(item.price) - Number(item.discount_amount ?? 0), 0) *
                (item.quantity || 1),
        0,
    );
    const isEmpty = items.length === 0;
    const itemLabel =
        lineCount === unitCount
            ? `${lineCount} ${lineCount === 1 ? "item" : "items"}`
            : `${lineCount} ${lineCount === 1 ? "item" : "items"} · ${unitCount} units`;

    const clearCart = async () => {
        const ids = items.map((item) => item.id).filter(Boolean) as string[];
        if (!ids.length) return;
        await removeItems(ids);
    };

    const startCheckout = async () => {
        setCheckoutError("");
        const authed = isAuthenticated || !!getAccessToken();
        const guestCartId = getGuestCartId();
        const cartId = cartState.server_cart_id || guestCartId;

        try {
            if (authed) {
                await triggerPrecheckout().unwrap();
            } else {
                if (!cartId) {
                    setCheckoutError("Cart is not ready. Add an item and try again.");
                    return;
                }
                await triggerPrecheckout({ cart_id: cartId }).unwrap();
            }
            router.push("/cart/checkout");
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to start checkout. Try again.";
            setCheckoutError(message);
        }
    };

    return (
        <main className="page-nav-offset w-full bg-dukka-canvas pb-28 font-urbanist lg:pb-16">
            <div className="border-b border-dukka-line bg-white px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-dukka-muted">
                    <Link href="/" className="hover:text-dukka-forest">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-dukka-ink">Cart</span>
                </nav>
            </div>

            {isEmpty ? (
                <EmptyCart />
            ) : (
                <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <motion.div
                        className="mb-8 flex flex-wrap items-end justify-between gap-4"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <div>
                            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-dukka-ink">
                                Your cart
                            </h1>
                            <p className="mt-2 text-[14px] text-dukka-muted">
                                {itemLabel}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={clearCart}
                            className="text-[13px] font-semibold text-dukka-muted underline-offset-4 transition-colors hover:text-dukka-forest hover:underline"
                        >
                            Clear cart
                        </button>
                    </motion.div>

                    {checkoutError && (
                        <p className="mb-4 text-sm text-red-600">{checkoutError}</p>
                    )}

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                        <motion.section
                            className="bg-white px-4 py-2 sm:px-6 lg:col-span-8 lg:px-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="hidden border-b border-dukka-line py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-dukka-muted lg:grid lg:grid-cols-[140px_minmax(0,1fr)_auto] lg:gap-10">
                                <span>Product</span>
                                <span>Details</span>
                                <span className="min-w-[7.5rem] text-right">Total</span>
                            </div>

                            <AnimatePresence mode="popLayout">
                                {items.map((product) => (
                                    <RenderCartProduct
                                        key={
                                            product.id ||
                                            product.market_variant_id ||
                                            product.name
                                        }
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                        market_variant_id={product.market_variant_id}
                                        discount_amount={product.discount_amount}
                                        currency={product.currency}
                                        sold_out={product.sold_out}
                                        quantity={product.quantity || 1}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.section>

                        <motion.aside
                            className="hidden h-fit bg-dukka-ink p-6 text-white lg:sticky lg:top-[calc(var(--dukka-nav-height)+16px)] lg:col-span-4 lg:block xl:p-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.45,
                                delay: 0.08,
                                ease: "easeOut",
                            }}
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dukka-amber">
                                Order summary
                            </p>
                            <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
                                Ready to checkout
                            </h2>

                            <dl className="mt-8 space-y-4 border-y border-white/15 py-6">
                                <div className="flex items-center justify-between gap-4 text-[14px]">
                                    <dt className="text-white/70">Items</dt>
                                    <dd className="font-medium tabular-nums">{lineCount}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[14px]">
                                    <dt className="text-white/70">Units</dt>
                                    <dd className="font-medium tabular-nums">{unitCount}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[14px]">
                                    <dt className="text-white/70">Subtotal</dt>
                                    <dd className="font-medium tabular-nums">
                                        {formatMoney(totalAmount, currency)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 pt-2">
                                    <dt className="text-[15px] font-medium">Total</dt>
                                    <dd className="text-[22px] font-semibold tabular-nums tracking-tight text-dukka-amber">
                                        {formatMoney(totalAmount, currency)}
                                    </dd>
                                </div>
                            </dl>

                            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
                                Delivery and fees are confirmed at checkout.
                            </p>

                            <button
                                type="button"
                                onClick={startCheckout}
                                disabled={isFetching}
                                className="mt-6 flex w-full items-center justify-center bg-dukka-amber py-3.5 text-[15px] font-semibold text-dukka-ink transition-colors hover:bg-white disabled:opacity-60"
                            >
                                {isFetching ? (
                                    <span className="inline-flex items-center gap-2">
                                        <DukkaLoader variant="inline" label="Preparing checkout" />
                                        Preparing…
                                    </span>
                                ) : (
                                    "Checkout now"
                                )}
                            </button>
                            <Link
                                href="/"
                                className="mt-3 flex w-full items-center justify-center border border-white/25 py-3 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/5"
                            >
                                Keep shopping
                            </Link>
                        </motion.aside>
                    </div>
                </div>
            )}

            {!isEmpty && (
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-dukka-line bg-white px-4 py-4 shadow-[0_-8px_24px_rgba(3,24,21,0.08)] lg:hidden">
                    <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dukka-muted">
                                Total
                            </p>
                            <p className="text-[20px] font-semibold tabular-nums tracking-tight text-dukka-ink">
                                {formatMoney(totalAmount, currency)}
                            </p>
                        </div>
                        <p className="text-[13px] text-dukka-muted">{itemLabel}</p>
                    </div>
                    {checkoutError && (
                        <p className="mb-2 text-sm text-red-600">{checkoutError}</p>
                    )}
                    <button
                        type="button"
                        onClick={startCheckout}
                        disabled={isFetching}
                        className="flex w-full items-center justify-center bg-dukka-amber py-3.5 text-[15px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white disabled:opacity-60"
                    >
                        {isFetching ? "Preparing…" : "Checkout now"}
                    </button>
                </div>
            )}

            <ProductCollection
                header="People also viewed"
                link="/category/all"
                details={recommendations}
                showSeeAll
            />
        </main>
    );
};

export default CartUI;
