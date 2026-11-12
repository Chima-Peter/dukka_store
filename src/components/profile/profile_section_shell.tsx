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
            className={`flex h-fit w-full flex-col overflow-hidden rounded-2xl border border-dukka-line/80 bg-white shadow-[0_12px_40px_rgba(3,24,21,0.04)] font-urbanist ${className || ""}`}
        >
            <div className="flex w-full items-center gap-4 border-b border-dukka-line/80 px-4 py-5 sm:px-6 md:px-8">
                {onBack ? (
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Back"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-dukka-soft text-dukka-forest transition-colors hover:bg-dukka-amber/35"
                    >
                        <FaArrowLeft className="h-3.5 w-3.5" />
                    </button>
                ) : backHref ? (
                    <Link
                        href={backHref}
                        aria-label="Back"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-dukka-soft text-dukka-forest transition-colors hover:bg-dukka-amber/35"
                    >
                        <FaArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                ) : null}
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Account
                    </p>
                    <h1 className="text-[20px] font-semibold tracking-tight text-dukka-forest md:text-[22px]">
                        {title}
                    </h1>
                </div>
            </div>
            <div className="px-4 py-6 sm:px-6 md:px-8">{children}</div>
        </section>
    );
};

export default ProfileSectionShell;
