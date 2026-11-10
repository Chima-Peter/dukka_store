"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { normalizeList } from "@/utils/map_product";

const HomeCategoryStrip = () => {
    const marketId = useActiveMarketId();
    const { data, isSuccess } = useGetCategoriesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const categories = normalizeList(data);

    if (!isSuccess || categories.length === 0) return null;

    return (
        <section className="w-full border-b border-[#D9DEDE] bg-[#F7F8F7] font-urbanist">
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-6 px-4 py-5 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <p className="hidden shrink-0 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0D523F] sm:block">
                    Shop by
                </p>
                <div className="flex w-full gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.category_id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.03 }}
                            className="shrink-0"
                        >
                            <Link
                                href={`/category/${encodeURIComponent(category.name)}`}
                                className="inline-flex border border-[#0D523F]/20 bg-white px-4 py-2 text-[14px] font-medium text-[#0D523F] transition-colors duration-300 hover:border-[#0D523F] hover:bg-[#0D523F] hover:text-white sm:text-[15px]"
                            >
                                {category.name}
                            </Link>
                        </motion.div>
                    ))}
                    <Link
                        href="/category/all"
                        className="inline-flex shrink-0 items-center px-3 py-2 text-[14px] font-semibold text-[#0D523F] underline-offset-4 hover:underline sm:text-[15px]"
                    >
                        View all
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeCategoryStrip;
