"use client";

import { GoPerson } from "react-icons/go";
import BackButton from "@/components/ui/back_button";
import ProfileSettingsForm from "@/components/profile/profile_settings_form";
import { useGetMeQuery } from "@/redux/services/customer_api";

const UserProfile = () => {
    const { data: me, isLoading } = useGetMeQuery();

    return (
        <main className="flex w-full flex-col gap-6 bg-[#F0F0F0] pt-[120px] font-urbanist sm:pt-[130px]">
            <section className="flex h-fit w-full flex-col gap-6 bg-white pb-8 pt-4">
                <section className="relative flex w-full items-center justify-between px-4 sm:px-6 md:px-8">
                    <BackButton />
                    <h1 className="self-center text-[20px] font-[500] md:text-[22px]">
                        Profile settings
                    </h1>
                    <span />
                </section>

                <div className="flex h-[100px] w-[94%] items-center gap-6 self-center rounded-lg border border-[#ADB1B1] bg-[#FFEDE3] p-6">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white">
                        <GoPerson className="h-8 w-8 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[18px] font-[500] md:text-[20px]">
                            {isLoading ? "Loading..." : me?.name || "Customer"}
                        </h1>
                        <p className="text-[14px] font-[300] tracking-wide">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>

                <ProfileSettingsForm className="px-4 sm:px-6 md:px-8" />
            </section>
        </main>
    );
};

export default UserProfile;
