"use client";

import { motion, AnimatePresence } from "framer-motion";
import { removeFromCart, updateQuantity } from "@/redux/features/cart_slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import { DetailsType } from "@/types/cart_type";
import Link from "next/link";
import { addToCart } from "@/redux/features/cart_slice";
import convertStringToInt from "@/utils/convert_string_to_int";


const ProductCounter = ({ detail }: { detail: DetailsType }) => {
    const quantity = useAppSelector(state => state.cart.cart.find(item => item.name === detail.title)?.quantity) || 0;
    const dispatch = useAppDispatch();

    const [method, setMethod] = useState<string>("add")

    // add a product to the cart
    const addProductToCart = (detail: DetailsType) => {
        dispatch(addToCart({ name: detail.title, price: convertStringToInt(detail.price), image: detail.image, quantity: 1 }))
    }

    // Add product quantity
    const addQuantityToProduct = (name: string) => {
        dispatch(updateQuantity({ name, quantity: quantity + 1 }));
        setMethod("add")
    };

    // Remove product quantity
    const removeQuantityFromProduct = (name: string) => {
        // delete from cart if quantity is less than 1
        if ((quantity - 1) < 1) {
            dispatch(removeFromCart(name))
        } else {
            dispatch(updateQuantity({ name, quantity: quantity - 1 }));
        setMethod("sub")
        }
    };

    return (
        <motion.div
            key={detail.title} 
            className="max-[801px]:w-[170px] max-[801px]:flex-shrink-0 border rounded-2xl border-gray-400 flex flex-col min-[801px]:w-[23%] xl:w-[300px] 2xl:w-[400px] items-center pb-3 cursor-pointer"
            whileHover={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            whileFocus={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <Link href={`/product/${detail.price}/${detail.title}`} className="w-[100%] bg-[#F0F0F0] py-2 flex justify-center items-center rounded-t-2xl min-[801px]:h-[150px]">
                <Image width={250} height={100} src={detail.image} alt={detail.title} />
            </Link>
            <p className="text-[14px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-[400] mt-2">
                {detail.title}
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold mt-2 text-[#0D523F]">
                &#8358; {detail.price}
            </p>
            <AnimatePresence mode="popLayout">
                {quantity < 1 ? (
                    // ADD TO CART BUTTON
                    <motion.button
                        key="add-button"
                        className="flex gap-4 border-2 items-center justify-center mt-2 border-[#FEB100] py-3 w-[90%] rounded-lg"
                        whileFocus={{ backgroundColor: "#FEB100" }}
                        whileHover={{ backgroundColor: "#FEB100" }}
                        onClick={() => addProductToCart(detail)}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <BsCart2 className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                        <p className="text-[18px]">Add to cart</p>
                    </motion.button>
                ) : (
                    // QUANTITY COUNTER
                    <motion.div
                        key="counter"
                        className="flex p-1 px-4 justify-between gap-4 border-2 items-center mt-2 border-[#FEB100] w-[90%] rounded-lg"
                        initial={{ opacity: 0, y: -10, scaleY: '50%' }}
                        animate={{ opacity: 1, y: 0, scaleY: '100%' }}
                        exit={{ opacity: 0, y: -10, scaleY: '50%' }}
                        transition={{ duration: 0.4 }}>
                        <button
                            className="bg-[#FEB100] h-7 w-8 flex items-center justify-center text-[20px] font-[500]"
                            onClick={() => removeQuantityFromProduct(detail.title)}>
                            -
                        </button>

                        {/* Animated Quantity Number */}
                        <div className="relative flex items-center justify-center w-6 h-7 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={quantity} // Re-animates on quantity change
                                    initial={{ y: method === "add" ? 10 : -10, opacity: 0 }} // Start position
                                    animate={{ y: 0, opacity: 1 }} // Animate in
                                    exit={{ y: method === "add" ? 10 : -10, opacity: 0 }} // Animate out
                                    transition={{ duration: 0.2 }}
                                    className="absolute"
                                >
                                    {quantity}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <button
                            className="bg-[#FEB100] h-7 w-8 flex items-center justify-center text-[20px] font-[500]"
                            onClick={() => addQuantityToProduct(detail.title)}
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
