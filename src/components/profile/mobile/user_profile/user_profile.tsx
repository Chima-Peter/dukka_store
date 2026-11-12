"use client";

import { GoPerson } from "react-icons/go";
import BackButton from "@/components/ui/back_button";
import ProfileSettingsForm from "@/components/profile/profile_settings_form";
import { useGetMeQuery } from "@/redux/services/customer_api";

const UserProfile = () => {
    const { data: me, isLoading } = useGetMeQuery();
    const firstName = (me?.name || "Customer").split(" ")[0];

    return (
        <main className="relative flex w-full flex-col overflow-hidden bg-dukka-panel pt-[120px] font-urbanist sm:pt-[130px]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[100px] h-[260px] bg-[radial-gradient(ellipse_at_top,_rgba(13,82,63,0.12),_transparent_60%),radial-gradient(ellipse_at_80%_10%,_rgba(254,177,0,0.16),_transparent_45%)]"
            />

            <section className="relative z-[1] mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-10 pt-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-[18px] font-semibold tracking-tight text-dukka-ink">
                        Profile settings
                    </h1>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-dukka-line/80 bg-white p-5 shadow-[0_10px_28px_rgba(3,24,21,0.04)]">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-dukka-forest text-white ring-4 ring-dukka-soft">
                        <GoPerson className="h-7 w-7" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-[18px] font-semibold text-dukka-ink">
                            {isLoading ? "Loading..." : firstName}
                        </h2>
                        <p className="truncate text-[13px] text-dukka-muted">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-dukka-line/80 bg-white py-5 shadow-[0_10px_28px_rgba(3,24,21,0.04)]">
                    <ProfileSettingsForm className="px-4 sm:px-5" />
                </div>
            </section>
        </main>
    );
};

export default UserProfile;
