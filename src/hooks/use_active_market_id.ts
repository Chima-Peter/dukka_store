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
    const [marketId, setMarketId] = useState<string | undefined>(() => {
        if (typeof window === "undefined") return undefined;
        return getActiveMarketId();
    });

    useEffect(() => {
        const current = getActiveMarketId();
        if (current !== marketId) {
            setMarketId(current);
        }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once, then listen
    }, []);

    return marketId;
}
