"use client";

import addCommasToInt from "../../../../utils/add_commas_to_int";
import OrderDetailsDelivery from "../../desktop/orders/order_details_delivery";
import { useState } from "react";
import OrderDetailsItems from "./order_details_items";
import OrderDetailsCustomer from "./order_details_customers";
import { useParams } from "next/navigation";
import BackButton from "@/components/ui/back_button";
import { useGetOrderQuery } from "@/redux/services/orders_api";

const OrderDetails = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const params = useParams<{ orderID: string }>();
    const orderId = params.orderID;
    const { data: order, isLoading, error } = useGetOrderQuery(orderId, {
        skip: !orderId,
    });

    const orderDetailsList = ["Order ID", "Order Date", "Delivery Status", "Amount"];
    const orderTabList = [{ header: "Items" }, { header: "Delivery" }, { header: "Customer" }];
    const orderDetailComponents = [
        <OrderDetailsItems key={0} order={order} />,
        <OrderDetailsDelivery key={1} order={order} />,
        <OrderDetailsCustomer key={2} order={order} />,
    ];

    const amount = Number(order?.total_amount ?? 0);
    const status = (order?.status ?? "pending").toLowerCase();
    const orderNumber = order?.order_number ?? orderId;

    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Order details: {isLoading ? "..." : orderNumber}
                    </h1>
                    <p className="tracking-wide text-[16px] font-[500] text-[#646767]">
                        orders
                    </p>
                </section>

                {error && (
                    <p className="px-6 text-sm text-red-600">Unable to load this order.</p>
                )}

                <div className="flex justify-between items-center p-4 w-[92%] self-center border border-[#ADB1B1] rounded-lg">
                    <ul className="flex flex-col gap-3">
                        {orderDetailsList.map((detail) => (
                            <li
                                key={detail}
                                className="font-[500] text-[16px] xs:text-[18px] md:text-[24px] tracking-wide text-[#888B8B]"
                            >
                                {detail}:
                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="font-[500] text-[18px] md:text-[24px] text-[#101111]">
                            {orderNumber}
                        </li>
                        <li className="tracking-wide text-[18px] md:text-[24px] text-[#101111]">
                            {order?.created_at
                                ? new Date(order.created_at).toLocaleDateString()
                                : "-"}
                        </li>
                        <li className="text-[14px] md:font-[16px] w-fit px-3 text-center font-[500] p-1 capitalize rounded-md bg-[#C5FFB7]">
                            {status}
                        </li>
                        <li className="tracking-wide text-[18px] md:text-[24px] text-[#101111]">
                            &#8358;{addCommasToInt(Number.isFinite(amount) ? amount : 0)}
                        </li>
                    </ul>
                </div>

                <section className="flex flex-col gap-4 pb-4 w-[100%] items-center">
                    <section className="w-[92%] self-center rounded-lg flex flex-col border border-[#ADB1B1]">
                        <div className="w-[100%] py-3 justify-between px-4 sm:px-6 md:px-8 flex gap-12 border-b-[#ADB1B1] border-b">
                            {orderTabList.map((field, index: number) => (
                                <button
                                    key={field.header}
                                    className={`font-[500] tracking-wide text-[16px] xs:text-[18px] md:text-[24px] ${activeIndex === index ? "text-[#FEB100]" : "text-[#9B9692]"} `}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {field.header}
                                </button>
                            ))}
                        </div>
                        {orderDetailComponents[activeIndex]}
                    </section>
                    <div className="flex flex-col gap-3 w-[92%] px-6 pt-3 pb-5 rounded-lg border border-[#ADB1B1] font-urbanist">
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400]">
                                Subtotal
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500]">
                                &#8358;
                                {addCommasToInt(Number(order?.subtotal ?? amount))}
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400]">
                                Shipping
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500]">
                                &#8358;
                                {addCommasToInt(Number(order?.shipping_fee ?? 0))}
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400]">
                                Discount
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500]">
                                &#8358;
                                {addCommasToInt(Number(order?.discount_amount ?? 0))}
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center mt-2 py-1 border-y border-y-[#ADB1B1]">
                            <p className="text-[#888B8B] text-[18px] md:text-[24px] font-[400]">
                                Grand Total
                            </p>
                            <h4 className="text-[18px] md:text-[24px] font-[500]">
                                &#8358;{addCommasToInt(Number.isFinite(amount) ? amount : 0)}
                            </h4>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default OrderDetails;
