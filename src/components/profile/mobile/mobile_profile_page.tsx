"use client";

import { useState } from "react";
import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineStars } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "@/components/ui/back_button";
import LogoutModal from "@/components/authentication/logout_modal";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useGetOpenMarketsQuery } from "@/redux/services/catalog_api";

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.35,
            ease: "easeOut" as const,
        },
    }),
};

const MobileProfilePage = () => {
    const { data: me } = useGetMeQuery();
    const { data: marketsData } = useGetOpenMarketsQuery();
    const [logoutModal, setLogoutModal] = useState(false);

    const points = Number(me?.points?.balance ?? 0);
    const firstName = (me?.name || "there").split(" ")[0];
    const activeMarket = (marketsData ?? []).find(
        (market) => market.id === me?.active_market_id,
    );
    const addressCount =
        (me?.shipping_address?.length || 0) + (me?.billing_address?.length || 0);

    const quickActions = [
        {
            name: "Orders",
            href: "/profile/order",
            hint: "Track & reorder",
            icon: <BsCartCheck className="h-5 w-5" />,
        },
        {
            name: "Addresses",
            href: "/profile/addresses",
            hint: `${addressCount} saved`,
            icon: <HiOutlineLocationMarker className="h-5 w-5" />,
        },
        {
            name: "Market",
            href: "/profile/market",
            hint: activeMarket?.name || "Choose market",
            icon: <BiMap className="h-5 w-5" />,
        },
        {
            name: "Inbox",
            href: "/profile/messages",
            hint: "Updates & alerts",
            icon: <BiBell className="h-5 w-5" />,
        },
        {
            name: "Settings",
            href: "/profile/user",
            hint: "Name, phone, email",
            icon: <CgProfile className="h-5 w-5" />,
        },
    ];

    return (
        <main className="relative flex w-full flex-col overflow-hidden bg-dukka-panel pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[100px] h-[320px] bg-[radial-gradient(ellipse_at_top,_rgba(13,82,63,0.14),_transparent_62%),radial-gradient(ellipse_at_80%_20%,_rgba(254,177,0,0.18),_transparent_45%)]"
            />

            <section className="relative z-[1] mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-12 pt-4 sm:px-6">
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <BackButton />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-dukka-forest">
                        Account
                    </p>
                </motion.div>

                <motion.section
                    className="flex items-center gap-4"
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                >
                    <div className="relative shrink-0">
                        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-dukka-forest text-white shadow-[0_10px_30px_rgba(13,82,63,0.28)] ring-4 ring-white">
                            <GoPerson className="h-8 w-8" />
                        </div>
                        <Link
                            href="/profile/user"
                            className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-dukka-amber text-dukka-ink shadow-sm transition-transform hover:scale-105"
                            aria-label="Edit profile"
                        >
                            <BiEdit className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-dukka-muted">
                            Welcome back
                        </p>
                        <h1 className="truncate text-[28px] font-semibold leading-tight tracking-tight text-dukka-ink">
                            Hello, {firstName}
                        </h1>
                        <p className="mt-0.5 truncate text-[14px] text-dukka-muted">
                            {me?.email || "Manage your shopping account"}
                        </p>
                    </div>
                </motion.section>

                <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                >
                    <Link
                        href="/profile/points"
                        className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-dukka-forest px-5 py-5 text-white shadow-[0_14px_36px_rgba(13,82,63,0.22)] transition-transform hover:-translate-y-0.5"
                    >
                        <div
                            aria-hidden
                            className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-dukka-amber/25 blur-2xl transition-opacity group-hover:opacity-90"
                        />
                        <div className="relative z-[1]">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
                                <MdOutlineStars className="h-3.5 w-3.5 text-dukka-amber" />
                                Rewards
                            </div>
                            <p className="text-[13px] text-white/75">
                                Available points
                            </p>
                            <p className="mt-0.5 text-[32px] font-semibold leading-none tracking-tight">
                                {Number.isFinite(points)
                                    ? points.toLocaleString()
                                    : "0"}
                            </p>
                        </div>
                        <span className="relative z-[1] inline-flex items-center gap-1 text-[13px] font-semibold text-dukka-amber">
                            View
                            <FaChevronRight className="h-3 w-3" />
                        </span>
                    </Link>
                </motion.div>

                <motion.section
                    className="grid grid-cols-2 gap-3"
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                >
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className="group flex min-h-[118px] flex-col justify-between rounded-2xl border border-dukka-line/80 bg-white/90 p-4 shadow-[0_8px_24px_rgba(3,24,21,0.04)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-dukka-amber/70 hover:shadow-[0_12px_28px_rgba(3,24,21,0.08)]"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-dukka-soft text-dukka-forest transition-colors group-hover:bg-dukka-amber/30">
                                {action.icon}
                            </span>
                            <div>
                                <p className="text-[15px] font-semibold text-dukka-ink">
                                    {action.name}
                                </p>
                                <p className="mt-0.5 truncate text-[12px] text-dukka-muted">
                                    {action.hint}
                                </p>
                            </div>
                        </Link>
                    ))}
                </motion.section>

                <motion.button
                    type="button"
                    onClick={() => setLogoutModal(true)}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl border border-dukka-line bg-white px-4 py-3.5 text-[14px] font-semibold text-[#C62828] transition-colors hover:border-[#C62828]/35 hover:bg-[#FFF5F5]"
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                >
                    <IoMdLogOut className="h-4 w-4" />
                    Sign out
                </motion.button>
            </section>

            {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
        </main>
    );
};

export default MobileProfilePage;
