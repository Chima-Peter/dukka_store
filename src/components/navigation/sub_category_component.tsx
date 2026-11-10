"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useNavigationContext from "../../hooks/use_category_component";
import { useNavCategories } from "@/hooks/use_nav_categories";

const CategoryComponent = () => {
    const { setShowCategories, categoryIndex } = useNavigationContext();
    const categories = useNavCategories();
    const selectedCategory = categories[categoryIndex] ?? categories[0];
    const href = `/category/${encodeURIComponent(selectedCategory?.category || "all")}`;

    const closeCategories = () => {
        setShowCategories(false);
    };

    if (!selectedCategory) return null;

    return (
        <motion.section
            className="fixed z-30 flex min-h-[100vh] w-full justify-center overflow-hidden py-[12%] backdrop-brightness-90"
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <section
                className="z-30 flex h-fit w-[90%] max-w-[720px] flex-col gap-5 border border-[#E4E7E7] bg-white px-8 py-8 font-urbanist shadow-sm"
                onMouseLeave={closeCategories}
            >
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#888B8B]">
                    Category
                </p>
                <h2 className="text-[28px] font-semibold tracking-tight text-[#0D523F] xl:text-[32px]">
                    {selectedCategory.category}
                </h2>
                <p className="max-w-[36rem] text-[16px] leading-relaxed text-[#5B6363]">
                    Browse products in {selectedCategory.category} with live market
                    pricing.
                </p>
                <Link
                    href={href}
                    onClick={closeCategories}
                    className="mt-2 w-fit bg-[#FEB100] px-6 py-3 text-[15px] font-semibold text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white"
                >
                    Shop {selectedCategory.category}
                </Link>
            </section>
            <section
                className="fixed left-0 top-0 z-20 h-[100vh] min-h-[100vh] w-[100vw]"
                onClick={closeCategories}
            />
        </motion.section>
    );
};

export default CategoryComponent;
