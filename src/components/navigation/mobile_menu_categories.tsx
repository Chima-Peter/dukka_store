"use client";

import { motion } from "framer-motion";
import useNavigationContext from "../../hooks/use_category_component";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";
import { useNavCategories } from "@/hooks/use_nav_categories";

const MobileMenuCategories = () => {
    const { showAllCategories, setShowAllCategories } = useNavigationContext();
    const categories = useNavCategories();

    const close = () => setShowAllCategories(false);

    return (
        <motion.section
            className="fixed left-0 top-[7rem] flex min-h-[50vh] w-[100%] flex-col gap-4 overflow-y-auto bg-white py-4 pb-32 scrollbar-hide"
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0, x: "-100%", display: "hidden" }}
            animate={{
                opacity: showAllCategories ? 1 : 0,
                x: showAllCategories ? 0 : "-100%",
                display: showAllCategories ? "flex" : "hidden",
            }}
        >
            <section className="w-[100%] flex-col gap-6 font-urbanist">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 bg-[#F7F8F7] px-4 py-3 sm:px-6 md:px-8">
                        <h1 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0D523F]">
                            All categories
                        </h1>
                    </div>
                    <Link
                        href="/category/all"
                        onClick={close}
                        className="flex w-full items-center border-b border-[#E4E7E7] px-6 py-3.5 text-[15px] font-semibold text-[#0D523F] hover:bg-[#F7F8F7] sm:px-8 md:px-10 md:text-[16px]"
                    >
                        Shop all products
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.category}
                            href={`/category/${encodeURIComponent(category.category)}`}
                            onClick={close}
                            className="flex w-full items-center border-b border-[#E4E7E7] px-6 py-3.5 text-[15px] font-medium text-[#031815] hover:bg-[#F7F8F7] hover:text-[#0D523F] sm:px-8 md:px-10 md:text-[16px]"
                        >
                            {category.category}
                        </Link>
                    ))}
                </div>

                <div className="flex w-[100%] flex-col gap-3 pt-6">
                    <h1 className="bg-[#F7F8F7] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0D523F] sm:px-8 md:px-10">
                        Contact us
                    </h1>
                    <div className="flex flex-col gap-4 px-6 sm:px-8 md:px-10">
                        <Link
                            href="mailto:hello@dukka.store?subject=Dukka%20inquiry"
                            className="flex items-center gap-4"
                            onClick={close}
                        >
                            <div className="flex h-8 w-8 items-center justify-center bg-[#0D523F]">
                                <IoMailOutline className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex flex-col font-urbanist">
                                <p className="text-[15px] font-medium text-[#031815]">
                                    Email support
                                </p>
                                <p className="text-[14px] tracking-wide text-[#646767]">
                                    hello@dukka.store
                                </p>
                            </div>
                        </Link>
                        <p className="text-[14px] text-[#646767]">
                            www.dukka.store · @dukkastore
                        </p>
                    </div>
                </div>
            </section>
        </motion.section>
    );
};

export default MobileMenuCategories;
