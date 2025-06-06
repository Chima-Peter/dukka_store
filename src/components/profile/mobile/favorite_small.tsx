"use client"

import { useState } from "react"
import { DetailsType } from "../../../types/cart_type"
import SingleProductSmall from "@/components/products/single_product/small"
import Pagination from "@/components/ui/pagination"
import BackButton from "@/components/ui/back_button"

// we only want to access this screen on a mobile device so we ensure user cannot come here on desktop screens using search navigation
const FavoriteSmall = () => {

    const details = [
        { title: "Maple-Glazed Ham", price: "4,111", image: "/images/home_page/smoked_beef.webp" },
        { title: "Wood-Fired Pizza", price: "8,534", image: "/images/home_page/kilishi.webp" },
        { title: "Chimichurri-Grilled Shrimp", price: "6,244", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Roasted Venison", price: "12,482", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Spicy Chicken Wings", price: "16,314", image: "/images/home_page/smoked_beef.webp" },
        { title: "Spicy Chicken Wings", price: "5,241", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "BBQ Pulled Pork", price: "8,5310", image: "/images/home_page/smoked_beef.webp" },
        { title: "Roasted Turkey Legs", price: "11,943", image: "/images/home_page/smoked_beef.webp" },
        { title: "Peppercorn-Crusted Steak", price: "12,800", image: "/images/home_page/kilishi.webp" },
        { title: "Roasted Turkey Legs", price: "14,103", image: "/images/home_page/smoked_beef.webp" },
        { title: "Barbecued Pork", price: "3,793", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Smoked Cheese Platter", price: "5,491", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Mackerel", price: "4,182", image: "/images/home_page/smoked_beef.webp" },
        { title: "Maple-Glazed Ham", price: "9,881", image: "/images/home_page/smoked_beef.webp" },
        { title: "Charred Salmon", price: "3,282", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Goat Meat", price: "18,790", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Maple-Glazed Ham", price: "17,369", image: "/images/home_page/smoked_beef.webp" },
        { title: "Maple-Glazed Ham", price: "5,628", image: "/images/home_page/smoked_beef.webp" },
        { title: "Chimichurri-Grilled Shrimp", price: "4,222", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Cheese Platter", price: "10,135", image: "/images/home_page/kilishi.webp" },
        { title: "Charred Sweet Corn", price: "6,923", image: "/images/home_page/kilishi.webp" },
        { title: "Slow-Cooked Lamb Shank", price: "13,192", image: "/images/home_page/kilishi.webp" },
        { title: "Smoked Goat Meat", price: "5,662", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Wood-Fired Pizza", price: "19,669", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Smoked Duck", price: "19,545", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Smoked Duck", price: "4,679", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Guinea Fowl", price: "10,674", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Smoked Guinea Fowl", price: "16,073", image: "/images/home_page/smoked_beef.webp" },
        { title: "Herb-Crusted Chicken", price: "12,527", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Charred Salmon", price: "6,983", image: "/images/home_page/smoked_goat_meat.webp" },
    ] 


    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = details.slice(pageIndex, pageIndex + 10)
    
    return (
        <main className="flex flex-col w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-8 pb-4 pt-4 bg-white">

                <section className="bg-white px-4 sm:px-6 md:px-8 py-4 flex  justify-between relative w-[100%] items-center">
                   <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Favorite
                    </h1>
                    <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        {details.length} items
                    </p>
                </section>
                <section className="flex w-[100%] justify-between flex-wrap gap-y-6 px-2">
                    {
                        displayList.map((field: DetailsType, index: number) => (
                            <SingleProductSmall title={field.title} image={field.image} price={field.price}  key={`${index} -${field.title}`} profile={true} />
                        ))
                    }
                </section>
                {
                    details.length > 0 && <Pagination itemsPerPage={10} totalItems={details.length} onPageChange={setPage} />
                }
            </section>
        </main>
    )
}

export default FavoriteSmall