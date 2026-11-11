"use client";

import Link from "next/link";
import { BsChevronDoubleRight } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import ProfileSettingsForm from "@/components/profile/profile_settings_form";

const DesktopProfileSettingsPage = () => {
    return (
        <main className="flex w-full flex-col items-center gap-6 bg-[#F0F0F0] pb-12 pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <section className="w-full bg-white px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <p className="flex items-center gap-1 border-b-[1.4px] border-b-gray-300 pb-2">
                    <Link className="text-[13px] font-normal opacity-75" href="/">
                        Home
                    </Link>
                    <strong className="opacity-65">
                        <BsChevronDoubleRight className="h-3 w-3" />
                    </strong>
                    <Link
                        href="/profile"
                        className="text-[16px] font-[500] capitalize tracking-wide"
                    >
                        Profile
                    </Link>
                    <strong className="opacity-65">
                        <BsChevronDoubleRight className="h-3 w-3" />
                    </strong>
                    <span className="text-[16px] font-[500] capitalize tracking-wide">
                        Settings
                    </span>
                </p>
            </section>

            <section className="w-full max-w-2xl px-4 sm:px-6 md:px-8">
                <div className="flex flex-col rounded-xl border border-[#ADB1B1] bg-white pb-4">
                    <div className="flex items-center gap-4 border-b border-[#ADB1B1] px-6 py-6">
                        <Link href="/profile" aria-label="Back to profile">
                            <FaArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-[22px] font-[500] tracking-wide">
                            Profile settings
                        </h1>
                    </div>
                    <ProfileSettingsForm className="p-6" />
                </div>
            </section>
        </main>
    );
};

export default DesktopProfileSettingsPage;
