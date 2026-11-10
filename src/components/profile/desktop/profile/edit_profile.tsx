"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
    useGetMeQuery,
    useUpdateCustomerMutation,
} from "@/redux/services/customer_api";

const EditProfile = ({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { data: me } = useGetMeQuery();
    const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (me?.name) setName(me.name);
    }, [me?.name]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage("");
        try {
            await updateCustomer({ name: name.trim() }).unwrap();
            setMessage("Profile updated");
            setStep(0);
        } catch (err) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to update profile";
            setMessage(errorMessage);
        }
    };

    return (
        <section className="w-[74%] h-fit flex flex-col pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex gap-4 py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <button className="" onClick={() => setStep(0)}>
                    <FaArrowLeft className="w-[20px] h-[20px]" />
                </button>
                <h1 className="font-[500] min-lg:text-[20px] xl:text-[22px] 2xl:text-[24px] tracking-wide capitalize">
                    Edit profile
                </h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6">
                <label className="flex flex-col gap-2">
                    <span className="text-sm text-gray-600">Full name</span>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-400 rounded-md px-4 py-3"
                    />
                </label>
                <p className="text-sm text-gray-600">{me?.email}</p>
                {message && <p className="text-sm text-gray-700">{message}</p>}
                <button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="bg-[#FEB100] rounded-md py-3 font-medium disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save changes"}
                </button>
            </form>
        </section>
    );
};

export default EditProfile;
