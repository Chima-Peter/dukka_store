"use client"


import { useState } from "react"
import { DetailsType } from "../../../types/cart_type"
import SingleProduct from "@/components/products/single_product/large"
import { ByCategoryTypes } from "../../../types/category_type"
import Pagination from "@/components/ui/pagination"


const FavouriteLarge = ({header, details}: ByCategoryTypes) => {
    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = details.slice(pageIndex, pageIndex + 10)
    
    return (
        <section className="w-[74%] h-fit flex flex-col gap-8 pb-4 border border-[#ADB1B1] rounded-xl">
            <div className="flex justify-between py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="font-[500] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                    {header}
                </h1>
                <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                    {details.length} Products
                </p>
            </div>
            <section className="flex w-[100%] justify-between flex-wrap gap-y-6 pb-8 px-2">
                {
                    displayList.map((field: DetailsType, index: number) => (
                        <SingleProduct title={field.title} image={field.image} price={field.price} changeGrid={'3x3'} key={`${index} -${field.title}`} />
                    ))
                }
            </section>
            {
                details.length > 0 && <Pagination itemsPerPage={10} totalItems={details.length} onPageChange={setPage} />
            }
        </section>
    )
}

export default FavouriteLarge