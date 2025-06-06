"use client"

import ResponsiveDisplay from "@/utils/responsive_display"
import CartComponentLarge from "./cart_component_large"
import EmptyCart from "../../components/cart/empty_cart"
import ProductCollection from "../products/products_collection"
import CartComponentSmall from "./cart_component_small"
import { useEffect, useState } from "react"
import { CartTypes } from "@/types/cart_type"
import { useAppSelector } from "@/redux/store"


const CartUI = () => {
    const fish_and_stock_product = [
        {
            title: "Smoked beef",
            price: "16,000",
            image: "/images/home_page/smoked_beef.webp"
        },
        {
            title: "Smoked goat meat",
            price: "11,000",
            image: "/images/home_page/smoked_goat_meat.webp"
        },
        {
            title: "Kilishi",
            price: "3,500",
            image: "/images/home_page/kilishi.webp"
        },
        {
            title: "Smoked guinea fowl",
            price: "12,500",
            image: "/images/home_page/smoked_guinea_fowl.webp"
        }
    ]

    const temp: CartTypes = useAppSelector(state => state.cart)

    const [allProducts, setAllProducts] = useState<CartTypes>(temp)

    useEffect(() => {
        if (typeof window !== "undefined") {
            // load data from localstorage for guest users
            const storedCart = localStorage.getItem("cart")
            if (storedCart) {
                setAllProducts(JSON.parse(storedCart) as CartTypes)
            }
        }
    }, [])

    useEffect(() => {
        setAllProducts(temp)
    }, [temp])

    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[120px] md:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            {
                allProducts?.cart?.length === 0 ? <EmptyCart /> : <>
                    <ResponsiveDisplay minWidth={1000}>
                        <CartComponentLarge allProducts={allProducts} />
                    </ResponsiveDisplay>
                    <ResponsiveDisplay maxWidth={999}>
                        <CartComponentSmall allProducts={allProducts} />
                    </ResponsiveDisplay>
                </>
            }
            <ProductCollection header="People also viewed" link="/category/fish and stock" details={fish_and_stock_product} />
        </main>
    )
}

export default CartUI