"use client";

import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";

const SearchSuggestion = ({ query }: { query: string }) => {
    const router = useRouter();
    const marketId = useActiveMarketId();
    const trimmed = query.trim();
    const { data, isFetching } = useGetProductsQuery(
        {
            market_id: marketId,
            name: trimmed || undefined,
            limit: 8,
        },
        { skip: !marketId },
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
                {isFetching && (
                    <li className="text-[14px] py-2 px-4 text-gray-500">Searching...</li>
                )}
                {!isFetching && suggestions.length === 0 && (
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
