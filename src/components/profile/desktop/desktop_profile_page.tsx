"use client";

import { useMemo, useState } from "react";
import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineStars } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";
import EditProfile from "./profile/edit_profile";
import OrdersLarge from "./orders/orders_large";
import UserDetails from "./profile/user_details";
import LogoutModal from "@/components/authentication/logout_modal";
import ProfilePointsPanel from "@/components/profile/profile_points_panel";
import ProfileAddressesPanel from "@/components/profile/profile_addresses_panel";
import ProfileMarketPanel from "@/components/profile/profile_market_panel";
import ProfileNotificationsPanel from "@/components/profile/profile_notifications_panel";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useGetOrdersQuery } from "@/redux/services/orders_api";
import { toOrdersType } from "@/utils/map_order";

const DesktopProfilePage = ({ initialStep = 0 }: { initialStep?: number }) => {
    const [step, setStep] = useState(initialStep === 1 ? 0 : initialStep);
    const [logoutModal, setLogoutModal] = useState(false);
    const { data: me } = useGetMeQuery();
    const { data: ordersPage } = useGetOrdersQuery();
    const ordersList = useMemo(
        () => (ordersPage?.items ?? []).map(toOrdersType),
        [ordersPage],
    );

    const firstName = (me?.name || "Customer").split(" ")[0];
    const points = Number(me?.points?.balance ?? 0);

    const profileOptionsList = [
        { name: "Overview", icon: <GoPerson className="h-5 w-5" />, step: 0 },
        { name: "Orders", icon: <BsCartCheck className="h-5 w-5" />, step: 2 },
        { name: "Points", icon: <MdOutlineStars className="h-5 w-5" />, step: 5 },
        {
            name: "Addresses",
            icon: <HiOutlineLocationMarker className="h-5 w-5" />,
            step: 6,
        },
        { name: "Market", icon: <BiMap className="h-5 w-5" />, step: 7 },
        { name: "Inbox", icon: <BiBell className="h-5 w-5" />, step: 3 },
    ];

    const profilePages: Record<number, React.ReactNode> = {
        0: <UserDetails setStep={setStep} key={0} />,
        2: <OrdersLarge orders={ordersList} key={2} />,
        3: <ProfileNotificationsPanel onBack={() => setStep(0)} key={3} />,
        4: <EditProfile setStep={setStep} key={4} />,
        5: <ProfilePointsPanel onBack={() => setStep(0)} key={5} />,
        6: <ProfileAddressesPanel onBack={() => setStep(0)} key={6} />,
        7: <ProfileMarketPanel onBack={() => setStep(0)} key={7} />,
    };

    return (
        <main className="relative flex w-full flex-col items-center overflow-hidden bg-dukka-panel pb-14 pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[110px] h-[280px] bg-[radial-gradient(ellipse_at_20%_0%,_rgba(13,82,63,0.12),_transparent_55%),radial-gradient(ellipse_at_85%_10%,_rgba(254,177,0,0.16),_transparent_42%)]"
            />

            <section className="relative z-[1] w-full px-4 py-5 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-dukka-muted">
                    <Link href="/" className="transition-colors hover:text-dukka-forest">
                        Home
                    </Link>
                    <span className="text-dukka-line">/</span>
                    <span className="font-medium text-dukka-forest">Account</span>
                </nav>
            </section>

            <section className="relative z-[1] mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-start md:gap-7 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <motion.aside
                    className="flex h-fit w-full flex-col overflow-hidden rounded-2xl border border-dukka-line/80 bg-white/95 shadow-[0_12px_40px_rgba(3,24,21,0.05)] backdrop-blur-sm md:sticky md:top-[140px] md:w-[300px] lg:w-[320px]"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <div className="relative overflow-hidden bg-dukka-forest px-5 pb-5 pt-6 text-white">
                        <div
                            aria-hidden
                            className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-dukka-amber/30 blur-2xl"
                        />
                        <div className="relative z-[1] flex items-start gap-3.5">
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30 transition-transform hover:scale-[1.03]"
                                aria-label="Go to overview"
                            >
                                <GoPerson className="h-7 w-7 text-white" />
                            </button>
                            <div className="min-w-0 flex-1">
                                <p className="text-[12px] text-white/70">
                                    Welcome back
                                </p>
                                <div className="mt-0.5 flex items-center gap-2">
                                    <h1 className="truncate text-[18px] font-semibold tracking-tight">
                                        {firstName}
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="rounded-full bg-dukka-amber p-1.5 text-dukka-ink transition-transform hover:scale-105"
                                        aria-label="Edit profile"
                                    >
                                        <BiEdit className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <p className="mt-0.5 truncate text-[12px] text-white/65">
                                    {me?.email || ""}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setStep(5)}
                            className="relative z-[1] mt-4 flex w-full items-center justify-between rounded-xl bg-white/10 px-3.5 py-3 text-left transition-colors hover:bg-white/15"
                        >
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                                    Points
                                </p>
                                <p className="mt-0.5 text-[22px] font-semibold leading-none">
                                    {Number.isFinite(points)
                                        ? points.toLocaleString()
                                        : "0"}
                                </p>
                            </div>
                            <MdOutlineStars className="h-5 w-5 text-dukka-amber" />
                        </button>
                    </div>

                    <p className="px-5 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Menu
                    </p>
                    <ul className="flex flex-col gap-1 px-3 pb-4">
                        {profileOptionsList.map((option) => {
                            const active = step === option.step;
                            return (
                                <button
                                    type="button"
                                    className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all ${
                                        active
                                            ? "bg-dukka-amber font-semibold text-dukka-ink shadow-[0_6px_16px_rgba(254,177,0,0.28)]"
                                            : "font-medium text-dukka-forest hover:bg-dukka-soft"
                                    }`}
                                    key={option.name}
                                    onClick={() => setStep(option.step)}
                                >
                                    <span
                                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                                            active
                                                ? "bg-white/70"
                                                : "bg-dukka-soft"
                                        }`}
                                    >
                                        {option.icon}
                                    </span>
                                    <span className="text-[14px] tracking-wide">
                                        {option.name}
                                    </span>
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            className="mt-1 flex items-center gap-3 rounded-xl px-3.5 py-3 text-left font-medium text-[#C62828] transition-colors hover:bg-[#FFF5F5]"
                            onClick={() => setLogoutModal(true)}
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F0]">
                                <IoMdLogOut className="h-5 w-5" />
                            </span>
                            <span className="text-[14px] tracking-wide">
                                Sign out
                            </span>
                        </button>
                    </ul>
                </motion.aside>

                <motion.div
                    className="min-w-0 flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                >
                    {profilePages[step] ?? profilePages[0]}
                </motion.div>
            </section>

            {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
        </main>
    );
};

export default DesktopProfilePage;
