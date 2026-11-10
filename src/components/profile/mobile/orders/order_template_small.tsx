import { FaChevronRight } from "react-icons/fa6";
import { SingleOrderTemplateType } from "../../../../types/profile";
import addCommasToInt from "../../../../utils/add_commas_to_int";
import Link from "next/link";
import { orderStatusClass } from "@/utils/order_status";

const OrderTemplate = ({ order }: SingleOrderTemplateType) => {
    return (
        <Link
            href={`/profile/order/${order.id}`}
            className="w-[100%] md:w-[49%] items-center border border-[#ADB1B1] rounded-xl flex justify-between p-3 xs:p-6 font-urbanist"
        >
            <div className="h-[100%] flex flex-col justify-between gap-1">
                <p className="font-[500] text-[14px] text-[#888B8B] tracking-wide">
                    Order number:
                </p>
                <h2 className="font-[500] text-[16px] xs:text-[20px] text-[#101111]">
                    {order.order_number}
                </h2>
                <p className="font-[400] text-[14px] text-[#888B8B] tracking-wide">
                    {order.date}
                </p>
            </div>
            <div className="flex gap-6 items-center">
                <div className="h-[100%] flex flex-col gap-2 justify-between">
                    <p
                        className={`text-[14px] md:font-[16px] text-[#101111] w-[100%] text-center font-[500] p-1 capitalize rounded-md ${orderStatusClass(order.status)}`}
                    >
                        {order.status}
                    </p>
                    <h2 className="font-[500] text-[16px] xs:text-[20px] text-[#101111]">
                        &#8358;{addCommasToInt(order.amount)}
                    </h2>
                </div>
                <button>
                    <FaChevronRight className="w-4 h-4 xs:w-6 xs:h-6 md:w-8 md:h-8 text-[#888B8B]" />
                </button>
            </div>
        </Link>
    );
};

export default OrderTemplate;
