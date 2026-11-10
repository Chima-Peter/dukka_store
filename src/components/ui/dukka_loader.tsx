"use client";

import { motion } from "framer-motion";

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
                className="inline-flex items-center gap-2.5 font-urbanist text-[13px] text-[#0D523F]"
                role="status"
                aria-live="polite"
            >
                <span className="dukka-loader-inline" aria-hidden />
                <span className="tracking-wide">{label}</span>
            </span>
        );
    }

    const shell =
        variant === "page"
            ? "flex min-h-[55vh] w-full items-center justify-center bg-[#F0F0F0] px-6 py-20"
            : "flex w-full items-center justify-center px-6 py-16";

    return (
        <div className={shell} role="status" aria-live="polite">
            <div className="flex w-full max-w-[220px] flex-col items-center gap-6 font-urbanist">
                <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#888B8B]">
                        Dukka
                    </p>
                    <div className="relative">
                        <motion.p
                            className="text-[42px] font-semibold leading-none tracking-tight text-[#0D523F]"
                            animate={{ opacity: [0.55, 1, 0.55] }}
                            transition={{
                                duration: 1.8,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        >
                            Store
                        </motion.p>
                        <span className="dukka-loader-line" aria-hidden />
                    </div>
                </motion.div>

                <p className="text-center text-[13px] font-medium tracking-wide text-[#5B6363]">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default DukkaLoader;
