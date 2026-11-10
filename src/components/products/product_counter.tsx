"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { DetailsType } from "@/types/cart_type";
import Link from "next/link";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ProductImage from "@/components/ui/product_image";

const ProductCounter = ({ detail }: { detail: DetailsType }) => {
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
    const [method, setMethod] = useState<string>("add");
    const [busy, setBusy] = useState(false);

    const slug = encodeURIComponent(detail.title);
    const productHref = detail.id
        ? `/product/${detail.id}/${slug}`
        : `/product/${slug}/${slug}`;

    const addProductToCart = async () => {
        if (!detail.market_variant_id || busy || detail.sold_out) return;
        setBusy(true);
        try {
            await addItem(detail.market_variant_id, 1, {
                name: detail.title,
                image: detail.image,
                price: Number(detail.price.replace(/,/g, "")) || 0,
                currency: detail.currency,
            });
            setMethod("add");
        } finally {
            setBusy(false);
        }
    };

    const addQuantityToProduct = async () => {
        if (!cartItem?.id || busy) return;
        setBusy(true);
        try {
            await setQuantity(cartItem.id, quantity + 1);
            setMethod("add");
        } finally {
            setBusy(false);
        }
    };

    const removeQuantityFromProduct = async () => {
        if (!cartItem?.id || busy) return;
        setBusy(true);
        try {
            if (quantity - 1 < 1) {
                await removeItems([cartItem.id]);
            } else {
                await setQuantity(cartItem.id, quantity - 1);
                setMethod("sub");
            }
        } finally {
            setBusy(false);
        }
    };

    return (
        <motion.div
            key={detail.title}
            className="flex w-full max-w-[320px] min-w-[170px] flex-shrink-0 cursor-pointer flex-col items-center border border-[#D5DADA] bg-white pb-3"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <Link
                href={productHref}
                className="flex h-[150px] w-[100%] items-center justify-center bg-[#F5F6F5] py-2"
            >
                <ProductImage
                    width={250}
                    height={100}
                    src={detail.image}
                    alt={detail.title}
                    seed={detail.id || detail.title}
                />
            </Link>
            {detail.category_name && (
                <p className="text-[12px] md:text-[14px] text-[#0D523F] mt-2 px-2 text-center">
                    {detail.category_name}
                </p>
            )}
            <p className="text-[14px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-[400] mt-2 px-2 text-center">
                {detail.title}
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold mt-2 text-[#0D523F]">
                {formatMoney(
                    Number(detail.price.replace(/,/g, "")),
                    detail.currency,
                )}
            </p>
            {detail.sold_out && (
                <p className="text-sm text-red-600 mt-1">Sold out</p>
            )}
            <AnimatePresence mode="popLayout">
                {quantity < 1 ? (
                    <motion.button
                        key="add-button"
                        className="flex gap-4 border-2 items-center justify-center mt-2 border-[#FEB100] py-3 w-[90%] rounded-lg disabled:opacity-60"
                        whileFocus={{ backgroundColor: "#FEB100" }}
                        whileHover={{ backgroundColor: "#FEB100" }}
                        onClick={addProductToCart}
                        disabled={!detail.market_variant_id || busy || detail.sold_out}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <BsCart2 className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                        <p className="text-[18px]">
                            {detail.sold_out
                                ? "Sold out"
                                : busy
                                  ? "Adding..."
                                  : "Add to cart"}
                        </p>
                    </motion.button>
                ) : (
                    <motion.div
                        key="counter"
                        className="flex p-1 px-4 justify-between gap-4 border-2 items-center mt-2 border-[#FEB100] w-[90%] rounded-lg"
                        initial={{ opacity: 0, y: -10, scaleY: "50%" }}
                        animate={{ opacity: 1, y: 0, scaleY: "100%" }}
                        exit={{ opacity: 0, y: -10, scaleY: "50%" }}
                        transition={{ duration: 0.4 }}
                    >
                        <button
                            className="bg-[#FEB100] h-7 w-8 flex items-center justify-center text-[20px] font-[500]"
                            onClick={removeQuantityFromProduct}
                        >
                            -
                        </button>
                        <div className="relative flex items-center justify-center w-6 h-7 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={quantity}
                                    initial={{ y: method === "add" ? 10 : -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: method === "add" ? 10 : -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute"
                                >
                                    {quantity}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <button
                            className="bg-[#FEB100] h-7 w-8 flex items-center justify-center text-[20px] font-[500]"
                            onClick={addQuantityToProduct}
                        >
                            +
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductCounter;
