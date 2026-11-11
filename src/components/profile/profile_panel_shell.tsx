"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

type ProfilePanelShellProps = {
    title: string;
    children: React.ReactNode;
    onBack?: () => void;
    backHref?: string;
    className?: string;
};

const ProfilePanelShell = ({
    title,
    children,
    onBack,
    backHref,
    className,
}: ProfilePanelShellProps) => {
    return (
        <section
            className={`flex h-fit w-full flex-col rounded-xl border border-[#ADB1B1] bg-white pb-4 font-urbanist md:w-[68%] lg:w-[74%] ${className || ""}`}
        >
            <div className="flex w-full items-center gap-4 border-b border-[#ADB1B1] px-4 py-6 sm:px-6 md:px-8">
                {onBack ? (
                    <button type="button" onClick={onBack} aria-label="Back">
                        <FaArrowLeft className="h-5 w-5" />
                    </button>
                ) : backHref ? (
                    <Link href={backHref} aria-label="Back">
                        <FaArrowLeft className="h-5 w-5" />
                    </Link>
                ) : null}
                <h1 className="text-[20px] font-[500] tracking-wide capitalize md:text-[22px] xl:text-[24px]">
                    {title}
                </h1>
            </div>
            <div className="p-4 sm:p-6">{children}</div>
        </section>
    );
};

export default ProfilePanelShell;
