"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/authentication/input";
import { useLoginMutation } from "@/redux/services/authentication_api";
import { login as loginAction } from "@/redux/features/authentication_slice";
import { useAppDispatch } from "@/redux/store";
import {
    clearGuestCartId,
    setAuthTokens,
} from "@/lib/cookies";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading, error }] = useLoginMutation();
    const [form, setForm] = useState({ email: "", password: "" });
    const [formError, setFormError] = useState("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setFormError("");
        try {
            const data = await login(form).unwrap();
            setAuthTokens(data.accessToken, data.refreshToken);
            clearGuestCartId();
            dispatch(
                loginAction({
                    email: data.customer.email,
                    full_name: data.customer.name,
                    first_name: data.customer.name.split(" ")[0],
                    customer_id: data.customer.id,
                    isAuthenticated: true,
                }),
            );
            router.push("/profile");
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to log in. Check your email and password.";
            setFormError(message);
        }
    };

    return (
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-dukka-canvas px-4 page-nav-offset pb-16 font-urbanist">
            <form
                onSubmit={onSubmit}
                className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
            >
                <h1 className="text-2xl font-semibold text-[#0D523F]">Log in</h1>
                <p className="text-sm text-gray-600">
                    Welcome back to Dukka.Store
                </p>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    error={false}
                    errorMessage=""
                    onInputChange={onChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    error={false}
                    errorMessage=""
                    onInputChange={onChange}
                />
                {(formError || error) && (
                    <p className="text-sm text-red-600">{formError || "Login failed"}</p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-[#FEB100] py-3 text-base font-medium hover:bg-white border border-[#FEB100]"
                >
                    {isLoading ? "Signing in..." : "Log in"}
                </button>
                <p className="text-sm text-gray-600">
                    New here?{" "}
                    <Link href="/register" className="font-semibold text-[#0D523F]">
                        Create an account
                    </Link>
                </p>
            </form>
        </main>
    );
}
