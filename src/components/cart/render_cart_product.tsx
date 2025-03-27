"use client"


import { useEffect, useState } from "react"
import addCommasToInt from "../../utils/add_commas_to_int"
import { HiMinus } from "react-icons/hi"
import { BiTrash } from "react-icons/bi"
import { useAppDispatch } from "../../redux/store"
import { removeFromCart, updateQuantity } from "../../redux/features/cart_slice"
import { LuPlus } from "react-icons/lu"
import Image from "next/image"
import Link from "next/link"


interface ProductType {
    name: string
    price: number
    image: string
    quantity: number
}

const RenderCartProduct = (props: ProductType) => {
    // state for controlling quantity of product
    const [quantity, setQuantity] = useState(props.quantity)

    // for sending request to store
    const dispatch = useAppDispatch()

    // control state dynamically. we also ensure quantity never goes below 0
    const controlState = (method: string) => {
        if (method === "ADD") {
            setQuantity(prev => prev + 1 )
        } else {
            setQuantity(prev => prev - 1)
        }
    }

    // dispatch action to delete product from cart
    const deleteProduct = (name: string) => {
        dispatch(removeFromCart(name))
    }

    // update quantity  of product in store whenever quantity here changes - thus updating total amount
    useEffect(() => {
        const name = props.name;
        if (quantity > 0) 
            dispatch(updateQuantity({ name, quantity }))
        else
            dispatch(removeFromCart(name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ quantity ])


    return (
        <div className="flex w-[100%] justify-start gap-6 border-b border-b-gray-300 min-lg:last:border-0 min-lg:py-4 min-lg:first:pt-6 p-2 min-lg:px-0 max-md:items-center max-md:border max-md:border-gray-400 max-md:rounded-lg">
            <div className="flex gap-2 min-lg:gap-6 max-w-fit min-lg:w-[48%] min-lg:pl-6">
                <Link href={`/product/${props.price}/${props.name}`}  className="min-lg:w-[35%] bg-[#F0F0F0] py-2 px-4 h-[100px] xl:h-[150px] flex justify-center items-center rounded-xl ">
                    <Image src={props.image} alt={props.name} width={192} height={102} />
                </Link>
                <div className="flex flex-col max-md:py-2 max-md:h-[100px] justify-between min-lg:gap-6">
                    <h3 className="text-[16px] font-[500]">
                        {props.name}
                    </h3>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] font-[600] text-[#75716F]">
                        &#8358;{addCommasToInt(props.price)}
                    </p>
                </div>
            </div>
            <div className="flex max-md:h-[100px] max-md:justify-between min-lg:gap-5 min-lg:w-[23%] min-lg:py-4 flex-col-reverse min-lg:flex-col py-3">
                <button className=" bg-white font-semibold border-[1.4px]  rounded-md w-[100px] flex items-center justify-between text-[12px] border-[#FEB100] min-lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                    <span  className="h-[100%] bg-[#FEB100] p-[6px] rounded-l-md" onClick={() => controlState("SUB")}>
                        <HiMinus className="cursor-pointer"  />
                    </span>
                        {quantity}
                    <span className="h-[100%] bg-[#FEB100] p-[6px] rounded-r-md" onClick={() => controlState("ADD")}>
                        <LuPlus className="cursor-pointer"  />
                    </span>
                </button>
                <button onClick={() => (deleteProduct(props.name))} className=" flex gap-1 text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-red-700 items-center self-end min-lg:self-auto">
                    <BiTrash className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-[#888B8B] min-lg:text-red-700" />
                    <p className="hidden min-lg:block">
                        Delete
                    </p>
                </button>
            </div>
            <div className="py-4 hidden min-lg:block">
                <h3 className="text-[18px] min-lg:text-xl xl:text-2xl 2xl:text-3xl font-[600]">
                    &#8358;{addCommasToInt(props.price * quantity)}
                </h3>
            </div>
        </div>
    )
}

export default RenderCartProduct