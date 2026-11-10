import Link from "next/link";
import HomeProductSections from "@/components/home/home_product_sections";

const HomePage = () => {
    return (
        <main className="bg-[#F0F0F0] flex flex-col gap-8 w-[100%] items-center pb-12 pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px]">
            <section className="bg-gradient-to-br from-white via-[#F7F7F7] to-[#E9EBEB] w-[92%] flex flex-col gap-2 rounded-2xl border border-gray-100 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 mx-12">
                <section className="flex flex-col min-lg:flex-row w-[100%] justify-between items-center gap-10 font-urbanist">
                    <div className="flex flex-col gap-4 max-w-[720px]">
                        <p className="text-[16px] sm:text-[18px] font-medium tracking-wide text-[#0D523F]">
                            Dukka.Store
                        </p>
                        <h1 className="font-semibold text-[2.5rem] xs:text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] leading-none text-[#0D523F]">
                            Shop what you need
                        </h1>
                        <p className="border-l-4 border-l-[#FEB100] pl-4 text-[18px] sm:text-[20px] min-lg:text-[22px] mb-2 leading-relaxed tracking-wide font-light text-gray-700">
                            Browse live catalog, add to cart, and checkout securely —
                            powered by Dukka commerce.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/category/all"
                                className="text-[14px] sm:text-[16px] min-lg:text-[18px] text-black bg-[#FEB100] rounded-md py-3 px-8 w-fit font-medium"
                            >
                                Browse products
                            </Link>
                            <Link
                                href="/cart"
                                className="text-[14px] sm:text-[16px] min-lg:text-[18px] text-[#0D523F] bg-white border border-[#0D523F] rounded-md py-3 px-8 w-fit font-medium"
                            >
                                View cart
                            </Link>
                        </div>
                    </div>
                    <div className="w-full min-lg:w-[40%] rounded-2xl border border-[#ADB1B1] bg-white p-8 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-[#0D523F]">Why shop here</h2>
                        <ul className="flex flex-col gap-3 text-[16px] text-gray-700">
                            <li>Secure Paystack checkout</li>
                            <li>Guest and account carts</li>
                            <li>Market-aware pricing</li>
                            <li>Order tracking in your profile</li>
                        </ul>
                    </div>
                </section>
            </section>

            <HomeProductSections />
        </main>
    );
};

export default HomePage;
