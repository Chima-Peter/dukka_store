import { BsChevronDoubleRight } from "react-icons/bs"
import Link from "next/link"
import RenderCartProduct from "./render_cart_product"
import { FaChevronRight } from "react-icons/fa6"
import addCommasToInt from "@/utils/add_commas_to_int"
import { CartTypes } from "@/types/cart_type"


const CartComponentLarge = ({ allProducts }: { allProducts: CartTypes }) => {

    const totalAmount = allProducts.total || 0


    return (
        <main className="flex flex-col gap-5 w-[100%] bg-[#F0F0F0] font-urbanist">
            <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-4">
                <p className="flex items-center gap-1 pb-2 border-b-[1.4px] border-b-gray-300">
                    <Link className="text-[13px] opacity-75 font-normal" href="/"> Home </Link> <strong className="opacity-65"> <BsChevronDoubleRight className="w-3 h-3" /> </strong> <Link href={`/cart`} className="text-[15px] font-semibold">Cart</Link>
                </p>
            </section>

            <section className="flex min-lg:justify-between flex-col min-lg:flex-row gap-8 min-lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-10 bg-white w-[100%]">
                <section className="flex flex-col w-[100%] min-lg:w-[70%] border rounded-lg h-fit  border-gray-400">
                    <div className="flex justify-between p-6">
                        <h2 className="w-[48%] text-[20px] xl:text-[22px] 2xl:text-[24px] font-[500] text-[#646767]">
                            Product
                        </h2>
                        <h2 className="w-[23%] text-[20px] xl:text-[22px] 2xl:text-[24px] font-[500] text-[#646767]">
                            Quantity
                        </h2>
                        <h2 className="w-[23%] text-[20px] xl:text-[22px] 2xl:text-[24px] font-[500] text-[#646767]">
                            Total
                        </h2>
                    </div>
                    <div className="w-[100%] h-[1px] bg-gray-200" />
                    <section className="w-[100%] flex flex-col gap-4">
                        {
                            allProducts.cart.map((product, index: number) => (
                                <RenderCartProduct name={product.name} price={product.price} image={product.image} key={`${index}-${product.name}`}  quantity={product.quantity || 1}/>
                            ))
                        }
                    </section>
                </section>

                <section className="flex flex-col gap-4 w-[100%] min-lg:w-[27%] p-6 rounded-lg border border-gray-400 h-fit">
                    <ul className="flex flex-col gap-4">
                        <li className="flex justify-between">
                            <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                                Subtotal:
                            </p>
                            <h3 className="text-[16px] min-lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-black font-semibold">
                                &#8358;{addCommasToInt(totalAmount)}
                            </h3>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                                Tax:
                            </p>
                            <h3 className="text-[16px] min-lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-black font-semibold">
                                &#8358;{addCommasToInt(totalAmount * 0.075)}
                            </h3>
                        </li>
                        <li className="flex justify-between mt-6 py-1 border-b border-b-gray-300">
                            <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                                Grand Total:
                            </p>
                            <h3 className="text-[17px] min-lg:text-[20px] xl:text-[22px] 2xl:text-[24px] text-black font-bold">
                                &#8358;{addCommasToInt(totalAmount + (totalAmount * 0.075))}
                            </h3>
                        </li>
                    </ul>
                    <button className="flex justify-between py-1 border-b border-b-gray-300 mt-4 ">
                        <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                            Order instruction
                        </p>
                        <FaChevronRight className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 text-gray-400" />
                    </button>
                    <Link href="/cart/checkout" className="items-center w-[100%]  mt-2 hover:bg-white border-[1.4px] border-[#FEB100] flex gap-2 rounded-lg bg-[#FEB100] py-2 justify-center text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium tracking-wide">
                        Checkout now
                    </Link>
                </section>
            </section>
        </main> 
    )
}

export default CartComponentLarge