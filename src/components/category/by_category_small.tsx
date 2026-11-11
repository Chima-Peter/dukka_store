"use client";


import { FaSort } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { DetailsType } from "../../types/cart_type";
import { ByCategoryTypes } from "../../types/category_type";
import SingleProductSmall from "../products/single_product/small";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Pagination from "../ui/pagination";



const ByCategorySmall = ({header, details, caller}: ByCategoryTypes) => {

     // state to control sorting list
     const [sortBy, setSortBy] = useState('Popularity')

     // state to open sorting box
     const [openSort, setOpenSort] = useState(false)
 
     const sortByList = [
         "Popularity", "Price: High to Low", "Price: Low to High", "Customer rating", "Most bought"
     ]

    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = details.slice(pageIndex, pageIndex + 10)
 
     // method to toggle sort box - open or close
     const toggleSort = () => {
         setOpenSort(!openSort)
     }
 
      // method to change active sort option
      const changeSortBy = (active: string) => {
         setSortBy(active)
     }

    return (
        <section className="flex flex-col bg-[#F0F0F0] gap-8 font-main">
            <div className="flex flex-col w-[100%] p-4 sm:p-6 md:p-6 bg-white">
                <h1 className="text-[24px] font-[600] mb-1 capitalize">
                    {header}
                </h1>
                {
                    caller === 'category' ? 
                    <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        Showing {pageIndex + 1} - {pageIndex + 10 < details.length ? pageIndex + 10 : details.length} of {details.length} items
                    </p> :  <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        {details.length} results found
                    </p>
                }
            </div>
            <section className="flex gap-2 justify-center w-[100%] px-4 sm:px-6 md:px-6 bg-white items-center">
                <button className="text-[16px] items-center font-[400] tracking-wide flex gap-3">
                    Filter
                    <IoFilter className="w-[20px] h-[20px]" />
                </button>
                <div className="h-[40px] w-[2px] bg-[#ADB1B1]" />
                <button className="text-[16px] items-center font-[400] tracking-wide flex gap-3 relative" onClick={toggleSort}>
                    Sort
                    <FaSort className="w-[13px] h-[16px]" />
                    {
                        openSort && <div className="flex flex-col bg-white shadow-lg gap-0 rounded-2xl border border-gray-200 w-[300px] absolute -top-1 z-10 -right-20">
                            <div className="w-[100%] flex justify-between items-center p-4 px-6 shadow-md">
                                <h2 className="text-[18px] 2xl:text-[20px] tracking-wider">
                                    Sort by
                                </h2>
                                <IoMdClose className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer" onClick={toggleSort}/>
                            </div>
                            <ul className="flex flex-col p-4 px-6 gap-2 pb-6">
                                {
                                    sortByList.map((field) => (
                                        <li className="flex items-center gap-3 cursor-pointer" key={field} onClick={() => changeSortBy(field)}>
                                            {
                                                sortBy === field ? <MdCheckBox className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer"  /> : <MdCheckBoxOutlineBlank className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer"  />
                                            }
                                            <p className="text-[14px] 2xl:text-[16px] tracking-wide font-[500]">
                                                {field}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </button>
            </section>
            <section className="w-[100%] p-4 sm:p-6 md:p-8 flex flex-col gap-4 bg-white">
                {
                    displayList.map((detail: DetailsType, index: number) => (
                        <SingleProductSmall
                            id={detail.id}
                            title={detail.title}
                            image={detail.image}
                            price={detail.price}
                            currency={detail.currency}
                            sold_out={detail.sold_out}
                            changeGrid={'1x3'}
                            key={`${index} -${detail.id || detail.title}`}
                        />
                    ))
                }
                {
                    displayList.length > 0 && <Pagination itemsPerPage={10} totalItems={details.length} onPageChange={setPage} />
                }
            </section>
        </section>
    )
}

export default ByCategorySmall