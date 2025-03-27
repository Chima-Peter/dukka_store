"use client"

import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import addCommasToInt from "../../../../utils/add_commas_to_int"
import OrderDetailsDelivery from "../../desktop/orders/order_details_delivery"
import { useState } from "react"
import OrderDetailsItems from "./order_details_items"
import OrderDetailsCustomer from "./order_details_customers"
import { usePathname } from "next/navigation"


const OrderDetails = () => {
    // state to track and set active tab
    const [activeIndex, setActiveIndex] = useState<number>(0)

    // collect the id from url
    const orderId = usePathname().split("/")[3]

    const orderDetailsList = [
        "Order ID", "Order Date", "Delivery Status", "Amount"
    ]
    const orderTabList = [
        {
            header: "Items"
        },
        {
            header: "Delivery"
        },
        {
            header: "Customer"
        }
    ]

    const orderDetailComponents = [
        <OrderDetailsItems key={0} />,
        <OrderDetailsDelivery key={1} />,
        <OrderDetailsCustomer key={2} />
    ]

    const changeActiveIndex = (index: number) => {
        setActiveIndex(index)
    }



    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <Link href={'/profile/order'}  className="h-fit w-fit">
                        <BsArrowLeft className="cursor-pointer w-[38px] h-[25px] md:w-[50px] md:h-[30px]" />
                    </Link>
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Order details: {orderId}
                    </h1>
                    <p className="tracking-wide text-[16px] font-[500] text-[#646767]">
                        orders
                    </p>
                </section>

                <div className="flex justify-between items-center p-4 w-[92%] self-center border border-[#ADB1B1] rounded-lg">
                    <ul className="flex flex-col gap-3">
                        {
                            orderDetailsList.map((detail) => (
                                <li key={detail} className="font-[500] text-[16px] xs:text-[18px] md:text-[24px] tracking-wide text-[#888B8B]">
                                    {detail}:
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="font-[500] text-[18px] md:text-[24px] text-[#101111]">
                            VNB22346780
                        </li>
                        <li className="tracking-wide text-[18px] md:text-[24px] text-[#101111]">
                            May-13-2024
                        </li>
                        <li className={`text-[14px] md:font-[16px] w-fit px-3 text-center font-[500] p-1 capitalize rounded-md bg-[#C5FFB7]`}>
                            Delivered
                        </li>
                        <li className="tracking-wide text-[18px] md:text-[24px] text-[#101111]">
                            &#8358;{addCommasToInt(124678)}
                        </li>
                    </ul>
                </div>

                <section className="flex flex-col gap-4 pb-4 w-[100%] items-center">
                    <section className="w-[92%] self-center rounded-lg flex flex-col border border-[#ADB1B1]">
                        <div className="w-[100%] py-3 justify-between px-4 sm:px-6 md:px-8 flex gap-12 border-b-[#ADB1B1] border-b">
                            {
                                orderTabList.map((field, index: number) => (
                                    <button key={field.header} className={`font-[500] tracking-wide text-[16px] xs:text-[18px] md:text-[24px] ${activeIndex === index ? 'text-[#FEB100]' : 'text-[#9B9692]'} `} onClick={() => changeActiveIndex(index)}>
                                        {field.header}
                                    </button>
                                ))
                            }
                        </div>
                        {orderDetailComponents[activeIndex]}
                    </section>
                    <div className="flex flex-col gap-3 w-[92%] px-6 pt-3 pb-5 rounded-lg border border-[#ADB1B1] font-urbanist">
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400] tracking-wide">
                                Subtotal
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500] w-[100px] tracking-wide">
                                &#8358;128,945
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center ">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400] tracking-wide">
                                Discount
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500] w-[100px] tracking-wide">
                                &#8358;0
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400] tracking-wide">
                                Tax
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500] w-[100px] tracking-wide">
                                &#8358;1,500
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center mt-2 py-1 border-y border-y-[#ADB1B1]">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400] tracking-wide">
                                Grand Total
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500] w-[100px] tracking-wide">
                                &#8358;12,400
                            </h4>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default OrderDetails