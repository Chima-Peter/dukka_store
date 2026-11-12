"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCart2 } from "react-icons/bs";
import { DetailsType } from "@/types/cart_type";
import { useAppSelector } from "@/redux/store";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ProductImage from "@/components/ui/product_image";

const ProductGridCard = ({ detail }: { detail: DetailsType }) => {
    const cartItem = useAppSelector((state) =>
        state.cart.cart.find(
            (item) =>
                (detail.market_variant_id &&
                    item.market_variant_id === detail.market_variant_id) ||
                item.name === detail.title,
        ),
    );
    const quantity = cartItem?.quantity || 0;
    const { addItem, setQuantity, removeItems } = useCartActions();
    const [method, setMethod] = useState("add");

    const productHref = detail.id
        ? `/product/${detail.id}/${encodeURIComponent(detail.title)}`
        : `/product/${encodeURIComponent(detail.title)}/${encodeURIComponent(detail.title)}`;

    const addProductToCart = () => {
        if (!detail.market_variant_id || detail.sold_out) return;
        setMethod("add");
        void addItem(detail.market_variant_id, 1, {
            name: detail.title,
            image: detail.image,
            price: Number(detail.price.replace(/,/g, "")) || 0,
            currency: detail.currency,
        }).catch(() => undefined);
    };

    const addQuantity = () => {
        if (!cartItem?.id) return;
        setMethod("add");
        void setQuantity(cartItem.id, quantity + 1).catch(() => undefined);
    };

    const removeQuantity = () => {
        if (!cartItem?.id) return;
        if (quantity - 1 < 1) {
            void removeItems([cartItem.id]).catch(() => undefined);
            return;
        }
        setMethod("sub");
        void setQuantity(cartItem.id, quantity - 1).catch(() => undefined);
    };

    const showActions = quantity > 0;

    return (
        <motion.article
            className="group relative flex h-full flex-col"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div className="relative aspect-square w-full overflow-hidden bg-dukka-soft">
                <Link href={productHref} className="absolute inset-0 block">
                    <ProductImage
                        src={detail.image}
                        alt={detail.title}
                        seed={detail.id || detail.title}
                        width={320}
                        height={320}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                </Link>
                {detail.sold_out && (
                    <span className="pointer-events-none absolute left-2 top-2 z-10 bg-dukka-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        Sold out
                    </span>
                )}

                <div
                    className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-dukka-ink/55 to-transparent p-2.5 transition-opacity duration-200 ${
                        showActions
                            ? "opacity-100"
                            : "opacity-100 min-[768px]:opacity-0 min-[768px]:group-hover:opacity-100 min-[768px]:group-focus-within:opacity-100"
                    }`}
                >
                    <AnimatePresence mode="popLayout">
                        {!detail.market_variant_id ? (
                            <motion.div
                                key="view"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                            >
                                <Link
                                    href={productHref}
                                    className="flex w-full items-center justify-center gap-1.5 bg-white/95 py-2 text-[12px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-amber"
                                >
                                    {detail.sold_out ? "View" : "Options"}
                                </Link>
                            </motion.div>
                        ) : quantity < 1 ? (
                            <motion.button
                                key="add"
                                type="button"
                                onClick={addProductToCart}
                                disabled={detail.sold_out}
                                className="flex w-full items-center justify-center gap-1.5 bg-dukka-amber py-2 text-[12px] font-semibold text-dukka-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                            >
                                <BsCart2 className="h-3.5 w-3.5" />
                                {detail.sold_out ? "Sold out" : "Add"}
                            </motion.button>
                        ) : (
                            <motion.div
                                key="qty"
                                className="flex w-full items-center justify-between bg-white/95"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                            >
                                <button
                                    type="button"
                                    className="bg-dukka-amber px-3 py-2 text-[15px] font-medium text-dukka-ink"
                                    onClick={removeQuantity}
                                >
                                    -
                                </button>
                                <div className="relative flex h-6 w-8 items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="popLayout">
                                        <motion.span
                                            key={quantity}
                                            initial={{
                                                y: method === "add" ? 8 : -8,
                                                opacity: 0,
                                            }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{
                                                y: method === "add" ? 8 : -8,
                                                opacity: 0,
                                            }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute text-[13px] font-semibold text-dukka-ink"
                                        >
                                            {quantity}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <button
                                    type="button"
                                    className="bg-dukka-amber px-3 py-2 text-[15px] font-medium text-dukka-ink"
                                    onClick={addQuantity}
                                >
                                    +
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-1 pt-3">
                <Link
                    href={productHref}
                    className="line-clamp-2 min-h-[2.5em] text-[13px] font-medium leading-snug text-dukka-forest transition-colors hover:text-dukka-ink sm:text-[14px]"
                >
                    {detail.title}
                </Link>
                <p className="text-[15px] font-semibold tracking-tight text-dukka-ink sm:text-[16px]">
                    {formatMoney(
                        Number(detail.price.replace(/,/g, "")),
                        detail.currency,
                    )}
                </p>
            </div>
        </motion.article>
    );
};

export default ProductGridCard;
