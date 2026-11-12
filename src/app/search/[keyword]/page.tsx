"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductGridCard from "@/components/products/product_grid_card";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { toDetailsType, normalizeList } from "@/utils/map_product";
import SearchResultNotFound from "@/components/search/search_result_not_found";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import DukkaLoader from "@/components/ui/dukka_loader";
import type { SortOption } from "@/components/category/category_filters";

const sortLabels: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price ↑" },
    { value: "price_desc", label: "Price ↓" },
    { value: "name_asc", label: "Name A–Z" },
];

const SearchPage = () => {
    const params = useParams<{ keyword: string }>();
    const keyword = decodeURIComponent(params.keyword || "");
    const marketId = useActiveMarketId();
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const { data, isLoading, isFetching } = useGetProductsQuery(
        { market_id: marketId, name: keyword, limit: 48 },
        { skip: !marketId || !keyword },
    );

    const details = useMemo(() => {
        let items = normalizeList(data).map(toDetailsType);
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
    }, [data, sortBy]);

    return (
        <main className="page-nav-offset flex w-full flex-col gap-6 bg-dukka-canvas pb-12 font-urbanist">
            <section className="flex flex-wrap items-end justify-between gap-4 px-4 pt-8 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <div>
                    <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-dukka-ink">
                        Results for &ldquo;{keyword}&rdquo;
                    </h1>
                    <p className="mt-1 text-[14px] text-dukka-muted">
                        {(isLoading || isFetching) && details.length === 0
                            ? "Searching…"
                            : `${details.length} product${details.length === 1 ? "" : "s"}`}
                    </p>
                </div>
                {details.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {sortLabels.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setSortBy(option.value)}
                                className={`px-3 py-1.5 text-[13px] transition-colors ${
                                    sortBy === option.value
                                        ? "bg-dukka-ink font-medium text-white"
                                        : "border border-dukka-line text-dukka-muted hover:border-dukka-forest hover:text-dukka-forest"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </section>
            {(isLoading || isFetching) && details.length === 0 ? (
                <DukkaLoader label="Searching catalog" />
            ) : !isLoading && !isFetching && details.length === 0 ? (
                <SearchResultNotFound />
            ) : (
                <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                        {details.map((detail) => (
                            <div key={detail.id || detail.title} className="min-w-0">
                                <ProductGridCard detail={detail} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default SearchPage;
