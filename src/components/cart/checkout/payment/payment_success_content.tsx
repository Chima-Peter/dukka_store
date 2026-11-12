"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useAppSelector } from "@/redux/store";

const PaymentSuccessContent = () => {
    const searchParams = useSearchParams();
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const [ready, setReady] = useState(false);

    const reference =
        searchParams.get("reference") || searchParams.get("trxref") || "";

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return (
            <main className="page-nav-offset flex min-h-[50vh] items-center justify-center bg-dukka-canvas font-urbanist">
                <p className="text-dukka-muted">Confirming payment…</p>
            </main>
        );
    }

    const hasReference = Boolean(reference?.trim());

    return (
        <main className="page-nav-offset flex w-full flex-col bg-dukka-canvas font-urbanist">
            <section className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 md:py-24">
                <IoCheckmarkCircleOutline
                    className={`h-14 w-14 ${
                        hasReference ? "text-dukka-amber" : "text-dukka-muted"
                    }`}
                />
                {hasReference ? (
                    <>
                        <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-dukka-ink">
                            Payment successful
                        </h1>
                        <p className="max-w-[40ch] text-[15px] leading-relaxed text-dukka-muted sm:text-[16px]">
                            Thank you for your patronage. Our logistics team is
                            processing your order.
                        </p>
                        <p className="rounded-sm bg-dukka-panel px-4 py-2 font-mono text-[13px] text-dukka-ink">
                            Ref: {reference}
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-dukka-ink">
                            Payment status
                        </h1>
                        <p className="max-w-[40ch] text-[15px] leading-relaxed text-dukka-muted sm:text-[16px]">
                            We couldn&apos;t find a Paystack reference on this page.
                            If you just paid, check your email or orders for
                            confirmation.
                        </p>
                    </>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="bg-dukka-amber px-6 py-3 text-[15px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white"
                    >
                        Continue shopping
                    </Link>
                    {isAuthenticated && (
                        <Link
                            href="/profile/order"
                            className="border border-dukka-ink px-6 py-3 text-[15px] font-medium text-dukka-ink transition-colors hover:bg-dukka-ink hover:text-white"
                        >
                            View orders
                        </Link>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PaymentSuccessContent;
