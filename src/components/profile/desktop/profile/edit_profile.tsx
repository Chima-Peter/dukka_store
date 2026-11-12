"use client";

import { FaArrowLeft } from "react-icons/fa6";
import ProfileSettingsForm from "@/components/profile/profile_settings_form";

const EditProfile = ({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <section className="flex h-fit w-full flex-col overflow-hidden rounded-2xl border border-dukka-line/80 bg-white pb-4 font-urbanist shadow-[0_12px_40px_rgba(3,24,21,0.04)]">
            <div className="flex w-full items-center gap-4 border-b border-dukka-line/80 px-5 py-5 sm:px-7">
                <button
                    type="button"
                    onClick={() => setStep(0)}
                    aria-label="Back"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-dukka-soft text-dukka-forest transition-colors hover:bg-dukka-amber/35"
                >
                    <FaArrowLeft className="h-3.5 w-3.5" />
                </button>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Account
                    </p>
                    <h1 className="text-[20px] font-semibold tracking-tight text-dukka-forest md:text-[22px]">
                        Edit profile
                    </h1>
                </div>
            </div>
            <ProfileSettingsForm className="p-5 sm:p-7" onSaved={() => setStep(0)} />
        </section>
    );
};

export default EditProfile;
