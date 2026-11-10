"use client";

import { FormEvent, useMemo, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import addCommasToInt from "@/utils/add_commas_to_int";
import { useAppSelector } from "@/redux/store";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useGetServiceStatesQuery } from "@/redux/services/catalog_api";
import { useCreateShippingAddressMutation } from "@/redux/services/checkout_api";
import { getGuestCartId } from "@/lib/cookies";
import { normalizeList } from "@/utils/map_product";
import { saveCheckoutDraft } from "@/lib/checkout_session";
import { useActiveMarketId } from "@/hooks/use_active_market_id";

const CheckoutContent = () => {
    const router = useRouter();
    const carts = useAppSelector((store) => store.cart);
    const totalAmount = carts.total || 0;
    const marketId = useActiveMarketId();
    const { data: statesData } = useGetServiceStatesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const states = useMemo(() => normalizeList(statesData), [statesData]);
    const [createShippingAddress, { isLoading }] =
        useCreateShippingAddressMutation();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        whatsapp_number: "",
        email: "",
        street_address: "",
        state: "",
        country: "Nigeria",
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");
        if (!form.state) {
            setError("Select a service state");
            return;
        }
        try {
            const address = await createShippingAddress({
                ...form,
                market_id: marketId,
            }).unwrap();
            saveCheckoutDraft({
                ...form,
                shipping_address_id: address.id,
            });
            router.push("/cart/checkout/payment");
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to save shipping address";
            setError(message);
        }
    };

    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist mb-10">
            <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-4">
                <p className="flex items-center gap-1 pb-2 border-b-[1.4px] border-b-gray-300">
                    <Link className="text-[13px] opacity-75 font-normal" href="/">
                        Home
                    </Link>{" "}
                    <strong className="opacity-65">
                        <BsChevronDoubleRight className="w-3 h-3" />
                    </strong>{" "}
                    <Link href={`/cart`} className="text-[13px] opacity-75 font-normal">
                        Cart
                    </Link>{" "}
                    <strong className="opacity-65">
                        <BsChevronDoubleRight className="w-3 h-3" />
                    </strong>{" "}
                    <Link href={`/cart/checkout`} className="text-[15px] font-semibold">
                        Checkout
                    </Link>
                </p>
            </section>
            <section className="flex min-lg:justify-between flex-col min-lg:flex-row gap-8 min-lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-10 bg-white w-[100%]">
                <form
                    onSubmit={onSubmit}
                    className="w-[100%] min-lg:w-[68%] flex flex-col gap-6 border border-gray-400 rounded-lg p-6"
                >
                    <h1 className="text-xl font-medium">Customer & delivery details</h1>
                    <div className="w-[100%] flex justify-between gap-4 flex-wrap">
                        <input
                            type="text"
                            name="first_name"
                            value={form.first_name}
                            onChange={onChange}
                            required
                            className="w-[100%] sm:w-[48%] text-[16px] py-3 px-4 rounded-md border border-gray-400"
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={form.last_name}
                            onChange={onChange}
                            required
                            className="w-[100%] sm:w-[48%] text-[16px] py-3 px-4 rounded-md border border-gray-400"
                            placeholder="Last name"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        className="w-full text-[16px] py-3 px-4 rounded-md border border-gray-400"
                        placeholder="Email"
                    />
                    <div className="w-full flex gap-4 flex-wrap">
                        <div className="w-full sm:w-[48%]">
                            <PhoneInput
                                country={"ng"}
                                value={form.phone_number}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, phone_number: value }))
                                }
                                inputStyle={{ width: "100%", height: "48px" }}
                            />
                        </div>
                        <div className="w-full sm:w-[48%]">
                            <PhoneInput
                                country={"ng"}
                                value={form.whatsapp_number}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        whatsapp_number: value,
                                    }))
                                }
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
                        className="w-full text-[16px] py-3 px-4 rounded-md border border-gray-400"
                        placeholder="Street address"
                    />
                    <div className="w-full flex gap-4 flex-wrap">
                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={onChange}
                            required
                            className="w-full sm:w-[48%] text-[16px] py-3 px-4 rounded-md border border-gray-400"
                            placeholder="Country"
                        />
                        <select
                            name="state"
                            value={form.state}
                            onChange={onChange}
                            required
                            className="w-full sm:w-[48%] text-[16px] py-3 px-4 rounded-md border border-gray-400 bg-white"
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
                        disabled={isLoading || carts.cart.length === 0}
                        className="items-center w-full mt-2 hover:bg-white border-[1.4px] border-[#FEB100] flex gap-2 rounded-lg bg-[#FEB100] py-3 justify-center text-[16px] font-medium tracking-wide disabled:opacity-60"
                    >
                        {isLoading ? "Saving..." : "Continue to payment"}
                    </button>
                    {!getGuestCartId() && carts.cart.length === 0 && (
                        <p className="text-sm text-gray-600">Your cart is empty.</p>
                    )}
                </form>

                <section className="flex flex-col gap-4 w-[100%] min-lg:w-[30%] p-6 rounded-lg border border-gray-400 h-fit">
                    <ul className="flex flex-col gap-2">
                        <li className="flex justify-between">
                            <p className="text-[14px] min-lg:text-[16px] text-black font-[400]">
                                Subtotal:
                            </p>
                            <h3 className="text-[16px] min-lg:text-[18px] font-semibold">
                                &#8358;{addCommasToInt(totalAmount)}
                            </h3>
                        </li>
                        <li className="flex justify-between mt-6 py-1 border-b border-b-gray-300">
                            <p className="text-[14px] min-lg:text-[16px] text-black font-[400]">
                                Grand Total:
                            </p>
                            <h3 className="text-[17px] min-lg:text-[20px] font-bold">
                                &#8358;{addCommasToInt(totalAmount)}
                            </h3>
                        </li>
                    </ul>
                    <button className="flex justify-between py-1 border-b border-b-gray-300 mt-4 ">
                        <p className="text-[14px] min-lg:text-[16px] text-black font-[400]">
                            Order instruction
                        </p>
                        <FaChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                </section>
            </section>
        </main>
    );
};

export default CheckoutContent;
