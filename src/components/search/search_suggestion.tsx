"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";

const SearchSuggestion = ({ query }: { query: string }) => {
    const router = useRouter();
    const marketId = useActiveMarketId();
    const trimmed = query.trim();
    const [debounced, setDebounced] = useState(trimmed);

    useEffect(() => {
        const timer = window.setTimeout(() => setDebounced(trimmed), 250);
        return () => window.clearTimeout(timer);
    }, [trimmed]);

    const { data, isFetching } = useGetProductsQuery(
        {
            market_id: marketId,
            name: debounced,
            limit: 8,
        },
        { skip: !marketId || debounced.length < 2 },
    );

    const suggestions = (data?.items ?? []).map((item) => item.name);

    const makeSearch = (suggestion: string) => {
        router.push(`/search/${encodeURIComponent(suggestion)}`);
    };

    return (
        <div className="flex flex-col rounded-lg border border-white drop-shadow-xl w-[100%] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] absolute top-12 bg-white z-50">
            <h2 className="text-[16px] min-lg:text-lg xl:text-xl 2xl:text-2xl font-[400] text-[#888B8B] py-2 border-b-[1.3px] border-b-[#888B8B] px-4 uppercase">
                Suggestions
            </h2>
            <ul className="flex flex-col pb-4 w-[100%]">
                {debounced.length < 2 && (
                    <li className="text-[14px] py-2 px-4 text-gray-500">
                        Type at least 2 characters to search
                    </li>
                )}
                {debounced.length >= 2 && isFetching && (
                    <li className="text-[14px] py-2 px-4 text-gray-500">Searching...</li>
                )}
                {debounced.length >= 2 && !isFetching && suggestions.length === 0 && (
                    <li className="text-[14px] py-2 px-4 text-gray-500">
                        No products found
                    </li>
                )}
                {suggestions.map((suggestion) => (
                    <li
                        key={suggestion}
                        onMouseDown={() => makeSearch(suggestion)}
                        className="text-[14px] min-lg:text-[16px] w-[100%] hover:bg-gray-200 font-normal py-2 px-4 tracking-wide cursor-pointer"
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSuggestion;
