"use client";

import ResponsiveDisplay from "@/utils/responsive_display";
import ProductCollection from "../products/products_collection";
import ByCategoryLarge from "./by_category_large";
import ByCategorySmall from "./by_category_small";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { normalizeList, toDetailsType } from "@/utils/map_product";

const CategoryUI = ({ subCategory }: { subCategory: string }) => {
    const marketId = useActiveMarketId();
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

    const { data: productsData, isLoading } = useGetProductsQuery(
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
            limit: 24,
        },
        { skip: !marketId },
    );

    const details = (productsData?.items ?? []).map(toDetailsType);

    return (
        <main className="flex flex-col gap-8 w-[100%]  pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-main">
            {isLoading && (
                <p className="px-6 text-sm text-gray-600">Loading products...</p>
            )}
            <ResponsiveDisplay minWidth={1000}>
                <ByCategoryLarge
                    header={subCategory || ""}
                    details={details}
                    key={"large"}
                    link={`/category/${subCategory}`}
                    caller="category"
                />
            </ResponsiveDisplay>
            <ResponsiveDisplay maxWidth={999}>
                <ByCategorySmall
                    header={subCategory || ""}
                    details={details}
                    key={"small"}
                    caller="category"
                />
            </ResponsiveDisplay>
            <ProductCollection
                header="You might also like"
                link="/category/all"
                details={details.slice(0, 8)}
            />
        </main>
    );
};

export default CategoryUI;
