"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
    useCreateBillingAddressMutation,
    useCreateShippingAddressMutation,
    useDeleteBillingAddressMutation,
    useDeleteShippingAddressMutation,
    useGetBillingAddressesQuery,
    useGetShippingAddressesQuery,
    useUpdateBillingAddressMutation,
    useUpdateShippingAddressMutation,
} from "@/redux/services/address_api";
import { useGetServiceStatesQuery } from "@/redux/services/catalog_api";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { normalizeList } from "@/utils/map_product";
import type { AddressRecord, CreateAddressRequest } from "@/types/api";
import ProfileSectionShell from "./profile_section_shell";

type AddressKind = "shipping" | "billing";

type FormState = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    whatsapp_number: string;
    country: string;
    state: string;
    street_address: string;
};

const emptyForm: FormState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    country: "Nigeria",
    state: "",
    street_address: "",
};

type Props = {
    onBack?: () => void;
    backHref?: string;
};

function asAddressList(data: AddressRecord[] | undefined): AddressRecord[] {
    if (!data) return [];
    return Array.isArray(data) ? data : [];
}

const ProfileAddressesPanel = ({ onBack, backHref }: Props) => {
    const marketId = useActiveMarketId();
    const { data: me } = useGetMeQuery();
    const { data: shippingData, isLoading: loadingShipping } =
        useGetShippingAddressesQuery();
    const { data: billingData, isLoading: loadingBilling } =
        useGetBillingAddressesQuery();
    const { data: statesData } = useGetServiceStatesQuery(
        { market_id: marketId! },
        { skip: !marketId },
    );
    const states = useMemo(() => normalizeList(statesData), [statesData]);

    const [createShipping, { isLoading: creatingShipping }] =
        useCreateShippingAddressMutation();
    const [createBilling, { isLoading: creatingBilling }] =
        useCreateBillingAddressMutation();
    const [updateShipping, { isLoading: updatingShipping }] =
        useUpdateShippingAddressMutation();
    const [updateBilling, { isLoading: updatingBilling }] =
        useUpdateBillingAddressMutation();
    const [deleteShipping, { isLoading: deletingShipping }] =
        useDeleteShippingAddressMutation();
    const [deleteBilling, { isLoading: deletingBilling }] =
        useDeleteBillingAddressMutation();

    const [kind, setKind] = useState<AddressKind>("shipping");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const shipping = asAddressList(shippingData);
    const billing = asAddressList(billingData);
    const list = kind === "shipping" ? shipping : billing;
    const busy =
        creatingShipping ||
        creatingBilling ||
        updatingShipping ||
        updatingBilling ||
        deletingShipping ||
        deletingBilling;

    useEffect(() => {
        if (!me) return;
        setForm((prev) => ({
            ...prev,
            email: prev.email || me.email || "",
            first_name: prev.first_name || me.name?.split(" ")[0] || "",
            last_name:
                prev.last_name || me.name?.split(" ").slice(1).join(" ") || "",
            phone_number: prev.phone_number || me.phone_number || "",
        }));
    }, [me]);

    const stateName = (stateId: string) =>
        states.find((state) => state.id === stateId)?.state_name || stateId;

    const resetForm = () => {
        setEditingId(null);
        setForm({
            ...emptyForm,
            email: me?.email || "",
            first_name: me?.name?.split(" ")[0] || "",
            last_name: me?.name?.split(" ").slice(1).join(" ") || "",
            phone_number: me?.phone_number || "",
            country: kind === "shipping" ? "Nigeria" : "Nigeria",
        });
    };

    const startEdit = (address: AddressRecord) => {
        setEditingId(address.id);
        setForm({
            first_name: address.first_name,
            last_name: address.last_name,
            email: address.email,
            phone_number: address.phone_number,
            whatsapp_number: address.whatsapp_number || "",
            country: address.country,
            state: address.state,
            street_address: address.street_address,
        });
        setMessage("");
        setError("");
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage("");
        setError("");
        if (!form.state) {
            setError("Select a service state");
            return;
        }
        if (!marketId && !editingId) {
            setError("Select an active market before adding an address");
            return;
        }

        const payload: CreateAddressRequest = {
            ...form,
            whatsapp_number: form.whatsapp_number || undefined,
            market_id: marketId,
        };

        try {
            if (editingId) {
                if (kind === "shipping") {
                    await updateShipping({ id: editingId, body: payload }).unwrap();
                } else {
                    await updateBilling({ id: editingId, body: payload }).unwrap();
                }
                setMessage("Address updated");
            } else if (kind === "shipping") {
                await createShipping(payload).unwrap();
                setMessage("Shipping address added");
            } else {
                await createBilling(payload).unwrap();
                setMessage("Billing address added");
            }
            resetForm();
        } catch (err) {
            setError(
                (err as { data?: { message?: string } })?.data?.message ||
                    "Unable to save address",
            );
        }
    };

    const onDelete = async (id: string) => {
        setMessage("");
        setError("");
        try {
            if (kind === "shipping") {
                await deleteShipping(id).unwrap();
            } else {
                await deleteBilling(id).unwrap();
            }
            if (editingId === id) resetForm();
            setMessage("Address deleted");
        } catch (err) {
            setError(
                (err as { data?: { message?: string } })?.data?.message ||
                    "Unable to delete address",
            );
        }
    };

    return (
        <ProfileSectionShell title="Addresses" onBack={onBack} backHref={backHref}>
            <div className="mb-5 flex gap-2">
                {(["shipping", "billing"] as AddressKind[]).map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => {
                            setKind(tab);
                            setEditingId(null);
                            setMessage("");
                            setError("");
                        }}
                        className={`rounded-md px-4 py-2 text-sm font-medium capitalize ${
                            kind === tab
                                ? "bg-[#FEB100] text-[#031815]"
                                : "border border-[#ADB1B1] text-gray-600"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {(loadingShipping || loadingBilling) && (
                <p className="mb-4 text-sm text-gray-500">Loading addresses...</p>
            )}

            <ul className="mb-6 flex flex-col gap-3">
                {list.length === 0 && !(loadingShipping || loadingBilling) && (
                    <li className="text-sm text-gray-500">
                        No {kind} addresses saved yet.
                    </li>
                )}
                {list.map((address) => (
                    <li
                        key={address.id}
                        className="rounded-lg border border-[#E4E7E7] px-4 py-3"
                    >
                        <p className="font-medium text-[#0D3833]">
                            {address.first_name} {address.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                            {address.street_address}
                        </p>
                        <p className="text-sm text-gray-600">
                            {stateName(address.state)}, {address.country}
                        </p>
                        <p className="text-sm text-gray-600">
                            {address.phone_number} · {address.email}
                        </p>
                        <div className="mt-3 flex gap-3">
                            <button
                                type="button"
                                className="text-sm font-medium text-[#0D523F]"
                                onClick={() => startEdit(address)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="text-sm font-medium text-red-600"
                                disabled={busy}
                                onClick={() => onDelete(address.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="mb-3 text-lg font-medium text-[#0D3833]">
                {editingId ? "Edit address" : `Add ${kind} address`}
            </h2>
            <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
                <input
                    required
                    name="first_name"
                    placeholder="First name"
                    value={form.first_name}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, first_name: e.target.value }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5"
                />
                <input
                    required
                    name="last_name"
                    placeholder="Last name"
                    value={form.last_name}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, last_name: e.target.value }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5"
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5 sm:col-span-2"
                />
                <input
                    required
                    name="phone_number"
                    placeholder="Phone number"
                    value={form.phone_number}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            phone_number: e.target.value,
                        }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5"
                />
                <input
                    name="whatsapp_number"
                    placeholder="WhatsApp (optional)"
                    value={form.whatsapp_number}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            whatsapp_number: e.target.value,
                        }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5"
                />
                <input
                    required
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, country: e.target.value }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5"
                />
                <select
                    required
                    name="state"
                    value={form.state}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="rounded-md border border-gray-400 px-3 py-2.5 bg-white"
                >
                    <option value="">Select state</option>
                    {states.map((state) => (
                        <option key={state.id} value={state.id}>
                            {state.state_name}
                        </option>
                    ))}
                </select>
                <textarea
                    required
                    name="street_address"
                    placeholder="Street address"
                    value={form.street_address}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            street_address: e.target.value,
                        }))
                    }
                    className="min-h-[90px] rounded-md border border-gray-400 px-3 py-2.5 sm:col-span-2"
                />
                <div className="flex gap-3 sm:col-span-2">
                    <button
                        type="submit"
                        disabled={busy}
                        className="rounded-md border border-[#FEB100] bg-[#FEB100] px-4 py-2.5 font-medium disabled:opacity-50"
                    >
                        {busy
                            ? "Saving..."
                            : editingId
                              ? "Save changes"
                              : "Add address"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-md border border-[#ADB1B1] px-4 py-2.5"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            {message && <p className="mt-3 text-sm text-[#0D523F]">{message}</p>}
        </ProfileSectionShell>
    );
};

export default ProfileAddressesPanel;
