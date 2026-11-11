"use client";

import { useMemo, useState } from "react";
import {
    CatalogApi,
    useGetOpenMarketsQuery,
} from "@/redux/services/catalog_api";
import {
    useGetMeQuery,
    useSetActiveMarketMutation,
} from "@/redux/services/customer_api";
import { setActiveMarketId } from "@/lib/cookies";
import { useAppDispatch } from "@/redux/store";
import ProfileSectionShell from "./profile_section_shell";

type Props = {
    onBack?: () => void;
    backHref?: string;
};

const ProfileMarketPanel = ({ onBack, backHref }: Props) => {
    const dispatch = useAppDispatch();
    const { data: me } = useGetMeQuery();
    const { data, isLoading, isError } = useGetOpenMarketsQuery();
    const [setActiveMarket, { isLoading: saving }] = useSetActiveMarketMutation();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const markets = useMemo(() => data ?? [], [data]);

    const activeId = me?.active_market_id || undefined;

    const onSelect = async (marketId: string) => {
        if (marketId === activeId || saving) return;
        setMessage("");
        setError("");
        try {
            const result = await setActiveMarket({ market_id: marketId }).unwrap();
            setActiveMarketId(result.active_market_id);
            dispatch(
                CatalogApi.util.invalidateTags([
                    "Products",
                    "Categories",
                    "Market",
                ]),
            );
            setMessage("Market updated. Catalog will refresh for this market.");
        } catch (err) {
            setError(
                (err as { data?: { message?: string } })?.data?.message ||
                    "Unable to change market",
            );
        }
    };

    return (
        <ProfileSectionShell title="Market" onBack={onBack} backHref={backHref}>
            <p className="mb-4 text-sm text-gray-600">
                Your active market controls catalog prices, delivery states, and
                checkout currency.
            </p>
            {isLoading && <p className="text-sm text-gray-500">Loading markets...</p>}
            {isError && (
                <p className="text-sm text-red-600">Could not load open markets.</p>
            )}
            <ul className="flex flex-col gap-3">
                {markets.map((market) => {
                    const selected = market.id === activeId;
                    return (
                        <li key={market.id}>
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => onSelect(market.id)}
                                className={`flex w-full items-center justify-between rounded-lg border px-4 py-4 text-left transition-colors ${
                                    selected
                                        ? "border-[#FEB100] bg-[#FFF8EB]"
                                        : "border-[#E4E7E7] hover:border-[#ADB1B1]"
                                }`}
                            >
                                <div>
                                    <p className="text-lg font-medium text-[#0D3833]">
                                        {market.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {market.code} · {market.currency_code}
                                    </p>
                                </div>
                                <span
                                    className={`text-sm font-semibold ${
                                        selected ? "text-[#0D523F]" : "text-gray-400"
                                    }`}
                                >
                                    {selected ? "Active" : "Switch"}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {message && <p className="mt-4 text-sm text-[#0D523F]">{message}</p>}
        </ProfileSectionShell>
    );
};

export default ProfileMarketPanel;
