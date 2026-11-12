"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetProductSuggestionsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { formatMoney } from "@/utils/format_money";
import ProductImage from "@/components/ui/product_image";
import DukkaLoader from "@/components/ui/dukka_loader";

const SearchSuggestion = ({ query }: { query: string }) => {
    const router = useRouter();
    const marketId = useActiveMarketId();
    const trimmed = query.trim();
    const [debounced, setDebounced] = useState(trimmed);

    useEffect(() => {
        const timer = window.setTimeout(() => setDebounced(trimmed), 250);
        return () => window.clearTimeout(timer);
    }, [trimmed]);

    const { data, isFetching } = useGetProductSuggestionsQuery(
        {
            q: debounced,
            market_id: marketId,
            limit: 8,
        },
        { skip: !marketId || debounced.length < 2 },
    );

    const products = data?.items ?? [];

    const goToResults = () => {
        if (!trimmed) return;
        router.push(`/search/${encodeURIComponent(trimmed)}`);
    };

    return (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-[#E4E7E7] bg-white shadow-[0_12px_24px_rgba(3,24,21,0.08)]">
            <div className="flex items-center justify-between border-b border-[#E8EBEB] px-4 py-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                    Products
                </p>
                {debounced.length >= 2 && products.length > 0 && (
                    <button
                        type="button"
                        onMouseDown={goToResults}
                        className="text-[12px] font-semibold text-[#0D523F] underline-offset-4 hover:underline"
                    >
                        View all
                    </button>
                )}
            </div>
            <ul className="flex max-h-[360px] flex-col overflow-y-auto py-1">
                {debounced.length < 2 && (
                    <li className="px-4 py-3 text-[14px] text-[#6B7373]">
                        Type at least 2 characters to search
                    </li>
                )}
                {debounced.length >= 2 && isFetching && products.length === 0 && (
                    <li className="px-4 py-3">
                        <DukkaLoader variant="inline" label="Searching..." />
                    </li>
                )}
                {debounced.length >= 2 &&
                    !isFetching &&
                    products.length === 0 && (
                        <li className="px-4 py-3 text-[14px] text-[#6B7373]">
                            No products found
                        </li>
                    )}
                {products.map((product) => {
                    const href = `/product/${product.id}/${encodeURIComponent(product.name)}`;
                    return (
                        <li key={product.id}>
                            <Link
                                href={href}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    router.push(href);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#FEB100]/35"
                            >
                                <div className="h-11 w-11 shrink-0 overflow-hidden bg-[#F5F6F5]">
                                    <ProductImage
                                        src={product.image_url}
                                        alt={product.name}
                                        seed={product.id}
                                        width={44}
                                        height={44}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[14px] font-medium text-[#031815] xl:text-[15px]">
                                        {product.name}
                                    </p>
                                    <p className="text-[13px] text-[#0D523F]">
                                        {formatMoney(
                                            Number(product.price ?? 0),
                                            product.currency,
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {debounced.length >= 2 && products.length > 0 && (
                <button
                    type="button"
                    onMouseDown={goToResults}
                    className="w-full border-t border-[#E8EBEB] px-4 py-3 text-left text-[13px] font-semibold text-[#0D523F] transition-colors hover:bg-[#F7F8F7]"
                >
                    See all results for &ldquo;{trimmed}&rdquo;
                </button>
            )}
        </div>
    );
};

export default SearchSuggestion;
