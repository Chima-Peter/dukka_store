"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CiSaveUp1 } from "react-icons/ci";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/services/authentication_api";
import { logout } from "@/redux/features/authentication_slice";
import { clearCart } from "@/redux/features/cart_slice";
import { useAppDispatch } from "@/redux/store";
import { clearAuthTokens } from "@/lib/cookies";

const LogoutModal = ({
    setLogoutModal,
}: {
    setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [logoutRequest, { isLoading }] = useLogoutMutation();

    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    const confirmLogout = async () => {
        try {
            await logoutRequest().unwrap();
        } catch {
            // Clear local session even if API logout fails
        }
        clearAuthTokens();
        dispatch(logout());
        dispatch(clearCart());
        setLogoutModal(false);
        router.push("/");
    };

    const close = () => setLogoutModal(false);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex min-h-[100vh] w-screen items-center justify-center bg-dukka-ink/45 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
        >
            <button
                type="button"
                aria-label="Close sign out dialog"
                className="absolute inset-0 cursor-default"
                onClick={close}
            />
            <motion.div
                className="relative z-10 flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(3,24,21,0.2)]"
                initial={{ scale: 0.94, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center px-6 py-8 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F0]">
                        <CiSaveUp1 className="h-8 w-8 text-[#C62828]" />
                    </div>
                    <h2
                        id="logout-modal-title"
                        className="font-urbanist text-[22px] font-semibold tracking-tight text-dukka-ink"
                    >
                        Sign out
                    </h2>
                    <p className="mt-1 text-[14px] text-dukka-muted">
                        You’re about to leave your Dukka account.
                    </p>
                </div>
                <div className="grid grid-cols-2 border-t border-dukka-line">
                    <button
                        type="button"
                        className="border-r border-dukka-line py-3.5 text-[14px] font-semibold text-dukka-forest transition-colors hover:bg-dukka-soft"
                        onClick={close}
                    >
                        Stay signed in
                    </button>
                    <button
                        type="button"
                        className="py-3.5 text-[14px] font-semibold text-[#C62828] transition-colors hover:bg-[#FFF5F5] disabled:opacity-60"
                        onClick={confirmLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing out..." : "Yes, sign out"}
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body,
    );
};

export default LogoutModal;
