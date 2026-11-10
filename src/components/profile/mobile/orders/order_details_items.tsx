"use client";

import addCommasToInt from "../../../../utils/add_commas_to_int";
import type { OrderDetail } from "@/types/api";
import ProductImage from "@/components/ui/product_image";

const OrderDetailsItems = ({ order }: { order?: OrderDetail }) => {
    const items = order?.order_items ?? [];

    if (!items.length) {
        return (
            <section className="w-[100%] flex flex-col p-6">
                <p className="text-sm text-gray-600">No items on this order.</p>
            </section>
        );
    }

    return (
        <section className="w-[100%] flex flex-col">
            {items.map((item) => (
                <div
                    className="flex gap-4 xs:gap-3 md:gap-6 border-t border-t-[#ADB1B1] w-[100%] p-4 xs:p-2 sm:p-4 md:p-6"
                    key={item.id}
                >
                    <ProductImage
                        width={50}
                        height={50}
                        src={item.product_image}
                        alt={item.product_name}
                        seed={item.market_variant_id || item.product_name}
                    />
                    <div className="flex max-xs:flex-col xs:gap-2 justify-between w-[100%]">
                        <div className="flex flex-col w-fit">
                            <div className="flex gap-1">
                                <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                    Variant:{" "}
                                    {[
                                        item.product_specs?.color,
                                        item.product_specs?.size,
                                    ]
                                        .filter(Boolean)
                                        .join(" / ") || item.market_variant_id}
                                </p>
                                <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                    QTY: {item.quantity}
                                </p>
                            </div>
                            <h2 className="text-[16px] md:text-[20px] font-[600] tracking-wide">
                                {item.product_name}
                            </h2>
                        </div>
                        <div className="flex max-xs:gap-2 xs:flex-col w-fit">
                            <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                Item price:
                            </p>
                            <h2 className="text-[16px] md:text-[20px] font-[600]">
                                &#8358;{addCommasToInt(Number(item.price ?? 0))}
                            </h2>
                        </div>
                        <div className="flex max-xs:gap-2 xs:flex-col w-fit">
                            <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                Total price:
                            </p>
                            <h2 className="text-[16px] md:text-[20px] font-[600]">
                                &#8358;{addCommasToInt(Number(item.total ?? 0))}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default OrderDetailsItems;
