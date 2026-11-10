"use client";

import Link from "next/link";
import type { CategoryItem } from "@/types/api";

export type SortOption = "featured" | "price_asc" | "price_desc" | "name_asc";
export type StockFilter = "all" | "in_stock" | "sold_out";

type CategoryFiltersProps = {
    categories: CategoryItem[];
    activeCategory: string;
    sortBy: SortOption;
    stock: StockFilter;
    onSortChange: (value: SortOption) => void;
    onStockChange: (value: StockFilter) => void;
    onClose?: () => void;
};

const sortLabels: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name A–Z" },
];

const stockLabels: { value: StockFilter; label: string }[] = [
    { value: "all", label: "All items" },
    { value: "in_stock", label: "In stock" },
    { value: "sold_out", label: "Sold out" },
];

const CategoryFilters = ({
    categories,
    activeCategory,
    sortBy,
    stock,
    onSortChange,
    onStockChange,
    onClose,
}: CategoryFiltersProps) => {
    const isAll = activeCategory.toLowerCase() === "all";

    return (
        <aside className="flex h-fit w-full flex-col gap-8 bg-white font-urbanist">
            <div className="flex items-center justify-between border-b border-[#E8EBEB] pb-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#888B8B]">
                    Filter
                </p>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[13px] font-medium text-[#0D523F] underline-offset-4 hover:underline"
                    >
                        Close
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                    Category
                </p>
                <div className="flex flex-col">
                    <Link
                        href="/category/all"
                        onClick={onClose}
                        className={`border-l-2 px-3 py-2.5 text-[14px] transition-colors ${
                            isAll
                                ? "border-[#FEB100] bg-[#F7F8F7] font-semibold text-[#0D523F]"
                                : "border-transparent text-[#4B5555] hover:border-[#D5DADA] hover:text-[#0D523F]"
                        }`}
                    >
                        All products
                    </Link>
                    {categories.map((category) => {
                        const active =
                            category.name.toLowerCase() ===
                            activeCategory.toLowerCase();
                        return (
                            <Link
                                key={category.category_id}
                                href={`/category/${encodeURIComponent(category.name)}`}
                                onClick={onClose}
                                className={`border-l-2 px-3 py-2.5 text-[14px] transition-colors ${
                                    active
                                        ? "border-[#FEB100] bg-[#F7F8F7] font-semibold text-[#0D523F]"
                                        : "border-transparent text-[#4B5555] hover:border-[#D5DADA] hover:text-[#0D523F]"
                                }`}
                            >
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                    Sort
                </p>
                <div className="flex flex-col gap-1">
                    {sortLabels.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onSortChange(option.value)}
                            className={`px-3 py-2 text-left text-[14px] transition-colors ${
                                sortBy === option.value
                                    ? "bg-[#0D523F] font-medium text-white"
                                    : "text-[#4B5555] hover:bg-[#F7F8F7] hover:text-[#0D523F]"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                    Availability
                </p>
                <div className="flex flex-col gap-1">
                    {stockLabels.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onStockChange(option.value)}
                            className={`px-3 py-2 text-left text-[14px] transition-colors ${
                                stock === option.value
                                    ? "bg-[#0D523F] font-medium text-white"
                                    : "text-[#4B5555] hover:bg-[#F7F8F7] hover:text-[#0D523F]"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default CategoryFilters;
