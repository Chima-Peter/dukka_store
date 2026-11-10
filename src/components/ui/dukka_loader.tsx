"use client";

type DukkaLoaderProps = {
    label?: string;
    variant?: "page" | "section" | "inline";
};

const DukkaLoader = ({
    label = "Loading",
    variant = "section",
}: DukkaLoaderProps) => {
    if (variant === "inline") {
        return (
            <span
                className="inline-flex items-center gap-2 font-urbanist text-[13px] text-[#0D523F]"
                role="status"
                aria-live="polite"
            >
                <span className="dukka-loader-bars" aria-hidden>
                    <span />
                    <span />
                    <span />
                </span>
                <span className="tracking-wide">{label}</span>
            </span>
        );
    }

    const shell =
        variant === "page"
            ? "flex min-h-[50vh] w-full items-center justify-center bg-[#F0F0F0] px-6 py-16"
            : "flex w-full items-center justify-center px-6 py-12";

    return (
        <div className={shell} role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-5 font-urbanist">
                <div className="relative flex h-14 w-14 items-center justify-center">
                    <span className="dukka-loader-ring" aria-hidden />
                    <span className="relative z-10 text-[18px] font-semibold tracking-tight text-[#0D523F]">
                        D
                    </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#888B8B]">
                        Dukka
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="dukka-loader-bars" aria-hidden>
                            <span />
                            <span />
                            <span />
                        </span>
                        <p className="text-[14px] font-medium text-[#0D523F]">
                            {label}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DukkaLoader;
