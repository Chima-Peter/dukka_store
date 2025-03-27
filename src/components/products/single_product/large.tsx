"use client"

import { AnimatePresence, motion } from "framer-motion"
import { BsCart2 } from "react-icons/bs"
import Link from "next/link"
import Image from "next/image"
import { addToCart, removeFromCart, updateQuantity } from "@/redux/features/cart_slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { DetailsType } from "@/types/cart_type"
import convertStringToInt from "@/utils/convert_string_to_int"
import { useState } from "react"

const SingleProduct = ({ image, price, title, changeGrid }: DetailsType) => {
    
    // method for sending request to store
    const dispatch = useAppDispatch()

    const quantity = useAppSelector(state => state.cart.cart.find(item => item.name === title)?.quantity) || 0;

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
            key={title} 
            className={`border rounded-2xl border-gray-400 flex cursor-pointer flex-shrink-0 ${changeGrid === "3x3" && 'w-[32%] flex-col pb-3 items-center'} ${changeGrid === '1x3' && 'w-[49%] flex-row'}`}
            whileHover={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            whileFocus={{ scale: 1.02, boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <Link href={`/product/${title}`} className={`w-[100%] bg-[#F0F0F0] ${changeGrid === '3x3' && 'py-2 rounded-t-2xl rounded-l-none rounded-ss-2xl'} rounded-l-2xl flex justify-center items-center`}>
                <Image width={300} height={160} src={image} alt={title} />
            </Link>
            <div className={`flex flex-col gap-2 w-[100%] items-center ${changeGrid === '1x3' ? 'py-2' : 'py-0'}`}>
                <p className="text-[14px] md:text-[16px] font-[400] mt-2">
                    {title}
                </p>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold mt-2 text-[#0D523F]">
                    &#8358; {price}
                </p>
                <AnimatePresence mode="popLayout">
                {quantity < 1 ? (
                    // ADD TO CART BUTTON
                    <motion.button
                        key="add-button"
                        className="flex gap-4 border-2 items-center justify-center mt-2 border-[#FEB100] py-3 w-[90%] rounded-lg"
                        whileFocus={{ backgroundColor: "#FEB100" }}
                        whileHover={{ backgroundColor: "#FEB100" }}
                        onClick={() => addProductToCart({title, image, price})}
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
                            onClick={() => removeQuantityFromProduct(title)}>
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
                            onClick={() => addQuantityToProduct(title)}
                        >
                            +
                        </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default SingleProduct