"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { DetailsType } from "@/types/cart_type";
import { useState } from "react";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ProductImage from "@/components/ui/product_image";

const SingleProduct = ({
    id,
    image,
    price,
    title,
    changeGrid,
    market_variant_id,
    sold_out,
    currency,
}: DetailsType) => {
    const cartItem = useAppSelector((state) =>
        state.cart.cart.find(
            (item) =>
                (market_variant_id && item.market_variant_id === market_variant_id) ||
                item.name === title,
        ),
    );
    const quantity = cartItem?.quantity || 0;
    const { addItem, setQuantity, removeItems } = useCartActions();
    const [method, setMethod] = useState<string>("add");

    const productHref = id
        ? `/product/${id}/${encodeURIComponent(title)}`
        : `/product/${encodeURIComponent(title)}/${encodeURIComponent(title)}`;

    const addProductToCart = () => {
        if (!market_variant_id || sold_out) return;
        setMethod("add");
        void addItem(market_variant_id, 1, {
            name: title,
            image,
            price: Number(String(price).replace(/,/g, "")) || 0,
            currency,
        }).catch(() => undefined);
    };

    const addQuantityToProduct = () => {
        if (!cartItem?.id) return;
        setMethod("add");
        void setQuantity(cartItem.id, quantity + 1).catch(() => undefined);
    };

    const removeQuantityFromProduct = () => {
        if (!cartItem?.id) return;
        if (quantity - 1 < 1) {
            void removeItems([cartItem.id]).catch(() => undefined);
            return;
        }
        setMethod("sub");
        void setQuantity(cartItem.id, quantity - 1).catch(() => undefined);
    };

    const isRow = changeGrid === "1x3";

    return (
        <motion.article
            key={title}
            className={`group flex min-w-0 bg-white ${
                isRow
                    ? "w-full flex-row overflow-hidden rounded-md border border-[#E4E7E7]"
                    : "h-full w-full flex-col"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <Link
                href={productHref}
                className={`relative block overflow-hidden bg-[#F5F6F5] ${
                    isRow
                        ? "aspect-square w-[36%] shrink-0 self-stretch"
                        : "aspect-square w-full rounded-md"
                }`}
            >
                <ProductImage
                    width={280}
                    height={280}
                    src={image}
                    alt={title}
                    seed={id || title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {sold_out && (
                    <span className="absolute left-2 top-2 bg-[#031815] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        Sold out
                    </span>
                )}
            </Link>
            <div
                className={`flex flex-1 flex-col gap-1 ${
                    isRow ? "justify-center p-3 sm:p-4" : "pt-2.5"
                }`}
            >
                <Link
                    href={productHref}
                    className="line-clamp-2 min-h-[2.4em] text-[13px] font-medium leading-snug text-[#0D523F] sm:text-[14px]"
                >
                    {title}
                </Link>
                <p className="text-[14px] font-semibold tracking-tight text-[#031815] sm:text-[15px]">
                    {formatMoney(
                        Number(String(price).replace(/,/g, "")),
                        currency,
                    )}
                </p>
                <div className="mt-auto pt-1.5">
                    <AnimatePresence mode="popLayout">
                        {!market_variant_id ? (
                            <motion.div
                                key="view-button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Link
                                    href={productHref}
                                    className="flex w-full items-center justify-center gap-1.5 rounded-md border border-[#FEB100] bg-[#FEB100] py-1.5 text-[12px] font-semibold text-[#031815] transition-colors hover:border-[#0D523F] hover:bg-[#0D523F] hover:text-white"
                                >
                                    {sold_out ? "View" : "Options"}
                                </Link>
                            </motion.div>
                        ) : quantity < 1 ? (
                            <motion.button
                                key="add-button"
                                type="button"
                                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-[#FEB100] bg-[#FEB100] py-1.5 text-[12px] font-semibold text-[#031815] transition-colors hover:border-[#0D523F] hover:bg-[#0D523F] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={addProductToCart}
                                disabled={sold_out}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <BsCart2 className="h-3.5 w-3.5" />
                                {sold_out ? "Sold out" : "Add"}
                            </motion.button>
                        ) : (
                            <motion.div
                                key="counter"
                                className="flex w-full items-center justify-between rounded-md border border-[#FEB100]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <button
                                    type="button"
                                    className="rounded-l-md bg-[#FEB100] px-2.5 py-1.5 text-[15px] font-medium"
                                    onClick={removeQuantityFromProduct}
                                >
                                    -
                                </button>
                                <div className="relative flex h-6 w-7 items-center justify-center overflow-hidden">
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
                                            transition={{ duration: 0.2 }}
                                            className="absolute text-[13px] font-semibold"
                                        >
                                            {quantity}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <button
                                    type="button"
                                    className="rounded-r-md bg-[#FEB100] px-2.5 py-1.5 text-[15px] font-medium"
                                    onClick={addQuantityToProduct}
                                >
                                    +
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.article>
    );
};

export default SingleProduct;
