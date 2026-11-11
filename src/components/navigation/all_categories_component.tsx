"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useNavigationContext from "../../hooks/use_category_component";
import { useNavCategories } from "@/hooks/use_nav_categories";

const AllCategoryComponent = () => {
    const { setShowAllCategories, setCategoryIndex } = useNavigationContext();
    const categories = useNavCategories();

    const closeCategories = () => {
        setShowAllCategories(false);
        setCategoryIndex(-1);
    };

    return (
        <>
            <motion.div
                className="absolute left-0 right-0 top-full z-40 border-t border-[#E4E7E7] bg-white font-urbanist shadow-[0_12px_24px_rgba(3,24,21,0.08)]"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
            >
                <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#E8EBEB] pb-4">
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#888B8B]">
                                Browse
                            </p>
                            <h2 className="mt-1 text-[24px] font-semibold tracking-tight text-[#0D523F] xl:text-[28px]">
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
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.category}
                                href={`/category/${encodeURIComponent(category.category)}`}
                                onClick={closeCategories}
                                className="border border-[#E4E7E7] px-4 py-3.5 text-[15px] font-medium text-[#0D523F] transition-colors duration-200 hover:border-[#0D523F] hover:bg-[#0D523F] hover:text-white xl:text-[16px]"
                            >
                                {category.category}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
            <button
                type="button"
                aria-label="Close categories"
                className="fixed inset-x-0 bottom-0 top-[var(--dukka-nav-height,180px)] z-30 bg-[#031815]/25"
                onClick={closeCategories}
            />
        </>
    );
};

export default AllCategoryComponent;
