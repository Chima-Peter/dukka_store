"use client";

import { FormEvent, useEffect, useState } from "react";
import {
    useGetMeQuery,
    useUpdateCustomerMutation,
} from "@/redux/services/customer_api";

type ProfileSettingsFormProps = {
    onSaved?: () => void;
    className?: string;
};

function toDateInputValue(value?: string | null) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

const ProfileSettingsForm = ({ onSaved, className }: ProfileSettingsFormProps) => {
    const { data: me, isLoading } = useGetMeQuery();
    const [updateCustomer, { isLoading: saving }] = useUpdateCustomerMutation();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!me) return;
        setName(me.name || "");
        setPhoneNumber(me.phone_number || "");
        setDateOfBirth(toDateInputValue(me.date_of_birth));
    }, [me]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage("");
        setError("");

        const trimmedName = name.trim();
        if (trimmedName.length < 3) {
            setError("Name must be at least 3 characters");
            return;
        }

        try {
            await updateCustomer({
                name: trimmedName,
                phone_number: phoneNumber.trim() || undefined,
                date_of_birth: dateOfBirth || undefined,
            }).unwrap();
            setMessage("Profile updated");
            onSaved?.();
        } catch (err) {
            setError(
                (err as { data?: { message?: string } })?.data?.message ||
                    "Unable to update profile",
            );
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className={`flex flex-col gap-4 ${className || ""}`}
        >
            <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">Full name</span>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={isLoading}
                    autoComplete="name"
                    className="rounded-md border border-gray-400 px-4 py-3 text-[16px] text-[#0D3833] outline-none focus:border-gray-700"
                    required
                    minLength={3}
                    maxLength={128}
                />
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">Email</span>
                <input
                    value={me?.email || ""}
                    disabled
                    readOnly
                    className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-[16px] text-gray-500"
                />
                <span className="text-xs text-gray-500">Email cannot be changed</span>
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">Phone number</span>
                <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    disabled={isLoading}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+234..."
                    className="rounded-md border border-gray-400 px-4 py-3 text-[16px] text-[#0D3833] outline-none focus:border-gray-700"
                />
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">Date of birth</span>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    disabled={isLoading}
                    className="rounded-md border border-gray-400 px-4 py-3 text-[16px] text-[#0D3833] outline-none focus:border-gray-700"
                />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-[#0D523F]">{message}</p>}

            <button
                type="submit"
                disabled={saving || isLoading || !name.trim()}
                className="rounded-md border border-[#FEB100] bg-[#FEB100] py-3 text-base font-medium text-[#031815] disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save changes"}
            </button>
        </form>
    );
};

export default ProfileSettingsForm;
