"use client"


import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import { OrdersType } from "../../../../types/profile"
import { FiSearch } from "react-icons/fi"
import { useState } from "react"
import { IoFilter } from "react-icons/io5"
import OrderTemplate from "./order_template_small"
import ProductCollection from "@/components/products/products_collection"
import Pagination from "@/components/ui/pagination"



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


const OrdersSmall = () => {
    const ordersList: OrdersType[] = [
        {
            "order_id": "ORD12345",
            "date": "2025-01-28",
            "items": 3,
            "amount": 1500000.75,
            "status": "enroute"
        },
        {
            "order_id": "ORD12346",
            "date": "2025-01-27",
            "items": 1,
            "amount": 40910.99,
            "status": "delivered"
        },
        {
            "order_id": "ORD12347",
            "date": "2025-01-26",
            "items": 2,
            "amount": 89000.50,
            "status": "cancelled"
        },
        {
            "order_id": "ORD12348",
            "date": "2025-01-25",
            "items": 5,
            "amount": 220900.00,
            "status": "delivered"
        },
        {
            "order_id": "ORD12349",
            "date": "2025-01-24",
            "items": 4,
            "amount": 128000.99,
            "status": "enroute"
        },
        {
            "order_id": "ORD12350",
            "date": "2025-01-23",
            "items": 2,
            "amount": 75000.00,
            "status": "delivered"
        },
        {
            "order_id": "ORD12351",
            "date": "2025-01-22",
            "items": 6,
            "amount": 356000.45,
            "status": "enroute"
        },
        {
            "order_id": "ORD12352",
            "date": "2025-01-21",
            "items": 3,
            "amount": 20000.99,
            "status": "cancelled"
        },
        {
            "order_id": "ORD12353",
            "date": "2025-01-20",
            "items": 5,
            "amount": 170050.60,
            "status": "delivered"
        },
        {
            "order_id": "ORD12354",
            "date": "2025-01-19",
            "items": 1,
            "amount": 30500.75,
            "status": "enroute"
        },
        {
            "order_id": "ORD12355",
            "date": "2025-01-18",
            "items": 4,
            "amount": 145000.20,
            "status": "delivered"
        },
        {
            "order_id": "ORD12356",
            "date": "2025-01-17",
            "items": 3,
            "amount": 110300.00,
            "status": "cancelled"
        },
        {
            "order_id": "ORD12357",
            "date": "2025-01-16",
            "items": 7,
            "amount": 400500.90,
            "status": "delivered"
        },
        {
            "order_id": "ORD12358",
            "date": "2025-01-15",
            "items": 2,
            "amount": 85000.30,
            "status": "enroute"
        },
        {
            "order_id": "ORD12359",
            "date": "2025-01-14",
            "items": 5,
            "amount": 190700.75,
            "status": "cancelled"
        }
    ]

    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = ordersList.slice(pageIndex, pageIndex + 10)


    // state to collect order query
    const [orderQuery, setOrderQuery] = useState<string>("")

    // managing active filter
    const [activeFilter, setActiveFilter] = useState('All')
    

    // state to open or close filter box
    const [openFilters, setOpenFilters] = useState(false)

    const filterList = [
        "All", "Completed", "Cancelled"
    ]


    // method to collect user search for order
    const collectOrderQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderQuery(event.target.value)
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setOrderQuery("")
    }

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
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <Link href={'/profile'}  className="h-fit w-fit">
                        <BsArrowLeft className="cursor-pointer w-[38px] h-[25px] md:w-[50px] md:h-[30px]" />
                    </Link>
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Orders
                    </h1>
                    <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        {ordersList.length} orders
                    </p>
                </section>
                <section className="bg-white px-4 sm:px-6 md:px-8 flex justify-between relative w-[100%] items-center">
                    <form noValidate onSubmit={handleSubmit} className="flex border rounded-lg border-[#ADB1B1] focus-within:border-gray-100 focus-within:shadow-md w-[72%] sm:w-[77%] font-urbanist relative">
                        <input onChange={collectOrderQuery} value={orderQuery} type="search" name="search" id="search" placeholder="Search for an order" autoComplete="off" className="w-[100%] text-[16px] md:text-[18px] focus:shadow-lg outline-none placeholder:tracking-wide h-[40px] md:h-[50px] px-6  rounded-l-lg" />
                        <button type="submit"  className="rounded-r-lg bg-[#F9F9F9] border-l border-l-[#ADB1B1] min-lg:py-2 px-6">
                            <FiSearch className="w-5 h-5 text-black xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                        </button>
                    </form>

                    <button className="border border-[#ADB1B1] h-[40px] md:h-[50px] rounded-md bg-[#F9F9F9] w-[25%] sm:w-[20%] text-[16px] flex items-center gap-2 tracking-wide justify-center relative" onClick={toggleFilterDisplay}>
                        <IoFilter className="w-[14px] h-[14px]" />
                        Filter
                        {
                            openFilters && <ul className="w-[150px] h-fit bg-[#F9F9F9] flex flex-col gap-1 p-1 shadow-md border-[1px] border-gray-300 rounded-md absolute top-11 right-0 md:top-[52px]" >
                                {
                                    filterList.map((filter, index: number) => (
                                        <li key={filter} className={`w-[100%] py-3 hover:bg-[#FEB100] text-[16px] cursor-pointer border border-gray-300 rounded-md text-center tracking-wide font-[400] ${activeFilter === filter ? 'bg-[#FEB100]' : 'bg-white'} `} onClick={() => {updateActiveFilter(index)}}>
                                            {filter}
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </button>
                </section>
                <section className="bg-white px-4 sm:px-6 md:px-8 flex w-[100%] flex-col flex-wrap md:flex-row gap-y-4 md:justify-between">
                    {
                        displayList.map((order) => (
                            <OrderTemplate order={order} key={order.order_id} />
                        ))
                    }
                </section>
                {
                    ordersList.length > 0 && <Pagination itemsPerPage={10} totalItems={ordersList.length} onPageChange={setPage} />
                }
            </section>
            <ProductCollection header="Recommended for you" link="/category/fish and stock" details={fish_and_stock_product} />
        </main>
    )
}

export default OrdersSmall