"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

type ProfileSectionShellProps = {
    title: string;
    children: React.ReactNode;
    onBack?: () => void;
    backHref?: string;
    className?: string;
};

const ProfileSectionShell = ({
    title,
    children,
    onBack,
    backHref,
    className,
}: ProfileSectionShellProps) => {
    return (
        <section
            className={`flex h-fit w-full flex-col border border-[#E4E7E7] bg-white pb-4 font-urbanist ${className || ""}`}
        >
            <div className="flex w-full items-center gap-4 border-b border-[#E4E7E7] px-4 py-5 sm:px-6 md:px-8">
                {onBack ? (
                    <button type="button" onClick={onBack} aria-label="Back">
                        <FaArrowLeft className="h-4 w-4 text-[#0D523F]" />
                    </button>
                ) : backHref ? (
                    <Link href={backHref} aria-label="Back">
                        <FaArrowLeft className="h-4 w-4 text-[#0D523F]" />
                    </Link>
                ) : null}
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Account
                    </p>
                    <h1 className="text-[20px] font-semibold tracking-tight text-[#0D523F] md:text-[22px]">
                        {title}
                    </h1>
                </div>
            </div>
            <div className="px-4 py-6 sm:px-6 md:px-8">{children}</div>
        </section>
    );
};

export default ProfileSectionShell;
