import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Link from "next/link";

export const metadata = {
    title: "Payment successful - Dukka.store",
    description: "Your payment was successful! Your order is now processed.",
};

const PaymentSuccessPage = async () => {
    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[93%] self-center flex justify-center items-center bg-white h-[600px] xl:h-[700px] 2xl:h-[800px]">
                <div className="flex flex-col gap-4 py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 border border-gray-100 items-center w-[90%] sm:w-[400px] min-lg:w-[500px] drop-shadow-md xl:w-[600px]">
                    <IoCheckmarkCircleOutline className="w-10 h-10 min-lg:w-14 min-lg:h-14 2xl:w-20 2xl:h-20 text-[#FEB100]" />
                    <h2 className="text-lg min-lg:text-xl xl:text-2xl font-medium">
                        Payment successful
                    </h2>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[60%] text-center">
                        Thank you for your patronage. Our logistics team is processing your order.
                    </p>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] sm:w-[80%] md:w-[80%] text-center">
                        While you wait
                    </p>
                    <Link
                        href="/"
                        className="text-[14px] xs:text-[16px] xl:text-[24px] 2xl:text-[36px] text-black bg-[#FEB100] rounded-md py-3 pl-12 pr-2 w-fit font-urbanist"
                    >
                        Continue shopping
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default PaymentSuccessPage;
