"use client";

import { BiEdit, BiMap } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineStars } from "react-icons/md";
import { useMemo } from "react";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useGetOpenMarketsQuery } from "@/redux/services/catalog_api";
import { useGetOrdersQuery } from "@/redux/services/orders_api";
import { toOrdersType } from "@/utils/map_order";

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
    const { data: ordersPage } = useGetOrdersQuery();
    const markets = marketsData ?? [];
    const activeMarket = markets.find(
        (market) => market.id === me?.active_market_id,
    );
    const points = Number(me?.points?.balance ?? 0);
    const firstName = (me?.name || "there").split(" ")[0];
    const addressCount =
        (me?.shipping_address?.length || 0) + (me?.billing_address?.length || 0);

    const latestOrder = useMemo(() => {
        const items = (ordersPage?.items ?? []).map(toOrdersType);
        return items[0] ?? null;
    }, [ordersPage]);

    const glanceCards = [
        {
            label: "Points",
            value: Number.isFinite(points) ? points.toLocaleString() : "0",
            hint: "Rewards balance",
            icon: <MdOutlineStars className="h-5 w-5" />,
            step: 5,
            accent: true,
        },
        {
            label: "Market",
            value: activeMarket?.name || "Not set",
            hint: activeMarket
                ? `${activeMarket.code} · ${activeMarket.currency_code}`
                : "Choose where you shop",
            icon: <BiMap className="h-5 w-5" />,
            step: 7,
            accent: false,
        },
        {
            label: "Addresses",
            value: `${addressCount} saved`,
            hint: `Shipping ${me?.shipping_address?.length || 0} · Billing ${me?.billing_address?.length || 0}`,
            icon: <HiOutlineLocationMarker className="h-5 w-5" />,
            step: 6,
            accent: false,
        },
    ];

    return (
        <section className="flex h-fit w-full flex-col gap-5 font-urbanist">
            <div className="overflow-hidden rounded-2xl border border-dukka-line/80 bg-white shadow-[0_12px_40px_rgba(3,24,21,0.04)]">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dukka-line/80 px-5 py-6 sm:px-7">
                    <div>
                        <p className="text-[12px] font-medium text-dukka-muted">
                            Your account
                        </p>
                        <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-dukka-ink">
                            Hello, {firstName}
                        </h1>
                        <p className="mt-1 max-w-xl text-[14px] text-dukka-muted">
                            Orders, rewards, and delivery details — all in one
                            place.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="inline-flex items-center gap-2 rounded-full border border-dukka-forest bg-dukka-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dukka-ink"
                    >
                        <BiEdit className="h-4 w-4" />
                        Edit profile
                    </button>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-3 sm:px-7 sm:pb-7">
                    {glanceCards.map((card) => (
                        <button
                            key={card.label}
                            type="button"
                            onClick={() => setStep(card.step)}
                            className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                                card.accent
                                    ? "border-dukka-forest/20 bg-dukka-forest text-white shadow-[0_10px_28px_rgba(13,82,63,0.18)] hover:shadow-[0_14px_32px_rgba(13,82,63,0.24)]"
                                    : "border-dukka-line bg-dukka-soft/60 hover:border-dukka-amber/70 hover:bg-white"
                            }`}
                        >
                            <span
                                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                                    card.accent
                                        ? "bg-white/12 text-dukka-amber"
                                        : "bg-white text-dukka-forest"
                                }`}
                            >
                                {card.icon}
                            </span>
                            <p
                                className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                                    card.accent
                                        ? "text-white/65"
                                        : "text-[#888B8B]"
                                }`}
                            >
                                {card.label}
                            </p>
                            <p
                                className={`mt-1 truncate text-[20px] font-semibold tracking-tight ${
                                    card.accent ? "text-white" : "text-dukka-ink"
                                }`}
                            >
                                {card.value}
                            </p>
                            <p
                                className={`mt-1 truncate text-[12px] ${
                                    card.accent
                                        ? "text-white/70"
                                        : "text-dukka-muted"
                                }`}
                            >
                                {card.hint}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {latestOrder ? (
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-dukka-line/80 bg-white px-5 py-5 text-left shadow-[0_10px_28px_rgba(3,24,21,0.04)] transition-all hover:-translate-y-0.5 hover:border-dukka-amber/70 sm:px-7"
                >
                    <div className="flex min-w-0 items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dukka-soft text-dukka-forest">
                            <BsCartCheck className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888B8B]">
                                Latest order
                            </p>
                            <p className="mt-1 truncate text-[17px] font-semibold text-dukka-ink">
                                #{latestOrder.order_number}
                            </p>
                            <p className="mt-0.5 text-[13px] text-dukka-muted">
                                {latestOrder.date} · {latestOrder.items} item
                                {latestOrder.items === 1 ? "" : "s"} ·{" "}
                                <span className="font-medium text-dukka-forest">
                                    {latestOrder.status}
                                </span>
                            </p>
                        </div>
                    </div>
                    <FaChevronRight className="h-3.5 w-3.5 shrink-0 text-[#888B8B] transition-transform group-hover:translate-x-0.5" />
                </button>
            ) : null}

            <div className="rounded-2xl border border-dukka-line/80 bg-white shadow-[0_12px_40px_rgba(3,24,21,0.04)]">
                <div className="border-b border-dukka-line/80 px-5 py-5 sm:px-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888B8B]">
                        Profile details
                    </p>
                    <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-dukka-forest">
                        Personal information
                    </h2>
                </div>
                <dl className="grid gap-5 px-5 py-6 sm:grid-cols-2 sm:px-7">
                    <div>
                        <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Full name
                        </dt>
                        <dd className="mt-1.5 text-[16px] text-dukka-ink">
                            {isLoading ? "Loading..." : me?.name || "—"}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Email
                        </dt>
                        <dd className="mt-1.5 text-[16px] text-dukka-forest">
                            {me?.email || "—"}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Phone
                        </dt>
                        <dd className="mt-1.5 text-[16px] text-dukka-ink">
                            {me?.phone_number || "Not set"}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[12px] uppercase tracking-[0.12em] text-[#888B8B]">
                            Date of birth
                        </dt>
                        <dd className="mt-1.5 text-[16px] text-dukka-ink">
                            {formatDate(me?.date_of_birth)}
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
};

export default UserDetails;
