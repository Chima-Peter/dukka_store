"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import CardDetailsForm from "./card_details_form";
import { useGetPrecheckoutQuery } from "@/redux/services/checkout_api";
import { getAccessToken, getGuestCartId } from "@/lib/cookies";
import { formatMoney } from "@/utils/format_money";

const PaymentContent = () => {
    const carts = useAppSelector((store) => store.cart);
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const authed = isAuthenticated || !!getAccessToken();
    const cartId = carts.server_cart_id || getGuestCartId();

    const { data: precheckout } = useGetPrecheckoutQuery(
        authed ? undefined : { cart_id: cartId },
        { skip: !authed && !cartId },
    );

    const totalAmount = Number(precheckout?.cart?.total ?? carts.total ?? 0);

    return (
        <main className="page-nav-offset mb-10 flex w-full flex-col gap-8 bg-dukka-canvas font-urbanist">
            <section className="border-b border-dukka-line bg-white px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-dukka-muted">
                    <Link href="/" className="hover:text-dukka-forest">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/cart" className="hover:text-dukka-forest">
                        Cart
                    </Link>
                    <span>/</span>
                    <Link href="/cart/checkout" className="hover:text-dukka-forest">
                        Checkout
                    </Link>
                    <span>/</span>
                    <span className="text-dukka-ink">Payment</span>
                </nav>
            </section>
            <section className="flex w-full flex-col gap-8 bg-white px-4 py-10 min-lg:flex-row min-lg:justify-between min-lg:gap-10 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <section className="flex w-full flex-col gap-6 min-lg:w-[65%]">
                    <CardDetailsForm />
                </section>

                <aside className="flex h-fit w-full flex-col gap-4 bg-dukka-ink p-6 text-white min-lg:w-[32%]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dukka-amber">
                        Order summary
                    </p>
                    <dl className="space-y-4 border-y border-white/15 py-6">
                        <div className="flex justify-between text-[14px]">
                            <dt className="text-white/70">Subtotal</dt>
                            <dd className="tabular-nums font-medium">
                                {formatMoney(totalAmount)}
                            </dd>
                        </div>
                        <div className="flex justify-between pt-2">
                            <dt className="text-[15px] font-medium">Grand total</dt>
                            <dd className="text-[22px] font-semibold tabular-nums text-dukka-amber">
                                {formatMoney(totalAmount)}
                            </dd>
                        </div>
                    </dl>
                    <p className="text-[13px] leading-relaxed text-white/60">
                        Use Pay with Paystack to complete your order securely.
                    </p>
                </aside>
            </section>
        </main>
    );
};

export default PaymentContent;
