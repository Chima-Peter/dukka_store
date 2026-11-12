"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoFilter } from "react-icons/io5";
import ProductGridCard from "@/components/products/product_grid_card";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { normalizeList, toDetailsType } from "@/utils/map_product";
import CategoryFilters, {
    type SortOption,
    type StockFilter,
} from "./category_filters";
import DukkaLoader from "@/components/ui/dukka_loader";

const CategoryUI = ({ subCategory }: { subCategory: string }) => {
    const marketId = useActiveMarketId();
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [stock, setStock] = useState<StockFilter>("all");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const { data: categoriesData } = useGetCategoriesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const categories = normalizeList(categoriesData);
    const matchedCategory = categories.find(
        (category) =>
            category.name.toLowerCase() === subCategory.toLowerCase() ||
            category.category_id === subCategory ||
            category.id === subCategory,
    );

    const { data: productsData, isLoading, isFetching } = useGetProductsQuery(
        {
            market_id: marketId,
            category_id:
                subCategory.toLowerCase() === "all"
                    ? undefined
                    : matchedCategory?.category_id,
            name:
                !matchedCategory && subCategory.toLowerCase() !== "all"
                    ? subCategory
                    : undefined,
            limit: 48,
        },
        { skip: !marketId },
    );

    const details = useMemo(() => {
        let items = normalizeList(productsData).map(toDetailsType);

        if (stock === "in_stock") {
            items = items.filter((item) => !item.sold_out);
        } else if (stock === "sold_out") {
            items = items.filter((item) => item.sold_out);
        }

        if (sortBy === "price_asc") {
            items = [...items].sort(
                (a, b) =>
                    Number(a.price.replace(/,/g, "")) -
                    Number(b.price.replace(/,/g, "")),
            );
        } else if (sortBy === "price_desc") {
            items = [...items].sort(
                (a, b) =>
                    Number(b.price.replace(/,/g, "")) -
                    Number(a.price.replace(/,/g, "")),
            );
        } else if (sortBy === "name_asc") {
            items = [...items].sort((a, b) => a.title.localeCompare(b.title));
        }

        return items;
    }, [productsData, sortBy, stock]);

    const title =
        subCategory.toLowerCase() === "all"
            ? "All products"
            : matchedCategory?.name || subCategory;

    const filterProps = {
        categories,
        activeCategory: subCategory,
        sortBy,
        stock,
        onSortChange: setSortBy,
        onStockChange: setStock,
    };

    return (
        <main className="page-nav-offset w-full bg-dukka-canvas pb-16 font-urbanist">
            <div className="border-b border-dukka-line bg-white px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-dukka-muted">
                    <Link href="/" className="hover:text-dukka-forest">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="capitalize text-dukka-ink">{title}</span>
                </nav>
            </div>

            <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-dukka-ink">
                            {title}
                        </h1>
                        <div className="mt-1 text-[14px] text-dukka-muted">
                            {isLoading || isFetching ? (
                                <DukkaLoader
                                    variant="inline"
                                    label="Loading products"
                                />
                            ) : (
                                `${details.length} item${details.length === 1 ? "" : "s"}`
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(true)}
                        className="inline-flex items-center gap-2 border border-dukka-ink px-4 py-2.5 text-[14px] font-medium text-dukka-ink lg:hidden"
                    >
                        Filter
                        <IoFilter className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-4 pb-6 sm:px-6 md:px-8 lg:grid-cols-12 lg:px-12 xl:px-14 2xl:px-16">
                <div className="hidden h-fit lg:sticky lg:top-[calc(var(--dukka-nav-height)+16px)] lg:col-span-3 lg:block">
                    <CategoryFilters {...filterProps} />
                </div>

                <section className="lg:col-span-9">
                    {(isLoading || isFetching) && details.length === 0 ? (
                        <DukkaLoader label="Loading products" />
                    ) : details.length === 0 ? (
                        <div className="py-12">
                            <p className="text-dukka-ink">
                                No products match these filters.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSortBy("featured");
                                    setStock("all");
                                }}
                                className="mt-3 text-[14px] font-semibold text-dukka-forest underline-offset-4 hover:underline"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            {details.map((detail, index) => (
                                <motion.div
                                    key={detail.id || detail.title}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: Math.min(index * 0.03, 0.3),
                                    }}
                                    className="min-w-0"
                                >
                                    <ProductGridCard detail={detail} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </section>
            </div>

            <AnimatePresence>
                {mobileFiltersOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            type="button"
                            className="absolute inset-0 bg-black/40"
                            aria-label="Close filters"
                            onClick={() => setMobileFiltersOpen(false)}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto border-t border-dukka-line bg-white p-5"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                            <CategoryFilters
                                {...filterProps}
                                onClose={() => setMobileFiltersOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default CategoryUI;
