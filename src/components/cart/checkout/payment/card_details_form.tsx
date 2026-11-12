"use client";

import { useMemo, useState } from "react";
import {
    useCheckoutMutation,
    useGetPaymentMethodsQuery,
    useGetPrecheckoutQuery,
} from "@/redux/services/checkout_api";
import { loadCheckoutDraft, clearCheckoutDraft } from "@/lib/checkout_session";
import { getAccessToken, getGuestCartId } from "@/lib/cookies";
import { useAppSelector } from "@/redux/store";
import { normalizeList } from "@/utils/map_product";
import { clearCart } from "@/redux/features/cart_slice";
import { useAppDispatch } from "@/redux/store";
import DukkaLoader from "@/components/ui/dukka_loader";

const CardDetailsForm = () => {
    const dispatch = useAppDispatch();
    const serverCartId = useAppSelector((s) => s.cart.server_cart_id);
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const authed = isAuthenticated || !!getAccessToken();
    const guestCartId = getGuestCartId();
    const cartId = serverCartId || guestCartId;

    const { data: precheckout } = useGetPrecheckoutQuery(
        authed ? undefined : { cart_id: cartId },
        { skip: !authed && !cartId },
    );

    const { data: methodsData, isLoading: loadingMethods } =
        useGetPaymentMethodsQuery(undefined, {
            skip: (precheckout?.payment_methods?.length ?? 0) > 0,
        });

    const methods = useMemo(() => {
        if (precheckout?.payment_methods?.length) {
            return precheckout.payment_methods.map((method) => ({
                id: method.payment_method_id || method.id,
                name: method.payment_method_name || method.name || "Payment",
            }));
        }
        return normalizeList(methodsData).map((method) => ({
            id: method.id,
            name: method.name,
        }));
    }, [precheckout, methodsData]);

    const [paymentMethodId, setPaymentMethodId] = useState("");
    const [checkout, { isLoading }] = useCheckoutMutation();
    const [error, setError] = useState("");

    const selectedMethod = paymentMethodId || methods[0]?.id || "";

    const payWithPaystack = async () => {
        setError("");
        const draft = loadCheckoutDraft();
        if (!draft?.shipping_address_id) {
            setError("Complete checkout details first.");
            return;
        }
        if (!selectedMethod) {
            setError("No payment method available.");
            return;
        }

        try {
            const result = await checkout({
                cart_id: serverCartId || getGuestCartId(),
                shipping_address_id: draft.shipping_address_id,
                billing_address_id: null,
                payment_method_id: selectedMethod,
            }).unwrap();

            clearCheckoutDraft();
            dispatch(clearCart());

            if (result.authorization_url) {
                window.location.href = result.authorization_url;
                return;
            }

            window.location.href = "/cart/checkout/payment/success";
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to start payment";
            setError(message);
        }
    };

    return (
        <section className="flex w-full flex-col border border-dukka-line">
            <div className="flex w-full items-center justify-between border-b border-dukka-line px-6 py-5">
                <h1 className="text-lg font-semibold tracking-wide text-dukka-ink min-lg:text-xl">
                    Payment
                </h1>
            </div>
            <div className="flex w-full flex-col gap-4 p-6">
                <p className="text-[15px] text-dukka-muted">
                    You will be redirected to Paystack to complete payment securely. We
                    never collect card numbers on Dukka.
                </p>
                {loadingMethods && methods.length === 0 ? (
                    <DukkaLoader variant="inline" label="Loading payment methods" />
                ) : (
                    <select
                        className="w-full border border-dukka-line bg-white px-4 py-3 text-[16px] outline-none focus:border-dukka-forest"
                        value={selectedMethod}
                        onChange={(event) => setPaymentMethodId(event.target.value)}
                    >
                        {methods.map((method) => (
                            <option key={method.id} value={method.id}>
                                {method.name}
                            </option>
                        ))}
                    </select>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="button"
                    onClick={payWithPaystack}
                    disabled={isLoading || !selectedMethod}
                    className="mt-2 flex w-full items-center justify-center bg-dukka-amber py-3.5 text-[16px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white disabled:opacity-60"
                >
                    {isLoading ? "Redirecting..." : "Pay with Paystack"}
                </button>
            </div>
        </section>
    );
};

export default CardDetailsForm;
