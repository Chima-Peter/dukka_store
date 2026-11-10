"use client";

import { useMemo, useState } from "react";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
    useCheckoutMutation,
    useGetPaymentMethodsQuery,
} from "@/redux/services/checkout_api";
import { loadCheckoutDraft, clearCheckoutDraft } from "@/lib/checkout_session";
import { getGuestCartId } from "@/lib/cookies";
import { useAppSelector } from "@/redux/store";
import { normalizeList } from "@/utils/map_product";
import { clearCart } from "@/redux/features/cart_slice";
import { useAppDispatch } from "@/redux/store";

const CardDetailsForm = () => {
    const dispatch = useAppDispatch();
    const serverCartId = useAppSelector((s) => s.cart.server_cart_id);
    const { data: methodsData, isLoading: loadingMethods } =
        useGetPaymentMethodsQuery();
    const methods = useMemo(() => normalizeList(methodsData), [methodsData]);
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
        <section className="w-[100%] flex flex-col border border-gray-400 rounded-lg">
            <div className="flex w-[100%] justify-between p-6 border-b border-gray-400">
                <div className="flex gap-4 items-center">
                    <IoIosCheckmarkCircle className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
                    <h1 className="text-lg min-lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide font-medium">
                        Payment
                    </h1>
                </div>
                <CiCircleChevRight className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
            </div>
            <div className="flex flex-col gap-4 w-[100%] p-6">
                <p className="text-[15px] text-gray-700">
                    You will be redirected to Paystack to complete payment securely. We never
                    collect card numbers on Dukka.
                </p>
                {loadingMethods ? (
                    <p className="text-sm text-gray-500">Loading payment methods...</p>
                ) : (
                    <select
                        className="w-full rounded-md border border-gray-400 px-4 py-3 text-[16px] bg-white"
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
                    className="items-center w-[100%] mt-2 hover:bg-white border-[1.4px] border-[#FEB100] flex gap-2 rounded-lg bg-[#FEB100] py-3 justify-center text-[16px] xl:text-[18px] font-medium tracking-wide disabled:opacity-60"
                >
                    {isLoading ? "Redirecting..." : "Pay with Paystack"}
                </button>
            </div>
        </section>
    );
};

export default CardDetailsForm;
