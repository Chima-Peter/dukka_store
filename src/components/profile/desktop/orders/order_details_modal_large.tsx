"use client";

import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import OrderDetails_Order from "./order_details_order";
import OrderDetailsDelivery from "./order_details_delivery";
import OrderDetailsCustomer from "../../mobile/orders/order_details_customers";
import { useGetOrderQuery } from "@/redux/services/orders_api";
import addCommasToInt from "@/utils/add_commas_to_int";

const OrderDetailsModal = ({
    setOrderModal,
    orderId,
}: {
    setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
    orderId: string;
}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { data: order, isLoading, error } = useGetOrderQuery(orderId, {
        skip: !orderId,
    });

    const orderDetailsList = [
        "Order ID",
        "Order Date",
        "Delivery Status",
        "Payment Method",
        "Payment Status",
    ];
    const orderTabList = [
        { header: "Order" },
        { header: "Delivery" },
        { header: "Customer" },
    ];
    const orderDetailComponents = [
        <OrderDetails_Order key={0} order={order} />,
        <OrderDetailsDelivery key={1} order={order} />,
        <OrderDetailsCustomer key={2} order={order} />,
    ];

    const amount = Number(order?.total_amount ?? 0);
    const paymentMethod =
        order?.order_payment_attempt?.payment_method?.name ||
        order?.order_payment_attempt?.payment_method_name ||
        "-";

    return (
        <section className="h-[100vh] backdrop-brightness-50 w-[100%] z-50 fixed backdrop-blur-sm left-0 top-0 flex items-center justify-center">
            <section className="w-[600px] max-w-[900px] z-50 max-h-[500px] flex flex-col bg-white gap-4 scrollbar-hide overflow-y-auto relative">
                <div className="bg-[#F9F9F9] flex w-[100%] justify-between items-center z-30 py-4 px-6 sticky top-0">
                    <h3 className="min-lg:text-[18px] xl:text-[20px] font-[400] tracking-wide">
                        Order details {isLoading ? "" : order?.order_number || orderId}
                    </h3>
                    <button onClick={() => setOrderModal(false)}>
                        <MdOutlineCancel className="w-[28px] h-[28px]" />
                    </button>
                </div>

                {error && (
                    <p className="px-6 text-sm text-red-600">Unable to load this order.</p>
                )}

                <div className="flex justify-between items-center px-6 w-max gap-10">
                    <ul className="flex flex-col gap-3">
                        {orderDetailsList.map((detail) => (
                            <li
                                key={detail}
                                className="font-[300] text-[18px] xl:text-[20px] tracking-wide text-[#9B9692]"
                            >
                                {detail}:
                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-col gap-3">
                        <li className="font-[600] text-[24px] xl:text-[26px]">
                            {order?.order_number || orderId}
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            {order?.created_at
                                ? new Date(order.created_at).toLocaleString()
                                : "-"}
                        </li>
                        <li className="text-[14px] xl:font-[16px] w-fit px-3 text-center font-[400] p-1 capitalize rounded-md bg-[#C5FFB7]">
                            {order?.status || "pending"}
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            {paymentMethod}
                        </li>
                        <li className="tracking-wide text-[18px] xl:text-[20px] text-[#101111]">
                            {order?.order_payment_attempt?.status || "-"}
                        </li>
                    </ul>
                </div>

                <section className="w-[100%] flex flex-col gap-2">
                    <div className="w-[100%] border-b border-b-[#ADB1B1] py-2 px-6 flex gap-12">
                        {orderTabList.map((field, index: number) => (
                            <button
                                key={field.header}
                                className={`font-[400] tracking-wide text-[18px] xl:text-[20px] ${activeIndex === index ? "text-[#FEB100]" : "text-[#9B9692]"}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {field.header}
                            </button>
                        ))}
                    </div>
                    {orderDetailComponents[activeIndex]}
                    <div className="flex flex-col gap-3 w-full px-6 py-5 bg-[#F9F9F9]">
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                Subtotal
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                &#8358;{addCommasToInt(Number(order?.subtotal ?? 0))}
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                Shipping
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                &#8358;
                                {addCommasToInt(Number(order?.shipping_fee ?? 0))}
                            </h4>
                        </div>
                        <div className="w-[100%] flex justify-between items-center">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                Discount
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                &#8358;
                                {addCommasToInt(Number(order?.discount_amount ?? 0))}
                            </h4>
                        </div>
                        {(Number(order?.points_discount) > 0 ||
                            Number(order?.coupon_discount) > 0) && (
                            <>
                                <div className="w-[100%] flex justify-between items-center">
                                    <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                        Points discount
                                    </p>
                                    <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                        &#8358;
                                        {addCommasToInt(
                                            Number(order?.points_discount ?? 0),
                                        )}
                                    </h4>
                                </div>
                                <div className="w-[100%] flex justify-between items-center">
                                    <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                        Coupon discount
                                    </p>
                                    <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                        &#8358;
                                        {addCommasToInt(
                                            Number(order?.coupon_discount ?? 0),
                                        )}
                                    </h4>
                                </div>
                            </>
                        )}
                        <div className="w-[100%] flex justify-between items-center mt-2 py-1 border-y border-y-[#ADB1B1]">
                            <p className="text-[#888B8B] text-[18px] xl:text-[20px] font-[400]">
                                Grand Total
                                {order?.currency ? ` (${order.currency})` : ""}
                            </p>
                            <h4 className="text-[18px] xl:text-[20px] font-[600]">
                                &#8358;{addCommasToInt(amount)}
                            </h4>
                        </div>
                    </div>
                </section>
            </section>
            <section
                className="w-[100%] fixed min-h-[100vh] top-0 left-0 z-40"
                onClick={() => setOrderModal(false)}
            />
        </section>
    );
};

export default OrderDetailsModal;
