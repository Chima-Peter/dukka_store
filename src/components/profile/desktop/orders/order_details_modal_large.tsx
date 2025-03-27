"use client"

import React, { useState } from "react"
import { MdOutlineCancel } from "react-icons/md"
import OrderDetails_Order from "./order_details_order"
import OrderDetailsDelivery from "./order_details_delivery"
import OrderDetailsCustomer from "../../mobile/orders/order_details_customers"

const OrderDetailsModal = ({ setOrderModal, orderId }: { setOrderModal: React.Dispatch<React.SetStateAction<boolean>>, orderId: string }) => {
    // state to track and set active tab
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const orderDetailsList = [
        "Order ID", "Order Date", "Delivery Status", "Payment Method", "Transaction ID"
    ]
    const orderTabList = [
        {
            header: "Order"
        },
        {
            header: "Delivery"
        },
        {
            header: "Customer"
        }
    ]

    const orderDetailComponents = [
        <OrderDetails_Order key={0} />,
        <OrderDetailsDelivery key={1} />,
        <OrderDetailsCustomer key={2} />
      ]

    const changeActiveIndex = (index: number) => {
        setActiveIndex(index)
    }

    const closeModal = () => {
        setOrderModal(false)
    }
    // ${order.status === "delivered" && 'bg-[#C5FFB7]'} ${order.status === "enroute" && 'bg-[#FFFCB7] text-[#686403]'} ${order.status === "cancelled" && 'bg-[#FFD5B7] text-[#740606]'}
    

    
    return (
        <section className="h-[100vh] backdrop-brightness-50 w-[100%] z-50 fixed backdrop-blur-sm left-0 top-0 flex items-center justify-center">
            <section className="w-[600px] max-w-[900px] z-50 max-h-[500px] flex flex-col bg-white gap-4 scrollbar-hide overflow-y-auto relative">
                <div className="bg-[#F9F9F9] flex w-[100%] justify-between items-center z-30 py-4 px-6 sticky top-0">
                    <h3 className="min-lg:text-[18px] xl:text-[20px] font-[400] tracking-wide">
                        Order details{orderId}
                    </h3>
                    <button onClick={closeModal}>
                        <MdOutlineCancel className="w-[28px] h-[28px]" />
                    </button>
                </div>
                
                <div className="flex justify-between items-center px-6 w-max gap-10">
                    <ul className="flex flex-col gap-3">
                        {
                            orderDetailsList.map((detail) => (
                                <li key={detail} className="font-[300] text-[18px] xl:text-[20px] tracking-wide text-[#9B9692]">
                                    {detail}:
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="font-[600] text-[24px] xl:text-[26px]">
                            VNB22346780
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            May-13-2024   18:24
                        </li>
                        <li className={`text-[14px] xl:font-[16px] w-fit px-3 text-center font-[400] p-1 capitalize rounded-md bg-[#C5FFB7]`}>
                            Delivered
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            Bank Transfer
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            235476
                        </li>
                    </ul>
                </div>

                <section className="w-[100%] flex flex-col gap-2">
                    <div className="w-[100%] border-b border-b-[#ADB1B1] py-2 px-6 flex gap-12">
                        {
                            orderTabList.map((field, index: number) => (
                                <button key={field.header} className={`font-[400] tracking-wide text-[18px] xl:text-[20px] ${activeIndex === index ? 'text-[#FEB100]' : 'text-[#9B9692]'}`} onClick={() => changeActiveIndex(index)}>
                                    {field.header}
                                </button>
                            ))
                        }
                    </div>
                    {orderDetailComponents[activeIndex]}
                    <div className="flex flex-col gap-3 w-full px-6 py-5 bg-[#F9F9F9]">
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Subtotal
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600] w-[100px] tracking-wide">
                                &#8358;128,945
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center ">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Discount
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600] w-[100px] tracking-wide">
                                &#8358;0
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Tax
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600] w-[100px] tracking-wide">
                                &#8358;1,500
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center mt-2 py-1 border-y border-y-[#ADB1B1]">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Grand Total
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600] w-[100px] tracking-wide">
                                &#8358;12,400
                            </h4>
                        </div>
                    </div>
                </section>
            </section>
            <section className="w-[100%] fixed min-h-[100vh] top-0 left-0 z-40" onClick={() => setOrderModal(false)} />
        </section>        
    )
}

export default OrderDetailsModal