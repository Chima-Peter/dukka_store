"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useNavigationContext from "../../hooks/use_category_component";
import { useNavCategories } from "@/hooks/use_nav_categories";

const AllCategoryComponent = () => {
    const { setShowAllCategories } = useNavigationContext();
    const categories = useNavCategories();

    const closeCategories = () => {
        setShowAllCategories(false);
    };

    return (
        <motion.section
            className="fixed z-50 flex min-h-[100vh] w-full justify-center overflow-hidden py-[12%] backdrop-brightness-90"
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <section
                className="z-50 flex max-h-[70vh] w-[90%] max-w-[960px] flex-col gap-6 overflow-y-auto border border-[#E4E7E7] bg-white px-8 py-8 font-urbanist"
                onMouseLeave={closeCategories}
            >
                <div className="flex items-end justify-between gap-4 border-b border-[#E8EBEB] pb-4">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#888B8B]">
                            Browse
                        </p>
                        <h2 className="mt-1 text-[28px] font-semibold tracking-tight text-[#0D523F]">
                            All categories
                        </h2>
                    </div>
                    <Link
                        href="/category/all"
                        onClick={closeCategories}
                        className="text-[14px] font-semibold text-[#0D523F] underline-offset-4 hover:underline"
                    >
                        Shop all products
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.category}
                            href={`/category/${encodeURIComponent(category.category)}`}
                            onClick={closeCategories}
                            className="border border-[#E4E7E7] px-4 py-4 text-[16px] font-medium text-[#0D523F] transition-colors duration-200 hover:border-[#0D523F] hover:bg-[#0D523F] hover:text-white"
                        >
                            {category.category}
                        </Link>
                    ))}
                </div>
            </section>
            <section
                className="fixed left-0 top-0 z-40 h-[100vh] min-h-[100vh] w-[100vw]"
                onClick={closeCategories}
            />
        </motion.section>
    );
};

export default AllCategoryComponent;
