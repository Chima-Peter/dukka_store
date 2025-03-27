import Link from "next/link"
import ProductCollection from "../products/products_collection"
import Image from "next/image"


const SearchResultNotFound = () => {
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

    return (
        <main className="flex flex-col gap-8 w-[100%] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] min-lg:w-[93%] self-center flex justify-center items-center bg-white h-[600px] xl:h-[700px] 2xl:h-[800px]">
                <div className="flex flex-col gap-4 py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 border border-gray-100 items-center w-[90%] sm:w-[400px] min-lg:w-[500px] drop-shadow-md xl:w-[600px]">
                    <Image width={100} height={100} src="/images/search/not_found.svg" alt="Search result not found" />
                    <h2 className="text-lg min-lg:text-xl xl:text-2xl font-medium">
                        No result could be found for 
                    </h2>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[100%] sm:w-[80%] text-center">
                        Keep calm and try searching for more general terms or shop from the categories.
                    </p>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[80%] text-center">
                        Or
                    </p>
                    <Link href={'/'} className="text-[14px] xs:text-[16px] xl:text-[24px] 2xl:text-[36px] text-black bg-[#FEB100] rounded-md py-3 pl-12 pr-2 w-fit font-urbanist">
                        Continue shopping
                    </Link>
                </div>
            </section>


            <ProductCollection header="You might also like" link="/category/fish and stock" details={fish_and_stock_product} />
        </main>
    )
}

export default SearchResultNotFound