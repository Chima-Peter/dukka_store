"use client";

import type { OrderDetail } from "@/types/api";

function addressValue(
    address: OrderDetail["shipping_address"] | undefined,
    key: string,
): string {
    if (!address) return "-";
    const value = address[key];
    return value == null || value === "" ? "-" : String(value);
}

const OrderDetailsCustomer = ({ order }: { order?: OrderDetail }) => {
    const billing = order?.billing_address ?? order?.shipping_address;
    const shipping = order?.shipping_address;

    const customerName =
        [addressValue(shipping, "first_name"), addressValue(shipping, "last_name")]
            .filter((part) => part !== "-")
            .join(" ") ||
        order?.guest_name ||
        addressValue(shipping, "name");

    const billingFields = [
        ["Name", customerName || "-"],
        ["Street Address", addressValue(billing, "street_address")],
        ["Country", addressValue(billing, "country")],
        ["State", addressValue(billing, "state")],
        ["Mobile Number", addressValue(billing, "phone_number")],
        ["Email", addressValue(billing, "email") || order?.guest_email || "-"],
    ];

    const shippingFields = [
        ["Name", customerName || "-"],
        ["Street Address", addressValue(shipping, "street_address")],
        ["Country", addressValue(shipping, "country")],
        ["State", addressValue(shipping, "state")],
        [
            "Mobile Number",
            addressValue(shipping, "phone_number") ||
                order?.guest_phone_number ||
                "-",
        ],
        ["Email", addressValue(shipping, "email") || order?.guest_email || "-"],
        [
            "Tracking",
            order?.shipment?.tracking_number || "Not available yet",
        ],
    ];

    return (
        <section className="flex flex-col gap-6 pb-6 w-full font-urbanist">
            <section className="flex flex-col gap-6 w-full">
                <h3 className="font-medium text-lg xl:text-xl tracking-wide py-3 px-6 bg-[#F9F9F9] border-b border-[#ADB1B1]">
                    Billing Address
                </h3>
                <div className="w-full px-6">
                    <div className="flex flex-col gap-4">
                        {billingFields.map(([field, value]) => (
                            <div
                                key={field}
                                className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 w-full"
                            >
                                <span className="font-[500] text-sm sm:text-[16px] text-[#75716F]">
                                    {field}
                                </span>
                                <span className="font-[500] text-sm sm:text-[16px] text-[#101111] sm:w-[60%]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6 w-full">
                <h3 className="font-medium text-lg xl:text-xl tracking-wide py-3 px-6 bg-[#F9F9F9] border-b border-[#ADB1B1]">
                    Shipping Address
                </h3>
                <div className="w-full px-6">
                    <div className="flex flex-col gap-4">
                        {shippingFields.map(([field, value]) => (
                            <div
                                key={field}
                                className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 w-full"
                            >
                                <span className="font-[500] text-[14px] sm:text-[16px] text-[#75716F]">
                                    {field}
                                </span>
                                <span className="font-[500] text-sm sm:text-[16px] text-[#101111] sm:w-[60%]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default OrderDetailsCustomer;
