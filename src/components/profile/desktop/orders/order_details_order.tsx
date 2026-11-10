"use client";

import addCommasToInt from "../../../../utils/add_commas_to_int";
import type { OrderDetail } from "@/types/api";

const OrderDetails_Order = ({ order }: { order?: OrderDetail }) => {
    const detailHeader = ["Product", "Variant", "Qty", "Price", "Total"];
    const items = order?.order_items ?? [];

    return (
        <section className="pt-4 flex flex-col gap-6 w-[100%]">
            <ul className="w-[100%] flex justify-between items-center bg-[#F9F9F9] py-4 px-6">
                {detailHeader.map((header, index: number) => (
                    <li
                        className={`text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#646767] tracking-wide ${index === 0 ? "w-[25%]" : "text-left w-[18%]"} font-[400] hover:text-black`}
                        key={header}
                    >
                        {header}
                    </li>
                ))}
            </ul>
            <section className="flex flex-col w-[100%] border-t border-t-[#ADB1B1] overflow-y-auto h-[300px] scrollbar-hide">
                {items.length === 0 && (
                    <p className="p-6 text-sm text-gray-600">No items on this order.</p>
                )}
                {items.map((detail) => (
                    <ul
                        className="w-[100%] bg-white even:bg-[#F6F6F6] border-b border-b-[#ADB1B1] flex justify-between py-4 px-6 items-center"
                        key={detail.id}
                    >
                        <li className="text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#101111] text-left font-[400] w-[25%]">
                            {detail.product_name}
                        </li>
                        <li className="text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#101111] text-left font-[400] w-[20%]">
                            {[
                                detail.product_specs?.color,
                                detail.product_specs?.size,
                            ]
                                .filter(Boolean)
                                .join(" / ") || detail.market_variant_id}
                        </li>
                        <li className="text-[16px] text-left xl:text-[18px] 2xl:text-[20px] text-[#101111] font-[400] w-[17%]">
                            {detail.quantity}
                        </li>
                        <li className="text-[16px] text-left xl:text-[18px] 2xl:text-[20px] text-[#101111] font-[400] w-[17%]">
                            &#8358;{addCommasToInt(Number(detail.price ?? 0))}
                        </li>
                        <li className="text-[17px] text-left xl:text-[19px] 2xl:text-[21px] text-[#101111] font-[600] w-[17%]">
                            &#8358;{addCommasToInt(Number(detail.total ?? 0))}
                        </li>
                    </ul>
                ))}
            </section>
        </section>
    );
};

export default OrderDetails_Order;
