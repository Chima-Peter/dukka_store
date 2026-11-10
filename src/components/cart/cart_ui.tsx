"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import EmptyCart from "@/components/cart/empty_cart";
import RenderCartProduct from "@/components/cart/render_cart_product";
import ProductCollection from "@/components/products/products_collection";
import { useCartActions } from "@/hooks/use_cart_actions";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useAppSelector } from "@/redux/store";
import { formatMoney } from "@/utils/format_money";
import { normalizeList, toDetailsType } from "@/utils/map_product";

const CartUI = () => {
    const cartState = useAppSelector((state) => state.cart);
    const marketId = useActiveMarketId();
    const { removeItems } = useCartActions();
    const { data } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const recommendations = normalizeList(data).map(toDetailsType);
    const items = cartState.cart;
    const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const currency = items[0]?.currency;
    const totalAmount = cartState.total || 0;
    const isEmpty = items.length === 0;

    const clearCart = async () => {
        const ids = items.map((item) => item.id).filter(Boolean) as string[];
        if (!ids.length) return;
        await removeItems(ids);
    };

    return (
        <main className="w-full bg-[#F0F0F0] pb-28 font-urbanist pt-[120px] sm:pt-[130px] lg:pb-16 lg:pt-[230px] xl:pt-[270px]">
            <div className="border-b border-[#E4E7E7] bg-white px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B7373]">
                    <Link href="/" className="hover:text-[#0D523F]">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-[#0D523F]">Cart</span>
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
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#888B8B]">
                                Dukka
                            </p>
                            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-[#0D523F]">
                                Your cart
                            </h1>
                            <p className="mt-2 text-[14px] text-[#6B7373]">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={clearCart}
                            className="text-[13px] font-semibold text-[#888B8B] underline-offset-4 transition-colors hover:text-[#0D523F] hover:underline"
                        >
                            Clear cart
                        </button>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                        <motion.section
                            className="bg-white px-4 py-2 sm:px-6 lg:col-span-8 lg:px-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="hidden border-b border-[#E8EBEB] py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888B8B] lg:grid lg:grid-cols-[140px_minmax(0,1fr)_auto] lg:gap-10">
                                <span>Product</span>
                                <span>Details</span>
                                <span className="min-w-[7.5rem] text-right">
                                    Total
                                </span>
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
                            className="hidden h-fit bg-[#031815] p-6 text-white lg:sticky lg:top-[180px] lg:col-span-4 lg:block xl:top-[220px] xl:p-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.45,
                                delay: 0.08,
                                ease: "easeOut",
                            }}
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FEB100]">
                                Order summary
                            </p>
                            <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
                                Ready to checkout
                            </h2>

                            <dl className="mt-8 space-y-4 border-y border-white/15 py-6">
                                <div className="flex items-center justify-between gap-4 text-[14px]">
                                    <dt className="text-white/70">Items</dt>
                                    <dd className="font-medium tabular-nums">
                                        {itemCount}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[14px]">
                                    <dt className="text-white/70">Subtotal</dt>
                                    <dd className="font-medium tabular-nums">
                                        {formatMoney(totalAmount, currency)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 pt-2">
                                    <dt className="text-[15px] font-medium">
                                        Total
                                    </dt>
                                    <dd className="text-[22px] font-semibold tabular-nums tracking-tight text-[#FEB100]">
                                        {formatMoney(totalAmount, currency)}
                                    </dd>
                                </div>
                            </dl>

                            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
                                Delivery and fees are confirmed at checkout.
                            </p>

                            <Link
                                href="/cart/checkout"
                                className="mt-6 flex w-full items-center justify-center bg-[#FEB100] py-3.5 text-[15px] font-semibold text-[#031815] transition-colors hover:bg-white"
                            >
                                Checkout now
                            </Link>
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
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E4E7E7] bg-white px-4 py-4 shadow-[0_-8px_24px_rgba(3,24,21,0.08)] lg:hidden">
                    <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888B8B]">
                                Total
                            </p>
                            <p className="text-[20px] font-semibold tabular-nums tracking-tight text-[#031815]">
                                {formatMoney(totalAmount, currency)}
                            </p>
                        </div>
                        <p className="text-[13px] text-[#6B7373]">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                    </div>
                    <Link
                        href="/cart/checkout"
                        className="flex w-full items-center justify-center bg-[#FEB100] py-3.5 text-[15px] font-semibold text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white"
                    >
                        Checkout now
                    </Link>
                </div>
            )}

            <ProductCollection
                header="People also viewed"
                link="/category/all"
                details={recommendations}
            />
        </main>
    );
};

export default CartUI;
