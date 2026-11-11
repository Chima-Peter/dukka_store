"use client";

import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { SlArrowRightCircle } from "react-icons/sl";
import { BsCartCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import useNavigationContext from "../../hooks/use_category_component";
import { useAppSelector } from "@/redux/store";
import LogoutModal from "./logout_modal";

const AuthOptions = () => {
    const { setShowLoginBox } = useNavigationContext();
    const user = useAppSelector((state) => state.auth);
    const [logoutModal, setLogoutModal] = useState(false);

    const closeLoginBox = () => setShowLoginBox(false);

    return (
        <>
            <div
                className="absolute right-0 top-full z-50 mt-2 w-[240px] border border-[#E4E7E7] bg-white font-urbanist shadow-[0_12px_24px_rgba(3,24,21,0.08)]"
                onMouseLeave={closeLoginBox}
            >
                <p className="border-b border-[#E8EBEB] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                    {user.isAuthenticated ? "Account" : "Welcome"}
                </p>
                {user.isAuthenticated ? (
                    <div className="flex flex-col">
                        <Link
                            href="/profile"
                            onClick={closeLoginBox}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-[#0D523F] transition-colors hover:bg-[#FEB100]"
                            aria-label="Profile"
                        >
                            <GoPerson className="h-5 w-5" />
                            <span className="text-[15px] font-semibold">
                                Profile
                            </span>
                        </Link>
                        <Link
                            href="/profile/order"
                            onClick={closeLoginBox}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-[#0D523F] transition-colors hover:bg-[#FEB100]"
                            aria-label="Orders"
                        >
                            <BsCartCheck className="h-5 w-5" />
                            <span className="text-[15px] font-semibold">
                                Orders
                            </span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setLogoutModal(true)}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-[#D70404] transition-colors hover:bg-[#FEB100]"
                            aria-label="Logout"
                        >
                            <IoMdLogOut className="h-5 w-5" />
                            <span className="text-[15px] font-semibold">
                                Logout
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <Link
                            href="/login"
                            onClick={closeLoginBox}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-[#0D523F] transition-colors hover:bg-[#FEB100]"
                            aria-label="Log in"
                        >
                            <SlArrowRightCircle className="h-5 w-5" />
                            <span className="text-[15px] font-semibold">
                                Log in
                            </span>
                        </Link>
                        <Link
                            href="/register"
                            onClick={closeLoginBox}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-[#0D523F] transition-colors hover:bg-[#FEB100]"
                            aria-label="Sign up"
                        >
                            <IoPersonOutline className="h-5 w-5" />
                            <span className="text-[15px] font-semibold">
                                Sign up
                            </span>
                        </Link>
                    </div>
                )}
            </div>

            <button
                type="button"
                aria-label="Close account menu"
                className="fixed inset-0 z-40 cursor-default"
                style={{ top: "var(--dukka-nav-height, 180px)" }}
                onClick={closeLoginBox}
            />

            {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
        </>
    );
};

export default AuthOptions;
