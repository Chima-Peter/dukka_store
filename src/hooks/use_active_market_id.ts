"use client";

import { useEffect, useState } from "react";
import { getActiveMarketId } from "@/lib/cookies";

const MARKET_EVENT = "dukka:active-market";

export function notifyActiveMarketChanged(marketId: string) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
        new CustomEvent(MARKET_EVENT, { detail: { marketId } }),
    );
}

export function useActiveMarketId() {
    // Always start undefined so SSR and the client's first paint match.
    // Reading localStorage in useState causes a hydration mismatch.
    const [marketId, setMarketId] = useState<string | undefined>(undefined);

    useEffect(() => {
        setMarketId(getActiveMarketId());

        const onMarket = (event: Event) => {
            const detail = (event as CustomEvent<{ marketId?: string }>).detail;
            setMarketId(detail?.marketId || getActiveMarketId());
        };
        const onStorage = (event: StorageEvent) => {
            if (event.key === "active_market_id") {
                setMarketId(event.newValue ?? undefined);
            }
        };

        window.addEventListener(MARKET_EVENT, onMarket);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener(MARKET_EVENT, onMarket);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    return marketId;
}
