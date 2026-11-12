"use client";

import { useMemo } from "react";
import { useGetOpenMarketsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import type { OpenMarket } from "@/types/api";

const CURRENCY_LABELS: Record<string, string> = {
    NGN: "Naira",
    GHS: "Cedi",
    KES: "Shilling",
    ZAR: "Rand",
    USD: "US Dollar",
    GBP: "Pound",
    EUR: "Euro",
};

export function currencyLabel(code?: string | null): string {
    if (!code) return "";
    const upper = code.toUpperCase();
    return CURRENCY_LABELS[upper] || upper;
}

export function marketFlagUrl(iso2?: string | null): string | undefined {
    if (!iso2 || iso2.length !== 2) return undefined;
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}

export function useActiveMarket(): {
    marketId?: string;
    market?: OpenMarket;
    currencyCode?: string;
    currencyName: string;
    flagUrl?: string;
    isLoading: boolean;
} {
    const marketId = useActiveMarketId();
    const { data: markets, isLoading } = useGetOpenMarketsQuery();

    const market = useMemo(
        () => markets?.find((item) => item.id === marketId),
        [markets, marketId],
    );

    const currencyCode = market?.currency_code;

    return {
        marketId,
        market,
        currencyCode,
        currencyName: currencyLabel(currencyCode),
        flagUrl: marketFlagUrl(market?.iso2),
        isLoading,
    };
}
