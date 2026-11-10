"use client";

import ProductCollection from "@/components/products/products_collection";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { toDetailsType, normalizeList } from "@/utils/map_product";

const HomeProductSections = () => {
    const marketId = useActiveMarketId();
    const { data: categoriesData } = useGetCategoriesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const categories = normalizeList(categoriesData).slice(0, 3);

    const firstCategory = categories[0];
    const secondCategory = categories[1];

    const {
        data: featured,
        isLoading,
        isFetching,
        isError,
    } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const { data: cat1Products } = useGetProductsQuery(
        {
            market_id: marketId,
            category_id: firstCategory?.category_id,
            limit: 8,
        },
        { skip: !marketId || !firstCategory?.category_id },
    );
    const { data: cat2Products } = useGetProductsQuery(
        {
            market_id: marketId,
            category_id: secondCategory?.category_id,
            limit: 8,
        },
        { skip: !marketId || !secondCategory?.category_id },
    );

    const featuredDetails = normalizeList(featured).map(toDetailsType);
    const cat1Details = normalizeList(cat1Products).map(toDetailsType);
    const cat2Details = normalizeList(cat2Products).map(toDetailsType);

    if (!marketId) {
        return (
            <p className="px-6 text-sm text-gray-600">
                Resolving your market to load products...
            </p>
        );
    }

    if ((isLoading || isFetching) && !featuredDetails.length) {
        return <p className="px-6 text-sm text-gray-600">Loading products...</p>;
    }

    if (isError && !featuredDetails.length && !cat1Details.length) {
        return (
            <p className="px-6 text-sm text-red-600">
                Could not load products. Please refresh.
            </p>
        );
    }

    if (!featuredDetails.length && !cat1Details.length) {
        return (
            <p className="px-6 text-sm text-gray-600">
                No products available in this market yet.
            </p>
        );
    }

    return (
        <>
            {featuredDetails.length > 0 && (
                <ProductCollection
                    header="Popular now"
                    link="/category/all"
                    details={featuredDetails}
                />
            )}
            {(cat1Details.length > 0 || featuredDetails.length > 0) && (
                <ProductCollection
                    header={firstCategory?.name || "Featured products"}
                    link={
                        firstCategory
                            ? `/category/${encodeURIComponent(firstCategory.name)}`
                            : "/category/all"
                    }
                    details={cat1Details.length ? cat1Details : featuredDetails}
                />
            )}
            {(cat2Details.length > 0 || featuredDetails.length > 0) && (
                <ProductCollection
                    header={secondCategory?.name || "More for you"}
                    link={
                        secondCategory
                            ? `/category/${encodeURIComponent(secondCategory.name)}`
                            : "/category/all"
                    }
                    details={cat2Details.length ? cat2Details : featuredDetails}
                />
            )}
        </>
    );
};

export default HomeProductSections;
