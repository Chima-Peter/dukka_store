"use client";

import { BiBell, BiEdit, BiMap } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineStars } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import Link from "next/link";
import BackButton from "@/components/ui/back_button";
import { useGetMeQuery } from "@/redux/services/customer_api";

const MobileProfilePage = () => {
    const { data: me } = useGetMeQuery();
    const points = Number(me?.points?.balance ?? 0);

    const profileOptionsList = [
        {
            name: "Profile settings",
            href: "/profile/user",
            icon: <CgProfile className="h-6 w-6 text-[#0D523F]" />,
        },
        {
            name: "Orders",
            href: "/profile/order",
            icon: <BsCartCheck className="h-6 w-6 text-[#0D523F]" />,
        },
        {
            name: "Points",
            href: "/profile/points",
            icon: <MdOutlineStars className="h-6 w-6 text-[#0D523F]" />,
            meta: Number.isFinite(points) ? points.toLocaleString() : "0",
        },
        {
            name: "Addresses",
            href: "/profile/addresses",
            icon: (
                <HiOutlineLocationMarker className="h-6 w-6 text-[#0D523F]" />
            ),
        },
        {
            name: "Market",
            href: "/profile/market",
            icon: <BiMap className="h-6 w-6 text-[#0D523F]" />,
        },
        {
            name: "Notifications",
            href: "/profile/messages",
            icon: <BiBell className="h-6 w-6 text-[#0D523F]" />,
        },
    ];

    return (
        <main className="flex w-full flex-col bg-[#F7F8F7] pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <section className="relative flex w-full items-center justify-center border-b border-[#E4E7E7] bg-white px-4 py-4 sm:px-6 md:px-8">
                <div className="absolute left-[5px] sm:left-[14px] md:left-[21px]">
                    <BackButton />
                </div>
                <h1 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0D523F]">
                    Profile
                </h1>
            </section>

            <section className="flex w-full flex-col bg-white">
                <div className="flex w-full items-center gap-5 border-b border-[#E4E7E7] bg-[#0D523F] p-6 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center border border-white/30 bg-white/10">
                        <GoPerson className="h-8 w-8 text-white" />
                        <Link
                            href="/profile/user"
                            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center bg-[#FEB100]"
                            aria-label="Edit profile"
                        >
                            <BiEdit className="h-4 w-4 text-[#031815]" />
                        </Link>
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                        <h1 className="truncate text-[18px] font-semibold">
                            {me?.name || "Customer"}
                        </h1>
                        <p className="truncate text-[14px] text-white/80">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col pb-10">
                    {profileOptionsList.map((option) => (
                        <Link
                            href={option.href}
                            className="flex w-full cursor-pointer items-center justify-between border-b border-[#E4E7E7] bg-white px-6 py-4 transition-colors hover:bg-[#FEB100]/35"
                            key={option.name}
                        >
                            <div className="flex items-center gap-5">
                                {option.icon}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide text-[#031815] md:text-[16px]">
                                        {option.name}
                                    </p>
                                    {"meta" in option && option.meta ? (
                                        <p className="text-xs text-[#6B7373]">
                                            Balance: {option.meta}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <FaChevronRight className="h-3.5 w-3.5 text-[#888B8B]" />
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MobileProfilePage;
