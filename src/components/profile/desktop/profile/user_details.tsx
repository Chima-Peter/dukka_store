"use client";

import { BiEdit } from "react-icons/bi";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useGetOpenMarketsQuery } from "@/redux/services/catalog_api";
import { normalizeList } from "@/utils/map_product";

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
    const markets = Array.isArray(marketsData)
        ? marketsData
        : normalizeList(marketsData as { items?: typeof marketsData });
    const activeMarket = markets.find((market) => market.id === me?.active_market_id);
    const points = Number(me?.points?.balance ?? 0);

    return (
        <section className="md:w-[68%] lg:w-[74%] h-fit flex flex-col pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex justify-between py-6 border-b border-[#ADB1B1] items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="font-[500] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                    Profile overview
                </h1>
                <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 text-[#164D46]"
                >
                    <BiEdit className="h-5 w-5 xl:h-6 xl:w-6" />
                    <span className="text-sm font-medium xl:text-base">Edit profile</span>
                </button>
            </div>

            <section className="grid w-full gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 md:px-8">
                <div className="flex flex-col rounded-xl border border-[#ADB1B1]">
                    <h2 className="border-b border-[#ADB1B1] px-6 py-4 text-[18px] font-[400] tracking-wide">
                        Account
                    </h2>
                    <dl className="grid gap-4 px-6 py-5">
                        <div>
                            <dt className="text-sm text-gray-500">Full name</dt>
                            <dd className="text-[17px] text-[#0D3833]">
                                {isLoading ? "Loading..." : me?.name || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Email</dt>
                            <dd className="text-[17px] text-[#164D46]">{me?.email || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Phone</dt>
                            <dd className="text-[17px] text-[#0D3833]">
                                {me?.phone_number || "Not set"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Date of birth</dt>
                            <dd className="text-[17px] text-[#0D3833]">
                                {formatDate(me?.date_of_birth)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="rounded-xl border border-[#ADB1B1] px-6 py-5 text-left hover:border-[#FEB100]"
                    >
                        <p className="text-sm text-gray-500">Points</p>
                        <p className="mt-1 text-2xl font-semibold text-[#0D523F]">
                            {Number.isFinite(points) ? points.toLocaleString() : "0"}
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(7)}
                        className="rounded-xl border border-[#ADB1B1] px-6 py-5 text-left hover:border-[#FEB100]"
                    >
                        <p className="text-sm text-gray-500">Active market</p>
                        <p className="mt-1 text-xl font-medium text-[#0D3833]">
                            {activeMarket?.name || "Not set"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {activeMarket
                                ? `${activeMarket.code} · ${activeMarket.currency_code}`
                                : "Choose a market to shop"}
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(6)}
                        className="rounded-xl border border-[#ADB1B1] px-6 py-5 text-left hover:border-[#FEB100]"
                    >
                        <p className="text-sm text-gray-500">Addresses</p>
                        <p className="mt-1 text-xl font-medium text-[#0D3833]">
                            {(me?.shipping_address?.length || 0) +
                                (me?.billing_address?.length || 0)}{" "}
                            saved
                        </p>
                        <p className="text-sm text-gray-500">
                            Shipping {me?.shipping_address?.length || 0} · Billing{" "}
                            {me?.billing_address?.length || 0}
                        </p>
                    </button>
                </div>
            </section>
        </section>
    );
};

export default UserDetails;
