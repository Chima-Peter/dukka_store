"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { DetailsType } from "@/types/cart_type";
import { useState } from "react";
import { useCartActions } from "@/hooks/use_cart_actions";
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
    const [busy, setBusy] = useState(false);

    const productHref = id
        ? `/product/${id}/${encodeURIComponent(title)}`
        : `/product/${encodeURIComponent(title)}/${encodeURIComponent(title)}`;

    const addProductToCart = async () => {
        if (!market_variant_id || busy || sold_out) return;
        setBusy(true);
        try {
            await addItem(market_variant_id, 1, {
                name: title,
                image,
                price: Number(String(price).replace(/,/g, "")) || 0,
                currency,
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
            key={title}
            className={`border rounded-2xl border-gray-400 flex cursor-pointer flex-shrink-0 ${changeGrid === "3x3" && "w-[32%] flex-col pb-3 items-center"} ${changeGrid === "1x3" && "w-[49%] flex-row"}`}
            whileHover={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            whileFocus={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Link
                href={productHref}
                className={`w-[100%] bg-[#F0F0F0] ${changeGrid === "3x3" && "py-2 rounded-t-2xl rounded-l-none rounded-ss-2xl"} rounded-l-2xl flex justify-center items-center`}
            >
                <ProductImage
                    width={300}
                    height={160}
                    src={image}
                    alt={title}
                    seed={id || title}
                />
            </Link>
            <div
                className={`flex flex-col gap-2 w-[100%] items-center ${changeGrid === "1x3" ? "py-2" : "py-0"}`}
            >
                <p className="text-[14px] md:text-[16px] font-[400] mt-2">{title}</p>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold mt-2 text-[#0D523F]">
                    {currency && currency.toUpperCase() !== "NGN"
                        ? `${currency.toUpperCase()} ${price}`
                        : `₦ ${price}`}
                </p>
                {sold_out && <p className="text-sm text-red-600">Sold out</p>}
                <AnimatePresence mode="popLayout">
                    {!market_variant_id ? (
                        <motion.div
                            key="view-button"
                            className="mt-2 w-[90%]"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                href={productHref}
                                className="flex gap-4 border-2 items-center justify-center border-[#FEB100] py-3 w-full rounded-lg"
                            >
                                <p className="text-[18px]">
                                    {sold_out ? "View product" : "Select options"}
                                </p>
                            </Link>
                        </motion.div>
                    ) : quantity < 1 ? (
                        <motion.button
                            key="add-button"
                            className="flex gap-4 border-2 items-center justify-center mt-2 border-[#FEB100] py-3 w-[90%] rounded-lg disabled:opacity-60"
                            whileFocus={{ backgroundColor: "#FEB100" }}
                            whileHover={{ backgroundColor: "#FEB100" }}
                            onClick={addProductToCart}
                            disabled={busy || sold_out}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <BsCart2 className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                            <p className="text-[18px]">{sold_out ? "Sold out" : "Add to cart"}</p>
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
                                        initial={{
                                            y: method === "add" ? 10 : -10,
                                            opacity: 0,
                                        }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{
                                            y: method === "add" ? 10 : -10,
                                            opacity: 0,
                                        }}
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
            </div>
        </motion.div>
    );
};

export default SingleProduct;
