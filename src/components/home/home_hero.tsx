"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HomeHero = () => {
    return (
        <section className="relative w-full min-h-[72vh] md:min-h-[78vh] overflow-hidden bg-[#0D523F] text-white font-urbanist">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 18% 22%, rgba(254,177,0,0.35), transparent 34%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.12), transparent 28%), linear-gradient(135deg, transparent 42%, rgba(3,24,21,0.55) 42%, rgba(3,24,21,0.55) 58%, transparent 58%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(-12deg, transparent, transparent 18px, #fff 18px, #fff 19px)",
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-[72vh] md:min-h-[78vh] w-full max-w-[1600px] flex-col justify-end px-4 pb-16 pt-10 sm:px-6 sm:pb-20 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <motion.p
                    className="mb-3 text-[13px] font-medium uppercase tracking-[0.28em] text-[#FEB100] sm:text-sm"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    Dukka.Store
                </motion.p>

                <motion.h1
                    className="max-w-[12ch] text-[clamp(3.4rem,12vw,8.5rem)] font-semibold leading-[0.9] tracking-tight"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                >
                    Dukka
                </motion.h1>

                <motion.p
                    className="mt-5 max-w-[34rem] text-[17px] font-light leading-relaxed text-white/85 sm:text-[19px] md:text-[21px]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                >
                    Fresh finds for your market — browse live catalog, add to cart,
                    checkout with Paystack.
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-wrap items-center gap-3"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
                >
                    <Link
                        href="/category/all"
                        className="bg-[#FEB100] px-8 py-3.5 text-[15px] font-semibold text-[#031815] transition-colors duration-300 hover:bg-white sm:text-base"
                    >
                        Shop catalog
                    </Link>
                    <Link
                        href="/cart"
                        className="border border-white/40 px-8 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 sm:text-base"
                    >
                        View cart
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeHero;
