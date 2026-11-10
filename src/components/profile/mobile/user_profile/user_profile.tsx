"use client";

import { GoPerson } from "react-icons/go";
import ProfileInput from "./profile_input";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/ui/back_button";
import {
    useGetMeQuery,
    useUpdateCustomerMutation,
} from "@/redux/services/customer_api";

const UserProfile = () => {
    const { data: me, isLoading } = useGetMeQuery();
    const [updateCustomer, { isLoading: saving }] = useUpdateCustomerMutation();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (me?.name) setName(me.name);
    }, [me?.name]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        try {
            await updateCustomer({ name: name.trim() }).unwrap();
            setMessage("Profile updated");
        } catch (err) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to update profile";
            setMessage(errorMessage);
        }
    };

    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        User profile
                    </h1>
                    <span />
                </section>

                <div className="flex w-[94%] h-[100px] rounded-lg self-center gap-6 p-6 border border-[#ADB1B1] bg-[#FFEDE3] items-center">
                    <div className="w-20 h-20 bg-white flex items-center justify-center border border-white rounded-full relative">
                        <GoPerson className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[18px] md:text-[20px] font-[500]">
                            {isLoading ? "Loading..." : me?.name || "Customer"}
                        </h1>
                        <p className="text-[14px] md:[16px] font-[300] tracking-wide">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 px-4 sm:px-6 md:px-8"
                >
                    <ProfileInput
                        onBlur={() => undefined}
                        collectInput={(event) => setName(event.target.value)}
                        name="name"
                        placeholder="Full name"
                        type="text"
                        value={name}
                        autoComplete="name"
                    />
                    {message && <p className="text-sm text-gray-600">{message}</p>}
                    <button
                        type="submit"
                        disabled={saving || !name.trim()}
                        className="bg-[#FEB100] rounded-lg py-3 font-medium disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default UserProfile;
