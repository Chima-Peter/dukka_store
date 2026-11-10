"use client";

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

    return (
        <div className="w-[100vw] top-0 left-0 fixed backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center min-h-[100vh] z-50">
            <motion.div
                className="flex w-[90%] sm:w-[400px] flex-col rounded-lg shadow-xl bg-[#FFF9F3] h-[230px] z-30"
                initial={{ scale: 0.5, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    mass: 0.5,
                }}
            >
                <div className="flex flex-col h-[180px] w-[100%] items-center justify-center rounded-t-lg">
                    <CiSaveUp1 className="w-[60px] h-[60px] text-[#D70404]" />
                    <h2 className="mt-2 font-[600] text-[20px] md:text-[24px] lg:text-[26px]">
                        Log Out
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-[#646767] font-[400]">
                        You&lsquo;re about to log out
                    </p>
                </div>
                <div className="w-[100%] flex bg-white rounded-b-lg">
                    <button
                        className="w-[50%] py-3 hover:bg-[#D3D9D9] rounded-t-none text-[16px] md:text-[18px] rounded-l-lg font-[400] font-urbanist border-r border-r-[#ADB1B1]"
                        onClick={() => setLogoutModal(false)}
                    >
                        Keep me logged in
                    </button>
                    <button
                        className="w-[50%] py-3 hover:bg-[#D3D9D9] rounded-t-none text-[16px] md:text-[18px] font-[400] rounded-r-lg font-urbanist"
                        onClick={confirmLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging out..." : "Yes, log me out"}
                    </button>
                </div>
            </motion.div>
            <div
                className="w-[100vw] h-[100%] z-[-20] fixed top-0 left-0"
                onClick={() => setLogoutModal(false)}
            />
        </div>
    );
};

export default LogoutModal;
