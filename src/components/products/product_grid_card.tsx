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

    return (
        <motion.article
            className="group flex h-full flex-col border border-[#E4E7E7] bg-white"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <Link
                href={productHref}
                className="relative block aspect-[4/5] w-full overflow-hidden bg-[#F3F5F4]"
            >
                <ProductImage
                    src={detail.image}
                    alt={detail.title}
                    seed={detail.id || detail.title}
                    width={480}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {detail.sold_out && (
                    <span className="absolute left-3 top-3 bg-[#031815] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                        Sold out
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
                <Link href={productHref} className="line-clamp-2 min-h-[2.6em] text-[15px] font-medium leading-snug text-[#0D523F] sm:text-[16px]">
                    {detail.title}
                </Link>
                <p className="text-[17px] font-semibold tracking-tight text-[#031815] sm:text-[18px]">
                    {formatMoney(
                        Number(detail.price.replace(/,/g, "")),
                        detail.currency,
                    )}
                </p>

                <div className="mt-auto pt-2">
                    <AnimatePresence mode="popLayout">
                        {!detail.market_variant_id ? (
                            <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Link
                                    href={productHref}
                                    className="flex w-full items-center justify-center gap-2 border border-[#FEB100] bg-[#FEB100] py-2.5 text-[14px] font-semibold text-[#031815] transition-colors hover:bg-[#0D523F] hover:border-[#0D523F] hover:text-white"
                                >
                                    {detail.sold_out ? "View product" : "Select options"}
                                </Link>
                            </motion.div>
                        ) : quantity < 1 ? (
                            <motion.button
                                key="add"
                                type="button"
                                onClick={addProductToCart}
                                disabled={detail.sold_out}
                                className="flex w-full items-center justify-center gap-2 border border-[#FEB100] bg-[#FEB100] py-2.5 text-[14px] font-semibold text-[#031815] transition-colors hover:bg-[#0D523F] hover:border-[#0D523F] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <BsCart2 className="h-4 w-4" />
                                {detail.sold_out ? "Sold out" : "Add to cart"}
                            </motion.button>
                        ) : (
                            <motion.div
                                key="qty"
                                className="flex w-full items-center justify-between border border-[#FEB100]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <button
                                    type="button"
                                    className="bg-[#FEB100] px-3 py-2 text-[18px] font-medium"
                                    onClick={removeQuantity}
                                >
                                    -
                                </button>
                                <div className="relative flex h-7 w-8 items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="popLayout">
                                        <motion.span
                                            key={quantity}
                                            initial={{
                                                y: method === "add" ? 10 : -10,
                                                opacity: 0,
                                            }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{
                                                y: method === "add" ? 10 : -10,
                                                opacity: 0,
                                            }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute text-[15px] font-semibold"
                                        >
                                            {quantity}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <button
                                    type="button"
                                    className="bg-[#FEB100] px-3 py-2 text-[18px] font-medium"
                                    onClick={addQuantity}
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

export default ProductGridCard;
