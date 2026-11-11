"use client";

import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { GoHeart, GoPerson } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineStars } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/ui/back_button";
import { useGetMeQuery } from "@/redux/services/customer_api";

const MobileProfilePage = () => {
    const { data: me } = useGetMeQuery();
    const points = Number(me?.points?.balance ?? 0);

    const profileOptionsList = [
        {
            name: "Profile settings",
            href: "/profile/user",
            icon: <CgProfile className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />,
        },
        {
            name: "Points",
            href: "/profile/points",
            icon: <MdOutlineStars className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />,
            meta: Number.isFinite(points) ? points.toLocaleString() : "0",
        },
        {
            name: "Addresses",
            href: "/profile/addresses",
            icon: (
                <HiOutlineLocationMarker className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />
            ),
        },
        {
            name: "Market",
            href: "/profile/market",
            icon: <BiMap className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />,
        },
        {
            name: "Notifications",
            href: "/profile/messages",
            icon: <BiBell className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />,
        },
        {
            name: "Favorite",
            href: "/profile/favorite",
            icon: <GoHeart className="h-6 w-6 text-[#164D46] md:h-7 md:w-7" />,
        },
        {
            name: "Order",
            href: "/profile/order",
            icon: (
                <Image
                    width={24}
                    height={24}
                    src="/images/profile/order.svg"
                    alt="Orders"
                    className="h-6 w-6 md:h-7 md:w-7"
                />
            ),
        },
    ];

    return (
        <main className="flex w-full flex-col bg-[#F0F0F0] pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px]">
            <section className="relative flex w-full items-center justify-center bg-white px-4 py-4 sm:px-6 md:px-8">
                <div className="absolute left-[5px] sm:left-[14px] md:left-[21px]">
                    <BackButton />
                </div>
                <h1 className="self-center text-[20px] font-[500] md:text-[22px]">
                    Profile
                </h1>
            </section>

            <section className="flex w-full flex-col bg-white">
                <div className="flex w-full items-center gap-6 border-b bg-[#FFEDE3] p-6">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white">
                        <GoPerson className="h-8 w-8 text-black" />
                        <Link
                            href="/profile/user"
                            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#FBAE30]"
                        >
                            <BiEdit className="h-5 w-5 text-[#164D46]" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[18px] font-[500] md:text-[20px]">
                            {me?.name || "Customer"}
                        </h1>
                        <p className="text-[14px] font-[300] tracking-wide">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col border-t border-t-[#ADB1B1] pb-10">
                    {profileOptionsList.map((option) => (
                        <Link
                            href={option.href}
                            className="flex w-full cursor-pointer items-center justify-between border-b border-b-[#ADB1B1] bg-white px-6 py-3 font-[400] hover:bg-[#FEB100] hover:font-[500] md:py-4"
                            key={option.name}
                        >
                            <div className="flex items-center gap-8">
                                {option.icon}
                                <div>
                                    <p className="text-[14px] font-[500] tracking-wide xs:text-[16px] md:text-[18px]">
                                        {option.name}
                                    </p>
                                    {"meta" in option && option.meta ? (
                                        <p className="text-xs text-gray-500">
                                            Balance: {option.meta}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E2E8E8] md:h-9 md:w-9">
                                <FaChevronRight className="h-3 w-3 text-[#888B8B] md:h-5 md:w-5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MobileProfilePage;
