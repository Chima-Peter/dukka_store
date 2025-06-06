import Link from "next/link"
import Image from "next/image"
import ProductCollection from "@/components/products/products_collection"
import { fish_and_stock_product, grains_and_cereal_products, services_excerpts } from "@/utils/sample_data"


const HomePage = () => {
    
  return (
    <main className="bg-[#F0F0F0] flex flex-col gap-8 w-[100%] items-center pb-12 pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px]">
        <section className="bg-gradient-to-b from-white to-[#F0F0F0] w-[92%] flex flex-col gap-2 rounded-2xl border border-gray-100  py-12 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 mx-12">
            <section className="flex flex-col min-lg:flex-row w-[100%] justify-center 2xl:justify-between gap-8 font-urbanist">
                <div className="flex gap-0 items-start">
                    <Image width={92} height={89} src="/images/home_page/plus.svg" alt="plus icon" className="hidden min-lg:block aspect-square -translate-y-12 translate-x-4" />
                    <div className="flex flex-col gap-4 ">
                        <p className="text-[16px] sm:text-[20px] font-medium tracking-wide font-Philosopher">
                            Our Products Are
                        </p>
                        <h1 className="font-Philosopher font-semibold text-[3rem] xs:text-[4rem] sm:text-[5rem] md:text-[6rem] min-lg:w-[650px] xl:w-[750px] leading-none text-[#0D523F]">
                            Fresh From The Farm
                        </h1>
                        <p className="border-l-4 border-l-[#4C3700] pl-4 text-[20px] sm:text-[22px] min-lg:text-[24px] mb-2 leading-normal xl:leading-relaxed tracking-wide font-urbanist w-[100%] min-lg:w-[540px] xl:w-[640px] 2xl:w-[900px] font-light">
                            Truly no place like home, but home can come
                            to you anywhere you’re. That’s why we bring 9ja 
                            food ingredients to you.
                        </p>
                        <Link href={'/'} className="text-[14px] xs::text-[16px] sm:text-[18px] min-lg:text-[20px] xl:text-[24px] text-black bg-[#FEB100] rounded-md py-3 pl-12 pr-4 w-fit font-urbanist">
                            Start shopping
                        </Link>
                    </div>
                </div>
                <div className="relative">   
                    <Image src="/images/home_page/home_image_bg.webp" alt="vector" className="w-[100%]" width={684} height={566}  />
                    <Image src="/images/home_page/home_image.webp" alt="An image showing some rich produce from our farms."  className="absolute z-10 top-4 w-[100%] " width={640} height={455} />
                </div>
            </section>
        </section>

        <ProductCollection header="Fish and Stock" link="/category/fish and stock" details={fish_and_stock_product} />


        <ProductCollection header="Grains and Cereals" link="/category/grains and cereal" details={grains_and_cereal_products} />

        <ProductCollection header="Grains and Cereals" link="/category/grains and cereal" details={grains_and_cereal_products} />

        <ProductCollection header="Grains and Cereals" link="/category/grains and cereal" details={grains_and_cereal_products} />

        <section className="w-[100%] min-lg:w-[90%] flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between font-urbanist">
            {
                services_excerpts.map((service) => (
                    <div className="flex w-[90%] self-center lg:w-[32%] h-[100%] gap-6 lg:gap-3 xl:gap-4 bg-[#E9EBEB] border-[#ADB1B1] border rounded-xl py-3 px-6 lg:px-2 xl:px-6 items-start" key={service.header}>
                        <Image src={service.icon} alt={service.header} className=""  width={40} height={40}/>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[18px] lg:text-[20px] xl:text-2xl tracking-wide leading-relaxed font-normal">
                                {service.header}
                            </h3>
                            <p className="text-[16px] w-[100%] lg:text-18px xl:text-[20px] tracking-wide leading-relaxed font-normal">
                                {service.text}
                            </p>
                        </div>
                    </div>
                ))
            }
        </section>
    </main>
  )
}

export default HomePage