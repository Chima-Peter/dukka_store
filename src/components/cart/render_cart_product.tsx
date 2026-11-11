"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    const [removing, setRemoving] = useState(false);
    const { setQuantityDebounced, removeItems } = useCartActions();
    const quantity = props.quantity;
    const unitPrice = Math.max(
        props.price - Number(props.discount_amount ?? 0),
        0,
    );
    const lineTotal = unitPrice * quantity;

    const bumpQuantity = (next: number) => {
        if (!props.id || removing || props.sold_out) return;
        if (next < 1) {
            void removeProduct();
            return;
        }
        setQuantityDebounced(props.id, next);
    };

    const removeProduct = async () => {
        if (!props.id || removing) return;
        setRemoving(true);
        try {
            await removeItems([props.id]);
        } finally {
            setRemoving(false);
        }
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b border-[#E8EBEB] py-5 last:border-b-0 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-6 lg:grid-cols-[140px_minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:py-6"
        >
            <div className="aspect-square overflow-hidden bg-[#F5F6F5] sm:aspect-[4/5]">
                <ProductImage
                    src={props.image}
                    alt={props.name}
                    seed={props.market_variant_id || props.name}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-3">
                <div className="space-y-1">
                    <h3 className="text-[15px] font-medium leading-snug text-[#031815] sm:text-[16px] lg:text-[17px]">
                        {props.name}
                    </h3>
                    <p className="text-[14px] text-[#6B7373]">
                        {formatMoney(unitPrice, props.currency)} each
                    </p>
                    {Number(props.discount_amount) > 0 && (
                        <p className="text-[12px] text-[#0D523F]">
                            Saved{" "}
                            {formatMoney(props.discount_amount, props.currency)}
                        </p>
                    )}
                    {props.sold_out && (
                        <p className="text-[12px] font-medium text-red-600">
                            Sold out
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div
                        className={`inline-flex items-stretch border border-[#FEB100] ${
                            removing || props.sold_out
                                ? "pointer-events-none opacity-50"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={removing || props.sold_out}
                            onClick={() => bumpQuantity(quantity - 1)}
                            className="bg-[#FEB100] px-2.5 py-2 text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white disabled:cursor-not-allowed"
                        >
                            <HiMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="flex min-w-[2.5rem] items-center justify-center px-2 text-[14px] font-semibold tabular-nums text-[#031815]">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={removing || props.sold_out}
                            onClick={() => bumpQuantity(quantity + 1)}
                            className="bg-[#FEB100] px-2.5 py-2 text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white disabled:cursor-not-allowed"
                        >
                            <LuPlus className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => void removeProduct()}
                        disabled={removing}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#888B8B] transition-colors hover:text-[#0D523F] disabled:opacity-50"
                    >
                        <BiTrash className="h-4 w-4" />
                        Remove
                    </button>
                </div>

                <p className="text-[16px] font-semibold tabular-nums text-[#031815] sm:hidden">
                    {formatMoney(lineTotal, props.currency)}
                </p>
            </div>

            <div className="hidden min-w-[7.5rem] text-right sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888B8B]">
                    Line total
                </p>
                <p className="mt-1 text-[18px] font-semibold tabular-nums tracking-tight text-[#031815]">
                    {formatMoney(lineTotal, props.currency)}
                </p>
            </div>
        </motion.article>
    );
};

export default RenderCartProduct;
