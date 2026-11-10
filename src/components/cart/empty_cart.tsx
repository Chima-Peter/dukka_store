"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsCart2 } from "react-icons/bs";

const EmptyCart = () => {
    return (
        <section className="relative overflow-hidden bg-[#031815] px-4 py-20 text-white sm:px-6 md:px-8 md:py-24 lg:px-12 xl:px-14 2xl:px-16">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 15% 20%, rgba(254,177,0,0.28), transparent 55%), radial-gradient(ellipse 50% 45% at 90% 80%, rgba(13,82,63,0.9), transparent 60%)",
                }}
            />
            <motion.div
                className="relative mx-auto flex max-w-[560px] flex-col items-start gap-5"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
            >
                <BsCart2 className="h-10 w-10 text-[#FEB100]" />
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FEB100]">
                        Your cart
                    </p>
                    <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
                        Nothing here yet
                    </h2>
                    <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                        Browse the market and add items — they&apos;ll show up
                        here ready for checkout.
                    </p>
                </div>
                <Link
                    href="/"
                    className="mt-2 inline-flex items-center justify-center bg-[#FEB100] px-6 py-3 text-[15px] font-semibold text-[#031815] transition-colors hover:bg-white"
                >
                    Continue shopping
                </Link>
            </motion.div>
        </section>
    );
};

export default EmptyCart;
