"use client";

type Props = {
    children: React.ReactNode;
};

const ProfileMobileSection = ({ children }: Props) => {
    return (
        <main className="flex w-full flex-col gap-4 bg-[#F0F0F0] px-3 pb-10 pt-[120px] font-urbanist sm:px-4 sm:pt-[130px]">
            {children}
        </main>
    );
};

export default ProfileMobileSection;
