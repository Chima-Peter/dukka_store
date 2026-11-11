"use client";

import { useMemo, useState } from "react";
import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { BsCartCheck, BsChevronDoubleRight } from "react-icons/bs";
import { GoHeart, GoPerson } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineStars } from "react-icons/md";
import Link from "next/link";
import EditProfile from "./profile/edit_profile";
import FavouriteLarge from "./favourite_large";
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
    const [step, setStep] = useState(initialStep);
    const [logoutModal, setLogoutModal] = useState(false);
    const { data: me } = useGetMeQuery();
    const { data: ordersPage } = useGetOrdersQuery();
    const ordersList = useMemo(
        () => (ordersPage?.items ?? []).map(toOrdersType),
        [ordersPage],
    );

    const favorites: { title: string; price: string; image: string }[] = [];

    const profileOptionsList = [
        { name: "Favorite", icon: <GoHeart className="h-5 w-5" />, step: 1 },
        { name: "Order", icon: <BsCartCheck className="h-5 w-5" />, step: 2 },
        { name: "Notifications", icon: <BiBell className="h-5 w-5" />, step: 3 },
        { name: "Points", icon: <MdOutlineStars className="h-5 w-5" />, step: 5 },
        {
            name: "Addresses",
            icon: <HiOutlineLocationMarker className="h-5 w-5" />,
            step: 6,
        },
        { name: "Market", icon: <BiMap className="h-5 w-5" />, step: 7 },
    ];

    const profilePages = [
        <UserDetails setStep={setStep} key={0} />,
        <FavouriteLarge header="Favorites" caller="" details={favorites} key={1} />,
        <OrdersLarge orders={ordersList} key={2} />,
        <ProfileNotificationsPanel onBack={() => setStep(0)} key={3} />,
        <EditProfile setStep={setStep} key={4} />,
        <ProfilePointsPanel onBack={() => setStep(0)} key={5} />,
        <ProfileAddressesPanel onBack={() => setStep(0)} key={6} />,
        <ProfileMarketPanel onBack={() => setStep(0)} key={7} />,
    ];

    return (
        <main className="flex w-full flex-col items-center gap-8 bg-[#F0F0F0] pb-12 pt-[120px] font-main sm:pt-[130px] min-lg:gap-3 min-lg:pb-6 lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px]">
            <section className="w-full bg-white px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <p className="flex items-center gap-1 border-b-[1.4px] border-b-gray-300 pb-2">
                    <Link className="text-[13px] font-normal opacity-75" href="/">
                        Home
                    </Link>{" "}
                    <strong className="opacity-65">
                        <BsChevronDoubleRight className="h-3 w-3" />
                    </strong>{" "}
                    <Link
                        href="/profile"
                        className="text-[16px] font-[500] capitalize tracking-wide"
                    >
                        Profile
                    </Link>
                </p>
            </section>

            <section className="flex w-full justify-between gap-2 bg-white px-4 sm:px-6 md:px-8 min-lg:px-12 min-lg:py-6 xl:px-14 2xl:px-16">
                <section className="flex h-fit w-fit flex-col rounded-2xl border border-[#ADB1B1] bg-white">
                    <div
                        className={`flex w-full gap-6 rounded-t-2xl border-b px-8 py-4 ${
                            step === 0 ? "bg-[#FEB100]" : "bg-white"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setStep(0)}
                            className={`flex h-16 w-16 items-center justify-center rounded-full border xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 ${
                                step === 0 ? "border-black" : "border-gray-300"
                            }`}
                        >
                            <GoPerson className="h-7 w-7 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
                        </button>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-[20px] font-[500] xl:text-[22px] 2xl:text-[24px]">
                                    {me?.name || "Customer"}
                                </h1>
                                <button type="button" onClick={() => setStep(4)}>
                                    <BiEdit className="h-5 w-5 cursor-pointer text-[#164D46] xl:h-6 xl:w-6 2xl:h-8 2xl:w-8" />
                                </button>
                            </div>
                            <p className="text-[14px] font-[300] tracking-wide xl:text-[16px]">
                                {me?.email || ""}
                            </p>
                        </div>
                    </div>

                    <ul className="mt-8 flex flex-col">
                        {profileOptionsList.map((option) => (
                            <button
                                type="button"
                                className={`flex items-center gap-6 border-b border-b-[#ADB1B1] px-8 py-3 font-[400] hover:bg-[#FEB100] hover:font-[500] ${
                                    step === option.step ? "bg-[#FEB100]" : "bg-white"
                                }`}
                                key={option.name}
                                onClick={() => setStep(option.step)}
                            >
                                {option.icon}
                                <p className="text-[18px] tracking-wider xl:text-[20px] 2xl:text-[22px]">
                                    {option.name}
                                </p>
                            </button>
                        ))}
                        <button
                            type="button"
                            className="flex items-center gap-6 border-b border-b-[#ADB1B1] bg-white px-8 py-3 font-[400] text-[#D70404] hover:bg-[#FEB100] hover:font-[500]"
                            onClick={() => setLogoutModal(true)}
                        >
                            <IoMdLogOut className="h-5 w-5" />
                            <p className="text-[18px] tracking-wider xl:text-[20px] 2xl:text-[22px]">
                                Logout
                            </p>
                        </button>
                        {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
                    </ul>
                </section>

                {profilePages[step]}
            </section>
        </main>
    );
};

export default DesktopProfilePage;
