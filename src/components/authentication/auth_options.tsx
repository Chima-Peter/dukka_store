"use client"

import { IoPersonOutline } from "react-icons/io5";
import { SlArrowRightCircle } from "react-icons/sl";
import Link from "next/link";
import useNavigationContext from "../../hooks/use_category_component";

const AuthOptions = () => {
    const { setShowLoginBox } = useNavigationContext();

    const closeLoginBox = () => setShowLoginBox(false);

    return (
        <>
            <div 
                className="flex flex-col z-50 drop-shadow-md absolute -bottom-6 right-6 bg-white font-urbanist w-[250px] rounded-md border border-gray-200"
                onClick={closeLoginBox}
            >
                <Link 
                    href="/login"
                    className="flex w-full items-center justify-center gap-4 rounded-t-md py-4 hover:bg-[#FEB100]"
                    aria-label="Log in"
                >
                    <SlArrowRightCircle className="h-5 w-5 xl:h-7 xl:w-7" />
                    <p className="text-[14px] font-semibold min-lg:text-[16px] xl:text-[20px]">
                        Log in
                    </p>
                </Link>
                <Link 
                    href="/register"
                    className="flex w-full items-center justify-center gap-4 rounded-b-md py-4 hover:bg-[#FEB100]"
                    aria-label="Sign up"
                >
                    <IoPersonOutline className="h-5 w-5 xl:h-7 xl:w-7" />
                    <p className="text-[14px] font-semibold min-lg:text-[16px] xl:text-[20px]">
                        Sign up
                    </p>
                </Link>
            </div>

            {/* Overlay to close the login box */}
            <section 
                className="absolute top-0 left-0 z-40 h-[100vh] w-[100vw]"
                onClick={closeLoginBox} 
            />
        </>
    );
};

export default AuthOptions;
