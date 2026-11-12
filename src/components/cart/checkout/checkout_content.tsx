"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useGetServiceStatesQuery } from "@/redux/services/catalog_api";
import {
    useCreateShippingAddressMutation,
    useGetPrecheckoutQuery,
} from "@/redux/services/checkout_api";
import { getAccessToken, getGuestCartId } from "@/lib/cookies";
import { normalizeList } from "@/utils/map_product";
import { saveCheckoutDraft } from "@/lib/checkout_session";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { useAppSelector } from "@/redux/store";
import { formatMoney } from "@/utils/format_money";
import DukkaLoader from "@/components/ui/dukka_loader";
import type { AddressRecord } from "@/types/api";

const emptyForm = {
    first_name: "",
    last_name: "",
    phone_number: "",
    whatsapp_number: "",
    email: "",
    street_address: "",
    state: "",
    country: "Nigeria",
};

const CheckoutContent = () => {
    const router = useRouter();
    const carts = useAppSelector((store) => store.cart);
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const marketId = useActiveMarketId();
    const authed = isAuthenticated || !!getAccessToken();
    const guestCartId = getGuestCartId();
    const cartId = carts.server_cart_id || guestCartId;

    const {
        data: precheckout,
        isLoading: loadingPrecheckout,
        isError: precheckoutError,
        error: precheckoutErr,
    } = useGetPrecheckoutQuery(authed ? undefined : { cart_id: cartId }, {
        skip: !authed && !cartId,
    });

    const { data: statesData } = useGetServiceStatesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const states = useMemo(() => normalizeList(statesData), [statesData]);
    const [createShippingAddress, { isLoading }] =
        useCreateShippingAddressMutation();
    const [error, setError] = useState("");
    const [form, setForm] = useState(emptyForm);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
        null,
    );

    const shippingAddresses = precheckout?.shipping_addresses ?? [];
    const serverTotal = Number(precheckout?.cart?.total ?? carts.total ?? 0);

    useEffect(() => {
        if (!selectedAddressId) return;
        const address = shippingAddresses.find((a) => a.id === selectedAddressId);
        if (!address) return;
        setForm({
            first_name: address.first_name || "",
            last_name: address.last_name || "",
            phone_number: address.phone_number || "",
            whatsapp_number: address.whatsapp_number || "",
            email: address.email || "",
            street_address: address.street_address || "",
            state: address.state || "",
            country: address.country || "Nigeria",
        });
    }, [selectedAddressId, shippingAddresses]);

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setSelectedAddressId(null);
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const applyAddress = (address: AddressRecord) => {
        setSelectedAddressId(address.id);
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");
        if (!form.state) {
            setError("Select a service state");
            return;
        }
        try {
            let shippingAddressId = selectedAddressId ?? undefined;
            if (!shippingAddressId) {
                const address = await createShippingAddress({
                    ...form,
                    market_id: marketId,
                }).unwrap();
                shippingAddressId = address.id;
            }
            saveCheckoutDraft({
                ...form,
                shipping_address_id: shippingAddressId,
            });
            router.push("/cart/checkout/payment");
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to save shipping address";
            setError(message);
        }
    };

    const precheckoutMessage =
        (precheckoutErr as { data?: { message?: string } })?.data?.message ||
        "Unable to load checkout. Return to cart and try again.";

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
                    <span className="text-dukka-ink">Checkout</span>
                </nav>
            </section>

            {loadingPrecheckout && (
                <DukkaLoader label="Loading checkout" />
            )}

            {(precheckoutError || (!authed && !cartId)) && !loadingPrecheckout && (
                <section className="px-4 sm:px-6 md:px-8 lg:px-12">
                    <p className="text-sm text-red-600">{precheckoutMessage}</p>
                    <Link
                        href="/cart"
                        className="mt-4 inline-flex bg-dukka-amber px-5 py-3 text-[14px] font-semibold text-dukka-ink"
                    >
                        Back to cart
                    </Link>
                </section>
            )}

            {precheckout && (
                <section className="flex w-full flex-col gap-8 bg-white px-4 py-10 min-lg:flex-row min-lg:justify-between min-lg:gap-10 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <form
                        onSubmit={onSubmit}
                        className="flex w-full flex-col gap-6 min-lg:w-[65%]"
                    >
                        <h1 className="text-xl font-semibold text-dukka-ink">
                            Customer & delivery details
                        </h1>

                        {shippingAddresses.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dukka-muted">
                                    Saved addresses
                                </p>
                                <div className="flex flex-col gap-2">
                                    {shippingAddresses.map((address) => (
                                        <button
                                            key={address.id}
                                            type="button"
                                            onClick={() => applyAddress(address)}
                                            className={`border px-4 py-3 text-left text-[14px] transition-colors ${
                                                selectedAddressId === address.id
                                                    ? "border-dukka-forest bg-dukka-panel text-dukka-ink"
                                                    : "border-dukka-line text-dukka-muted hover:border-dukka-forest"
                                            }`}
                                        >
                                            <span className="font-medium text-dukka-ink">
                                                {address.first_name} {address.last_name}
                                            </span>
                                            <span className="mt-1 block text-[13px]">
                                                {address.street_address}, {address.country}
                                            </span>
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedAddressId(null);
                                            setForm(emptyForm);
                                        }}
                                        className="text-left text-[13px] font-semibold text-dukka-forest underline-offset-4 hover:underline"
                                    >
                                        Use a new address
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex w-full flex-wrap justify-between gap-4">
                            <input
                                type="text"
                                name="first_name"
                                value={form.first_name}
                                onChange={onChange}
                                required
                                className="w-full border border-dukka-line bg-dukka-canvas px-4 py-3 text-[16px] outline-none focus:border-dukka-forest sm:w-[48%]"
                                placeholder="First name"
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={form.last_name}
                                onChange={onChange}
                                required
                                className="w-full border border-dukka-line bg-dukka-canvas px-4 py-3 text-[16px] outline-none focus:border-dukka-forest sm:w-[48%]"
                                placeholder="Last name"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            className="w-full border border-dukka-line bg-dukka-canvas px-4 py-3 text-[16px] outline-none focus:border-dukka-forest"
                            placeholder="Email"
                        />
                        <div className="flex w-full flex-wrap gap-4">
                            <div className="w-full sm:w-[48%]">
                                <PhoneInput
                                    country={"ng"}
                                    value={form.phone_number}
                                    onChange={(value) => {
                                        setSelectedAddressId(null);
                                        setForm((prev) => ({
                                            ...prev,
                                            phone_number: value,
                                        }));
                                    }}
                                    inputStyle={{ width: "100%", height: "48px" }}
                                />
                            </div>
                            <div className="w-full sm:w-[48%]">
                                <PhoneInput
                                    country={"ng"}
                                    value={form.whatsapp_number}
                                    onChange={(value) => {
                                        setSelectedAddressId(null);
                                        setForm((prev) => ({
                                            ...prev,
                                            whatsapp_number: value,
                                        }));
                                    }}
                                    inputStyle={{ width: "100%", height: "48px" }}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            name="street_address"
                            value={form.street_address}
                            onChange={onChange}
                            required
                            className="w-full border border-dukka-line bg-dukka-canvas px-4 py-3 text-[16px] outline-none focus:border-dukka-forest"
                            placeholder="Street address"
                        />
                        <div className="flex w-full flex-wrap gap-4">
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={onChange}
                                required
                                className="w-full border border-dukka-line bg-dukka-canvas px-4 py-3 text-[16px] outline-none focus:border-dukka-forest sm:w-[48%]"
                                placeholder="Country"
                            />
                            <select
                                name="state"
                                value={form.state}
                                onChange={onChange}
                                required
                                className="w-full border border-dukka-line bg-white px-4 py-3 text-[16px] outline-none focus:border-dukka-forest sm:w-[48%]"
                            >
                                <option value="">Select state</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.state_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading || !precheckout.cart?.items?.length}
                            className="mt-2 flex w-full items-center justify-center bg-dukka-amber py-3.5 text-[16px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white disabled:opacity-60"
                        >
                            {isLoading ? "Saving..." : "Continue to payment"}
                        </button>
                    </form>

                    <aside className="h-fit w-full bg-dukka-ink p-6 text-white min-lg:w-[32%]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dukka-amber">
                            Order summary
                        </p>
                        <dl className="mt-6 space-y-4 border-y border-white/15 py-6">
                            <div className="flex justify-between text-[14px]">
                                <dt className="text-white/70">Items</dt>
                                <dd>{precheckout.cart?.items?.length ?? 0}</dd>
                            </div>
                            <div className="flex justify-between text-[14px]">
                                <dt className="text-white/70">Subtotal</dt>
                                <dd className="tabular-nums">
                                    {formatMoney(serverTotal)}
                                </dd>
                            </div>
                            <div className="flex justify-between pt-2">
                                <dt className="text-[15px] font-medium">Total</dt>
                                <dd className="text-[22px] font-semibold tabular-nums text-dukka-amber">
                                    {formatMoney(serverTotal)}
                                </dd>
                            </div>
                        </dl>
                        {authed && (
                            <p className="mt-4 text-[13px] text-white/60">
                                Points balance: {precheckout.points_balance ?? 0}
                            </p>
                        )}
                    </aside>
                </section>
            )}
        </main>
    );
};

export default CheckoutContent;
