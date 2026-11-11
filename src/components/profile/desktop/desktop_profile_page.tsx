"use client";

import { useMemo, useState } from "react";
import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineStars } from "react-icons/md";
import Link from "next/link";
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

    const profileOptionsList = [
        { name: "Orders", icon: <BsCartCheck className="h-5 w-5" />, step: 2 },
        { name: "Notifications", icon: <BiBell className="h-5 w-5" />, step: 3 },
        { name: "Points", icon: <MdOutlineStars className="h-5 w-5" />, step: 5 },
        {
            name: "Addresses",
            icon: <HiOutlineLocationMarker className="h-5 w-5" />,
            step: 6,
        },
        { name: "Market", icon: <BiMap className="h-5 w-5" />, step: 7 },
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
        <main className="flex w-full flex-col items-center gap-6 bg-[#F7F8F7] pb-12 pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <section className="w-full border-b border-[#E4E7E7] bg-white px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B7373]">
                    <Link href="/" className="hover:text-[#0D523F]">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-[#0D523F]">Profile</span>
                </nav>
            </section>

            <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-start md:justify-between md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <aside className="flex h-fit w-full flex-col border border-[#E4E7E7] bg-white md:w-[280px] lg:w-[300px]">
                    <div
                        className={`flex w-full gap-4 border-b border-[#E4E7E7] px-5 py-5 ${
                            step === 0 ? "bg-[#FEB100]" : "bg-white"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setStep(0)}
                            className={`flex h-14 w-14 shrink-0 items-center justify-center border ${
                                step === 0
                                    ? "border-[#031815] bg-white"
                                    : "border-[#E4E7E7] bg-[#F7F8F7]"
                            }`}
                        >
                            <GoPerson className="h-7 w-7 text-[#0D523F]" />
                        </button>
                        <div className="flex min-w-0 flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h1 className="truncate text-[18px] font-semibold text-[#031815]">
                                    {me?.name || "Customer"}
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    aria-label="Edit profile"
                                >
                                    <BiEdit className="h-5 w-5 text-[#0D523F]" />
                                </button>
                            </div>
                            <p className="truncate text-[13px] text-[#5B6363]">
                                {me?.email || ""}
                            </p>
                        </div>
                    </div>

                    <p className="px-5 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Account
                    </p>
                    <ul className="mt-2 flex flex-col pb-2">
                        {profileOptionsList.map((option) => (
                            <button
                                type="button"
                                className={`flex items-center gap-4 border-l-2 px-5 py-3 text-left transition-colors hover:bg-[#FEB100]/40 ${
                                    step === option.step
                                        ? "border-[#FEB100] bg-[#FEB100] font-semibold text-[#031815]"
                                        : "border-transparent font-medium text-[#0D523F]"
                                }`}
                                key={option.name}
                                onClick={() => setStep(option.step)}
                            >
                                {option.icon}
                                <span className="text-[15px] tracking-wide">
                                    {option.name}
                                </span>
                            </button>
                        ))}
                        <button
                            type="button"
                            className="flex items-center gap-4 border-l-2 border-transparent px-5 py-3 text-left font-medium text-[#D70404] transition-colors hover:bg-[#FEB100]/40"
                            onClick={() => setLogoutModal(true)}
                        >
                            <IoMdLogOut className="h-5 w-5" />
                            <span className="text-[15px] tracking-wide">
                                Logout
                            </span>
                        </button>
                        {logoutModal && (
                            <LogoutModal setLogoutModal={setLogoutModal} />
                        )}
                    </ul>
                </aside>

                <div className="min-w-0 flex-1">
                    {profilePages[step] ?? profilePages[0]}
                </div>
            </section>
        </main>
    );
};

export default DesktopProfilePage;
