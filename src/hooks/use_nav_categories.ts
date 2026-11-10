"use client";

import { useMemo } from "react";
import { useGetCategoriesQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { normalizeList } from "@/utils/map_product";
import type { CategoryType } from "@/types/category_type";

export function useNavCategories(): CategoryType[] {
    const marketId = useActiveMarketId();
    const { data, isSuccess } = useGetCategoriesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );

    return useMemo(() => {
        const items = normalizeList(data);
        if (!isSuccess || !items.length) {
            return [
                {
                    category: "All products",
                    subcategories: [
                        {
                            name: "Browse",
                            products: [{ name: "all" }],
                        },
                    ],
                },
            ];
        }

        // Flat market categories → one top-level nav item each
        return items.map((item) => ({
            category: item.name,
            subcategories: [
                {
                    name: item.name,
                    products: [{ name: item.name }],
                },
            ],
        }));
    }, [data, isSuccess]);
}
