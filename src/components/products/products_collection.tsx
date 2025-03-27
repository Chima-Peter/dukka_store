import Link from "next/link";
import { DetailsType } from "../../types/cart_type";
import ResponsiveDisplay from "@/utils/responsive_display";
import ProductCounter from "./product_counter";



interface ProductCollectionType {
    header: string;
    link: string;
    details: DetailsType[]
}


const ProductCollection = (props: ProductCollectionType) => {

    return (
        <section className="w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 bg-white flex flex-col font-urbanist py-6 md:py-8 h-fit min-lg:py-12 gap-8">
            <div className="w-[100%] flex justify-between items-center">
                <h2 className="text-[16px] font-semibold md:text-xl xl:text-2xl 2xl:text-3xl">
                    {props.header}
                </h2>
                <Link href={props.link} className="text-[16px] md:text-[18px] xl:text-[20px] text-[#0D523F]">
                    See all
                </Link>
            </div>

            {/* TABLET AND LAPTOPS */}
            <ResponsiveDisplay minWidth={801}>
            <div className="flex w-[100%] justify-between gap-y-8 flex-wrap 2xl:justify-center 2xl:gap-24">
                    {
                        props.details.map((detail: DetailsType, index: number) => (
                            <ProductCounter detail={detail} key={index} />
                        ))
                    }
                </div>
            </ResponsiveDisplay>

            {/* MOBILE SCREENS */}
            <ResponsiveDisplay maxWidth={800}>
                <div className="flex w-[100%] overflow-x-auto gap-4 scrollbar-hide h-fit py-2">
                    {
                        props.details.map((detail: DetailsType, index: number) => (
                            // <motion.div
                            // key={detail.title} 
                            //     className="border rounded-2xl border-gray-400 flex flex-col w-[170px] items-center h-fit pb-3 cursor-pointer flex-shrink-0"
                            //     transition={{ duration: 0.5, ease: 'easeInOut' }}>
                            //     <Link href={`/product/${detail.title}`} className="w-[100%] bg-[#F0F0F0] py-2 flex justify-center items-center rounded-t-2xl">
                            //         <Image src={detail.image} alt={detail.title} width={100} height={100} />
                            //     </Link>
                            //     <p className="text-[14px] md:text-[16px] font-[400] mt-2">
                            //         {detail.title}
                            //     </p>
                            //     <p className="text-[16px] sm:[16px] font-bold mt-2 text-[#0D523F]">
                            //         &#8358; {detail.price}
                            //     </p>
                            //     <motion.button 
                            //         className=" flex gap-4 border-2 items-center justify-center mt-2 border-[#FEB100] py-3 w-[90%] rounded-lg"
                            //         whileFocus={{ backgroundColor: "#FEB100" }}
                            //         whileHover={{ backgroundColor: "#FEB100" }}
                            //         onClick={() => addProductToCart(detail)}
                            //         transition={{ duration: 0.5, ease: 'anticipate' }}>
                            //         <BsCart2 className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                            //         <p>
                            //             Add to cart
                            //         </p>
                            //     </motion.button>
                            // </motion.div>
                            <ProductCounter detail={detail} key={index} />
                        ))
                    }
                </div>
            </ResponsiveDisplay>
        </section>
    )
}

export default ProductCollection