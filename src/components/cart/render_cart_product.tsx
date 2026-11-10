"use client";

import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ProductImage from "@/components/ui/product_image";

interface ProductType {
    id?: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    market_variant_id?: string;
    discount_amount?: number;
    currency?: string;
    sold_out?: boolean;
}

const RenderCartProduct = (props: ProductType) => {
    const [quantity, setQuantity] = useState(props.quantity);
    const [busy, setBusy] = useState(false);
    const { setQuantity: setServerQuantity, removeItems } = useCartActions();
    const unitPrice = Math.max(props.price - Number(props.discount_amount ?? 0), 0);

    const syncQuantity = async (next: number) => {
        if (!props.id || busy || props.sold_out) return;
        setBusy(true);
        try {
            if (next < 1) {
                await removeItems([props.id]);
                setQuantity(0);
            } else {
                await setServerQuantity(props.id, next);
                setQuantity(next);
            }
        } finally {
            setBusy(false);
        }
    };

    const deleteProduct = async () => {
        if (!props.id || busy) return;
        setBusy(true);
        try {
            await removeItems([props.id]);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex w-[100%] justify-start gap-6 border-b border-b-gray-300 min-lg:last:border-0 min-lg:py-4 min-lg:first:pt-6 p-2 min-lg:px-0 max-md:items-center max-md:border max-md:border-gray-400 max-md:rounded-lg">
            <div className="flex gap-2 min-lg:gap-6 max-w-fit min-lg:w-[48%] min-lg:pl-6">
                <div className="min-lg:w-[35%] bg-[#F0F0F0] py-2 px-4 h-[100px] xl:h-[150px] flex justify-center items-center rounded-xl ">
                    <ProductImage src={props.image} alt={props.name} width={192} height={102} />
                </div>
                <div className="flex flex-col max-md:py-2 max-md:h-[100px] justify-between min-lg:gap-6">
                    <h3 className="text-[16px] font-[500]">{props.name}</h3>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] font-[600] text-[#75716F]">
                        {formatMoney(unitPrice, props.currency)}
                    </p>
                    {props.sold_out && (
                        <p className="text-sm text-red-600">Sold out</p>
                    )}
                    {Number(props.discount_amount) > 0 && (
                        <p className="text-sm text-[#0D523F]">
                            Discount: {formatMoney(props.discount_amount, props.currency)}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex max-md:h-[100px] max-md:justify-between min-lg:gap-5 min-lg:w-[23%] min-lg:py-4 flex-col-reverse min-lg:flex-col py-3">
                <button
                    className=" bg-white font-semibold border-[1.4px]  rounded-md w-[100px] flex items-center justify-between text-[12px] border-[#FEB100] min-lg:text-[14px] xl:text-[16px] 2xl:text-[18px] disabled:opacity-50"
                    disabled={busy || props.sold_out}
                >
                    <span
                        className="h-[100%] bg-[#FEB100] p-[6px] rounded-l-md"
                        onClick={() => syncQuantity(quantity - 1)}
                    >
                        <HiMinus className="cursor-pointer" />
                    </span>
                    {quantity}
                    <span
                        className="h-[100%] bg-[#FEB100] p-[6px] rounded-r-md"
                        onClick={() => syncQuantity(quantity + 1)}
                    >
                        <LuPlus className="cursor-pointer" />
                    </span>
                </button>
                <button
                    onClick={deleteProduct}
                    className=" flex gap-1 text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-red-700 items-center self-end min-lg:self-auto"
                    disabled={busy}
                >
                    <BiTrash className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-[#888B8B] min-lg:text-red-700" />
                    Remove
                </button>
            </div>
            <div className="hidden min-lg:flex w-[23%] py-4">
                <p className="text-[16px] xl:text-[18px] font-semibold">
                    {formatMoney(unitPrice * quantity, props.currency)}
                </p>
            </div>
        </div>
    );
};

export default RenderCartProduct;
