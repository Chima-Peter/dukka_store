"use client";

import { BiEdit } from "react-icons/bi";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useGetOpenMarketsQuery } from "@/redux/services/catalog_api";

function formatDate(value?: string | null) {
    if (!value) return "Not set";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not set";
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const UserDetails = ({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { data: me, isLoading } = useGetMeQuery();
    const { data: marketsData } = useGetOpenMarketsQuery();
    const markets = marketsData ?? [];
    const activeMarket = markets.find(
        (market) => market.id === me?.active_market_id,
    );
    const points = Number(me?.points?.balance ?? 0);

    return (
        <section className="flex h-fit w-full flex-col border border-[#E4E7E7] bg-white font-urbanist">
            <div className="flex w-full items-center justify-between border-b border-[#E4E7E7] px-4 py-5 sm:px-6 md:px-8">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Overview
                    </p>
                    <h1 className="text-[22px] font-semibold tracking-tight text-[#0D523F]">
                        Profile
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 border border-[#0D523F] px-3 py-2 text-[#0D523F] transition-colors hover:bg-[#0D523F] hover:text-white"
                >
                    <BiEdit className="h-4 w-4" />
                    <span className="text-sm font-semibold">Edit profile</span>
                </button>
            </div>

            <section className="grid w-full gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 md:px-8">
                <div className="flex flex-col border border-[#E4E7E7]">
                    <h2 className="border-b border-[#E4E7E7] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#888B8B]">
                        Account
                    </h2>
                    <dl className="grid gap-4 px-5 py-5">
                        <div>
                            <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                                Full name
                            </dt>
                            <dd className="mt-1 text-[16px] text-[#031815]">
                                {isLoading ? "Loading..." : me?.name || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                                Email
                            </dt>
                            <dd className="mt-1 text-[16px] text-[#0D523F]">
                                {me?.email || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                                Phone
                            </dt>
                            <dd className="mt-1 text-[16px] text-[#031815]">
                                {me?.phone_number || "Not set"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                                Date of birth
                            </dt>
                            <dd className="mt-1 text-[16px] text-[#031815]">
                                {formatDate(me?.date_of_birth)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="border border-[#E4E7E7] px-5 py-4 text-left transition-colors hover:border-[#FEB100] hover:bg-[#FEB100]/20"
                    >
                        <p className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Points
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-[#0D523F]">
                            {Number.isFinite(points)
                                ? points.toLocaleString()
                                : "0"}
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(7)}
                        className="border border-[#E4E7E7] px-5 py-4 text-left transition-colors hover:border-[#FEB100] hover:bg-[#FEB100]/20"
                    >
                        <p className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Active market
                        </p>
                        <p className="mt-1 text-xl font-semibold text-[#031815]">
                            {activeMarket?.name || "Not set"}
                        </p>
                        <p className="text-sm text-[#6B7373]">
                            {activeMarket
                                ? `${activeMarket.code} · ${activeMarket.currency_code}`
                                : "Choose a market to shop"}
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(6)}
                        className="border border-[#E4E7E7] px-5 py-4 text-left transition-colors hover:border-[#FEB100] hover:bg-[#FEB100]/20"
                    >
                        <p className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Addresses
                        </p>
                        <p className="mt-1 text-xl font-semibold text-[#031815]">
                            {(me?.shipping_address?.length || 0) +
                                (me?.billing_address?.length || 0)}{" "}
                            saved
                        </p>
                        <p className="text-sm text-[#6B7373]">
                            Shipping {me?.shipping_address?.length || 0} ·
                            Billing {me?.billing_address?.length || 0}
                        </p>
                    </button>
                </div>
            </section>
        </section>
    );
};

export default UserDetails;
