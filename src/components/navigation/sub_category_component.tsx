"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useNavigationContext from "../../hooks/use_category_component";
import { useNavCategories } from "@/hooks/use_nav_categories";

const CategoryComponent = () => {
    const { setShowCategories, categoryIndex } = useNavigationContext();
    const categories = useNavCategories();
    const selectedCategory = categories[categoryIndex] ?? categories[0];

    const closeCategories = () => {
        setShowCategories(false);
    };

    return (
        <motion.section
            className="w-[100%] min-h-[100vh] backdrop-brightness-90 fixed py-[15%] flex justify-center overflow-hidden z-30"
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <section
                className="w-[90%] rounded-xl bg-white overflow-y-auto customScroll max-h-[70vh] h-fit p-12 flex z-30 justify-between gap-y-12 flex-wrap font-urbanist"
                onMouseLeave={closeCategories}
            >
                {selectedCategory?.subcategories.map((category) => (
                    <div
                        key={category.name}
                        className="flex flex-col gap-6 w-[100%] xs:w-[48%] sm:w-[30%] h-fit"
                    >
                        <h2 className="text-[22px] xl:text-[24px] 2xl:text-[26px] font-semibold tracking-wide">
                            {category.name}
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {category.products.map((sub) => (
                                <Link
                                    href={`/category/${encodeURIComponent(sub.name)}`}
                                    key={sub.name}
                                    className="text-[#888B8B] text-[18px] xl:text-[20px] 2xl:text-[22px] hover:text-[#FEB100] font-medium"
                                    onClick={closeCategories}
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <section
                className="w-[100vw] h-[100vh] min-h-[100vh] fixed top-0 left-0 z-20"
                onClick={closeCategories}
            />
        </motion.section>
    );
};

export default CategoryComponent;
