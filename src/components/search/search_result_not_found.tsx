"use client";

import ProductCollection from "@/components/products/products_collection";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { toDetailsType, normalizeList } from "@/utils/map_product";

const SearchResultNotFound = () => {
    const marketId = useActiveMarketId();
    const { data } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const details = normalizeList(data).map(toDetailsType);

    return (
        <>
            <section className="w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-10 bg-white font-urbanist">
                <h2 className="text-2xl font-semibold text-[#0D523F] mb-2">
                    No results found
                </h2>
                <p className="text-gray-600">
                    Keep calm and try searching for more general terms or shop from the
                    categories.
                </p>
            </section>
            {details.length > 0 && (
                <ProductCollection
                    header="You might also like"
                    link="/category/all"
                    details={details}
                />
            )}
        </>
    );
};

export default SearchResultNotFound;
