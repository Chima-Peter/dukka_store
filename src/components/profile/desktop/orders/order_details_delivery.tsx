"use client";

import formatCustomDate from "@/utils/delivery_date_formatter";
import { IoLocationOutline } from "react-icons/io5";
import type { OrderDetail } from "@/types/api";

const OrderDetailsDelivery = ({ order }: { order?: OrderDetail }) => {
    const movements = order?.shipment?.shipment_movements ?? [];
    const status = order?.status ?? "pending";
    const updatedAt =
        movements[movements.length - 1]?.occurred_at || order?.created_at;

    return (
        <section className="py-4 flex flex-col gap-8 w-[100%] font-urbanist px-2">
            <div className="flex flex-col gap-2 px-4">
                <p className="text-[16px] font-[500]">Your order was</p>
                <h5 className="font-[600] text-[20px] capitalize">{status}</h5>
                {order?.created_at && (
                    <p className="text-[16px] font-[500]">
                        placed on {formatCustomDate(new Date(order.created_at))}
                    </p>
                )}
                {updatedAt && (
                    <p className="text-[#646767] font-[400] text-[16px]">
                        Last update on {formatCustomDate(new Date(updatedAt))}
                    </p>
                )}
                {order?.shipment?.tracking_number && (
                    <p className="text-[16px] font-[500]">
                        Tracking: {order.shipment.tracking_number}
                    </p>
                )}
            </div>

            <div className="flex gap-6 px-7">
                <div className="bg-[#0D523F] w-[1px] min-h-[80px]" />
                <div className="flex flex-col gap-6">
                    {movements.length === 0 && (
                        <p className="text-sm text-gray-600">
                            No shipment movements yet.
                        </p>
                    )}
                    {movements.map((movement) => (
                        <div
                            key={movement.id}
                            className="flex flex-col items-start gap-1 relative"
                        >
                            <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                <IoLocationOutline className="w-[14px] h-[14px]" />
                            </div>
                            <h5 className="text-[18px] font-[500] capitalize">
                                {movement.movement_type?.replaceAll("_", " ") ||
                                    "Update"}
                            </h5>
                            <p className="text-[16px] font-[300] text-[#646767]">
                                {movement.to_location?.name ||
                                    movement.from_location?.name ||
                                    "Location update"}
                            </p>
                            {movement.occurred_at && (
                                <p className="text-[14px] text-gray-500">
                                    {formatCustomDate(new Date(movement.occurred_at))}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrderDetailsDelivery;
