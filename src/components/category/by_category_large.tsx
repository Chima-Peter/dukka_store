"use client"

import { useEffect, useState } from "react"
import { BsChevronDoubleRight, BsGrid3X3GapFill } from "react-icons/bs"
import { FaChevronRight } from "react-icons/fa6"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import Link from "next/link"
import { DetailsType } from "@/types/cart_type"
import SingleProduct from "../products/single_product/large"
import { ByCategoryTypes } from "../../types/category_type"
import Pagination from "../ui/pagination"
import Image from "next/image"


const ByCategoryLarge = ({header, details, caller, link}: ByCategoryTypes) => {
    // state to control grid display
    const [grid, setGrid] = useState('3x3')

    // state to control sorting list
    const [sortBy, setSortBy] = useState('Popularity')

    // state to open sorting box
    const [openSort, setOpenSort] = useState(false)

    const [length, setLength] = useState(9)

    const sortByList = [
        "Popularity", "Price: High to Low", "Price: Low to High", "Customer rating", "Most bought"
    ]

    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * length) - length

    const [detailsList, setDetailsList] = useState<DetailsType[]>(details.slice(0, length - 1))

    // method to change grid, change styling display and also length of grid items to display
    const toggleGrid = (method: string, length: number) => {
        setGrid(method)
        setLength(length)
        setDetailsList(details.slice(pageIndex, (pageIndex + length))) // when user clicks on any grid pattern, we ensure that the displayed list is either a 3x3 matrix of 9 elements or a 2x2 matrix of 8 elements. We do this with (1): start number which would be changed when pagination is changed and (2): the length which is a sum of start number and number sent from the grid ie page 1 = 0 + 8 for 2x2 matrix, page 2 = 8 + 8 for 2x2 matrix.
    }

    // method to toggle sort box - open or close
    const toggleSort = () => {
        setOpenSort(!openSort)
    }

    // method to change active sort option
    const changeSortBy = (active: string) => {
        setSortBy(active)
    }

    useEffect(() => {
        setDetailsList(details.slice(pageIndex, (pageIndex + length)))
    }, [details, length, page, pageIndex])

    
    return (
        <section>
            <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-4">
                <p className="flex items-center gap-1 pb-2 border-b-[1.4px] border-b-gray-300">
                    <Link className="text-[13px] opacity-75 font-normal" href="/"> Home </Link> <strong className="opacity-65"> <BsChevronDoubleRight className="w-3 h-3" /> </strong> <Link href={link || ''} className="text-[16px] font-[500] tracking-wide capitalize">{header}</Link>
                </p>
            </section>
            
            <section className="w-[100%] flex bg-white justify-between py-8 px-4 sm:px-6 md:px-8 min-lg:px-12 xl:px-14 2xl:px-16">
                <section className="flex flex-col border border-[#ADB1B1] w-[25%] rounded-xl h-fit">
                    <h2 className="text-[16px] xl:text-[18px] 2xl:text-[20px] font-[600] py-4 border-b border-b-[#ADB1B1] px-10">
                        Filter
                    </h2>
                    <ul className="flex flex-col">
                        <li className="flex justify-between items-center px-10 py-4 border-b border-b-[#ADB1B1] cursor-pointer">
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] font-[400]">
                                Price
                            </p>
                            <FaChevronRight className="w-5 h-5 text-[#888B8B]" />
                        </li>
                        <li className="flex justify-between items-center px-10 py-4 border-b border-b-[#ADB1B1] cursor-pointer">
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] font-[400]">
                                Rating
                            </p>
                            <FaChevronRight className="w-5 h-5 text-[#888B8B]" />
                        </li>
                        <li className="flex justify-between items-center px-10 py-4 border-b border-b-[#ADB1B1] cursor-pointer">
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] font-[400]">
                                Size
                            </p>
                            <FaChevronRight className="w-5 h-5 text-[#888B8B]" />
                        </li>
                        <li className="flex justify-between items-center px-10 py-4 border-b border-b-[#ADB1B1] cursor-pointer">
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] font-[400]">
                                Category
                            </p>
                            <FaChevronRight className="w-5 h-5 text-[#888B8B]" />
                        </li>
                        <li className="flex justify-between items-center px-10 py-4 cursor-pointer">
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] font-[400]">
                                Brand
                            </p>
                            <FaChevronRight className="w-5 h-5 text-[#888B8B]" />
                        </li>
                    </ul>
                </section>
                <section className="w-[72%] h-fit flex flex-col gap-8 pb-4 border border-[#ADB1B1] rounded-xl">
                    <div className="flex flex-col gap-2 py-3 pt-6 border-b-[5px] border-gray-300 w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                        <h1 className="font-[600] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                            {header}
                        </h1>
                        {
                            caller === 'category' ? 
                            <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                                Showing {pageIndex + 1} - {pageIndex + length < details.length ? pageIndex + length : details.length} of {details.length} items
                            </p> : <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                                {details.length} results found
                            </p>
                        }
                    </div>
                    <div className="w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 flex justify-between border-b border-b-gray-300 pb-2">
                        <div className="flex gap-4">
                            <button onClick={() => toggleGrid('3x3', 9)}>
                                <BsGrid3X3GapFill className={`w-[32px] h-[32px] ${grid === '3x3' ? 'text-[#FEB100]' : 'text-[#ADB1B1]'}`} />
                            </button>
                            <button onClick={() => toggleGrid('1x3', 8)}>
                                {
                                    grid === '1x3' ? <Image src="/images/category/second_grid_active.svg" alt="1x3 grid display" className={`w-[36px] h-[36px]`} width={36} height={36} /> : <Image src="/images/category/second_grid.svg" alt="1x3 grid display" className={`w-[36px] h-[36px]`} width={36} height={36} />
                                }
                            </button>
                        </div>
                        <button className="py-3 h-fit px-4 rounded-md border border-[#ADB1B1] text-[16px] font-[400] 2xl:text-[18px] flex items-center gap-2 tracking-wider relative" onClick={toggleSort}>
                            Sort by: {sortBy} <IoIosArrowDown />
                            {
                                openSort && <div className="flex flex-col bg-white shadow-lg gap-0 rounded-2xl border border-gray-200 w-[300px] absolute -top-1 -left-10 z-1-">
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
                    </div>
                    <section
                        className={`grid w-full gap-x-3 gap-y-5 px-2 pb-8 sm:gap-x-4 ${
                            grid === "1x3"
                                ? "grid-cols-1 md:grid-cols-2"
                                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                        }`}
                    >
                        {detailsList.map((field: DetailsType, index: number) => (
                            <div
                                key={`${index}-${field.id || field.title}`}
                                className="min-w-0"
                            >
                                <SingleProduct
                                    id={field.id}
                                    title={field.title}
                                    image={field.image}
                                    price={field.price}
                                    currency={field.currency}
                                    sold_out={field.sold_out}
                                    market_variant_id={field.market_variant_id}
                                    changeGrid={grid}
                                />
                            </div>
                        ))}
                    </section>
                    {
                        detailsList.length > 0 && <Pagination itemsPerPage={length} totalItems={details.length} onPageChange={setPage} />
                    }
                </section>
            </section>
        </section>
    )
}

export default ByCategoryLarge