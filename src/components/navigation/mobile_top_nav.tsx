"use client"


import { MdClose, MdLocationOn } from "react-icons/md"
import SearchBar from "../search/search_bar"
import MobileMenuCategories from "./mobile_menu_categories";
import useNavigationContext from "../../hooks/use_category_component";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";



const MobileTopNav = ({ userLocation }: { userLocation: string }) => {
    const { showAllCategories, setShowAllCategories } = useNavigationContext()

    // toggle mobile menu display or hide all categories
    const toggleCategories = () => {
        setShowAllCategories(!showAllCategories)
    }

    // block body scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = (showAllCategories) ? "hidden" : "auto"
    }, [showAllCategories])


    return (
        <nav className={`flex-col z-50 gap-2 w-[100%] bg-white fixed pt-4 pb-2 drop-shadow-md ${showAllCategories ? 'h-[100vh] overflow-y-scroll customScroll' : ''} max-[1050px]:flex hidden`}>
            <div className="w-[100%] flex items-center justify-between px-4 sm:px-6 md:px-8">
                <div className="flex items-center gap-3">
                    {
                        showAllCategories ? <button onClick={toggleCategories}>
                            <MdClose className="w-8 h-8 md:w-9 md:h-9" />
                    </button> : <button onClick={toggleCategories}>
                        <Image priority width={24} height={24}  src="/images/navigation/mobile/ic_round-menu.svg" alt="Menu" />
                    </button>
                    }
                    <Link href="/">
                        <Image width={103} height={24} src="/images/navigation/mobile/logo.svg" alt="Melch.store" />
                    </Link>
                </div>
                <div className="flex flex-col gap-0 items-start">
                    <p className="font-urbanist text-[#888B8B] text-[12px] sm:text-[14px] font-[400]">
                        Current Location
                    </p>
                    <div className="flex gap-[2px] items-center">
                        <MdLocationOn className="w-4 h-4" />
                        <p className="font-urbanist text-[14px] sm:text-[16px] font-[500]">
                            {userLocation}
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-6 md:px-8">
                <SearchBar />
            </div>
            <MobileMenuCategories />
        </nav>
    )
}

export default MobileTopNav