import Link from "next/link"
import { BsCart2 } from "react-icons/bs"

const EmptyCart = () => {
    return (
        <main className="flex flex-col gap-8 w-[100%] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] min-lg:w-[93%] self-center flex justify-center items-center bg-white h-[600px] xl:h-[700px] 2xl:h-[800px]">
                <div className="flex flex-col gap-4 py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 border border-gray-100 items-center w-[90%] sm:w-[400px] min-lg:w-[500px] drop-shadow-md xl:w-[600px]">
                    <BsCart2 className="w-12 h-12 min-lg:w-14 min-lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 text-[#FEB100]" />
                    <h2 className="text-[16px] min-lg:text-lg xl:text-xl font-medium">
                        Sorry your cart is empty
                    </h2>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[100%] sm:w-[80%] text-center">
                        Any goods you pick will be found here
                    </p>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[80%] text-center">
                        Or
                    </p>
                    <Link href={'/'} className="text-[14px] xs:text-[16px] xl:text-[24px] 2xl:text-[36px] text-black bg-[#FEB100] rounded-md py-3 pl-12 pr-2 w-fit font-urbanist">
                        Continue shopping
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default EmptyCart