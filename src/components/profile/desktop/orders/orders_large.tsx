"use client"


import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoFilter } from "react-icons/io5"
import { OrdersType } from "../../../../types/profile"
import OrderTemplate from "./order_template_large"
import Pagination from "@/components/ui/pagination"


const OrdersLarge = ({ orders }: { orders: OrdersType[] }) => {
    // managing active filter
    const [activeFilter, setActiveFilter] = useState('All')
    
    // state to open or close filter box
    const [openFilters, setOpenFilters] = useState(false)

    const filterList = [
        "All", "Completed", "Cancelled"
    ]

    const orderHeader = [
        "#", "Order Id", "Date", "Items", "Total amount", "Status", "More"
    ]

    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = orders.slice(pageIndex, pageIndex + 10)

    // method to open filter box display
    const toggleFilterDisplay = () => {
        setOpenFilters(!openFilters)
    }


    // method to update active filter and close box
    const updateActiveFilter = (index: number) => {
        setActiveFilter(filterList[index])
        setOpenFilters(false)
    }


    return (
        <section className="w-[74%] h-fit flex flex-col gap-8 pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex justify-between py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="font-[500] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                    Order
                </h1>
                <div className="flex items-center gap-4">
                    <button className="border border-[#ADB1B1] rounded-md bg-[#F9F9F9] w-14 h-10 flex justify-center items-center">
                        <CiSearch className="w-5 h-5" />
                    </button>
                    <button className="border border-[#ADB1B1] rounded-md bg-[#F9F9F9] w-24 h-10 text-[16px] flex items-center gap-2 tracking-wide justify-center relative" onClick={toggleFilterDisplay}>
                        <IoFilter className="w-[14px] h-[14px]" />
                        Filter
                        {
                            openFilters && <ul className="w-fit h-fit bg-[#F9F9F9] flex flex-col gap-1 p-1 shadow-md border-[1px] border-gray-300 rounded-md absolute top-11" >
                                {
                                    filterList.map((filter, index: number) => (
                                        <li key={filter} className={`w-[150px] py-3 hover:bg-[#FEB100] text-[16px] cursor-pointer border border-gray-300 rounded-md text-center tracking-wide font-[400] ${activeFilter === filter ? 'bg-[#FEB100]' : 'bg-white'}`} onClick={() => {updateActiveFilter(index)}}>
                                            {filter}
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </button>
                </div>
            </div>

            <section className="pt-4 pb-6 flex flex-col gap-6">
                <ul className="w-[100%] flex justify-between items-center bg-[#F9F9F9] py-4">
                    {
                        orderHeader.map((header) => (
                            <li className={`text-[16px] xl:font-[18px] 2xl:font-[20px] text-[#646767] last:text-center tracking-wide font-[400] first:w-[7%] ${header === "Items" ? 'w-[7%]' : 'w-[15%]'} ${header === "Total amount" ? 'w-[20%] pl-4' : 'w-[15%]'} last:w-[10%] w-[15%] first:text-center hover:text-black`} key={header}>
                                {header}
                            </li>
                        ))
                    }
                </ul>
                <section className="flex flex-col w-[100%] border-t border-t-[#ADB1B1]">
                    {
                        displayList.map((order, index: number) => (
                            <OrderTemplate key={`${index}-${order.id}`} order={order} tracker={pageIndex + 1} index={index}/>
                        ))
                    }
                </section>
                {
                    orders.length > 0 && <Pagination itemsPerPage={10} totalItems={orders.length} onPageChange={setPage} />
                }
            </section>
        </section>
    )
}

export default OrdersLarge