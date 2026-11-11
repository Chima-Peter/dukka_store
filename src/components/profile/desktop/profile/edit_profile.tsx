"use client";

import { FaArrowLeft } from "react-icons/fa6";
import ProfileSettingsForm from "@/components/profile/profile_settings_form";

const EditProfile = ({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <section className="flex h-fit w-[74%] flex-col rounded-xl border border-[#ADB1B1] pb-4 font-urbanist">
            <div className="flex w-full items-center gap-4 border-b border-[#ADB1B1] px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <button type="button" onClick={() => setStep(0)} aria-label="Back">
                    <FaArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="font-[500] tracking-wide capitalize min-lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
                    Edit profile
                </h1>
            </div>
            <ProfileSettingsForm
                className="p-6"
                onSaved={() => setStep(0)}
            />
        </section>
    );
};

export default EditProfile;
