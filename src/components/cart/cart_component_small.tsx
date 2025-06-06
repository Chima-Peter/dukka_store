import Link from "next/link"
import RenderCartProduct from "./render_cart_product"
import addCommasToInt from "../../utils/add_commas_to_int"
import { CartTypes } from "../../types/cart_type"
import BackButton from "../ui/back_button"

const CartComponentSmall = ({ allProducts }: { allProducts: CartTypes }) => {
    const totalAmount = allProducts.total || 0


    return (
        <main className="flex flex-col gap-5 w-[100%] bg-[#F0F0F0] font-urbanist relative">
            <section className="bg-white px-4 sm:px-6 md:px-8 py-4 flex justify-center relative w-[100%] items-center">
                <div className="absolute left-[5px] sm:left-[14px] md:left-[21px]">
                    <BackButton />
                </div>
                <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                    Cart
                </h1>
            </section>

            <section className="flex min-lg:justify-between flex-col min-lg:flex-row gap-8 min-lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-10 bg-white w-[100%]">
                <section className="flex flex-col w-[100%] gap-4">
                    {
                        allProducts.cart.map((product, index: number) => (
                            <RenderCartProduct name={product.name} price={product.price} image={product.image} key={`${index}-${product.name}`} quantity={product.quantity || 1} />
                        ))
                    }
                </section>
            </section>
            <div className="p-4 sm:p-6 md:p-8 items-center flex flex-col gap-8 w-[100%] bg-white fixed bottom-0 z-40 drop-shadow-nav-top">
                <div className="w-[100%] flex justify-between">
                    <p className="font-[400] text-[18px] tracking-wide">
                        Items({allProducts.cart.length})
                    </p>
                    <p className="font-[400] text-[18px] tracking-wide">
                        Subtotal &#8358;{addCommasToInt(totalAmount)}
                    </p>
                </div>
                <Link href={'/cart/checkout'} className=" hover:bg-white border-[1.4px] border-[#FEB100] w-[80%] rounded-lg bg-[#FEB100] py-3 justify-center text-[16px] font-medium tracking-wide text-center drop-shadow-md" >
                    Checkout
                </Link>
            </div>
        </main> 
    )
}

export default CartComponentSmall