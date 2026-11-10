"use client";

import { useParams } from "next/navigation";
import ProductCollection from "@/components/products/products_collection";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { toDetailsType, normalizeList } from "@/utils/map_product";
import SearchResultNotFound from "@/components/search/search_result_not_found";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import DukkaLoader from "@/components/ui/dukka_loader";

const SearchPage = () => {
    const params = useParams<{ keyword: string }>();
    const keyword = decodeURIComponent(params.keyword || "");
    const marketId = useActiveMarketId();
    const { data, isLoading, isFetching } = useGetProductsQuery(
        { market_id: marketId, name: keyword, limit: 24 },
        { skip: !marketId || !keyword },
    );
    const details = normalizeList(data).map(toDetailsType);

    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist pb-12">
            <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="text-2xl font-semibold text-[#0D523F]">
                    Search results for &ldquo;{keyword}&rdquo;
                </h1>
            </section>
            {(isLoading || isFetching) && details.length === 0 ? (
                <DukkaLoader label="Searching catalog" />
            ) : !isLoading && !isFetching && details.length === 0 ? (
                <SearchResultNotFound />
            ) : (
                <ProductCollection
                    header={`${details.length} products`}
                    link={`/search/${encodeURIComponent(keyword)}`}
                    details={details}
                />
            )}
        </main>
    );
};

export default SearchPage;
