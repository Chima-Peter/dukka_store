"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../search/search_bar";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { VscMenu } from "react-icons/vsc";
import useNavigationContext from "../../hooks/use_category_component";
import AuthOptions from "../authentication/auth_options";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/store";
import AllCategoryComponent from "./all_categories_component";
import { useNavCategories } from "@/hooks/use_nav_categories";

interface PropTypes {
    userLocation: string;
    flag: string;
    currency: string;
    language: string;
}

const DesktopNav = ({ userLocation, flag, currency, language }: PropTypes) => {
    const {
        setShowCategories,
        setShowLoginBox,
        showLoginBox,
        setCategoryIndex,
        showAllCategories,
        setShowAllCategories,
    } = useNavigationContext();
    const navCategories = useNavCategories();
    const user = useAppSelector((state) => state.auth);
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const el = navRef.current;
        if (!el) return;
        const syncHeight = () => {
            document.documentElement.style.setProperty(
                "--dukka-nav-height",
                `${el.getBoundingClientRect().height}px`,
            );
        };
        syncHeight();
        const observer = new ResizeObserver(syncHeight);
        observer.observe(el);
        return () => observer.disconnect();
    }, [showAllCategories, showLoginBox]);

    const openAllCategoryComponent = () => {
        setShowCategories(false);
        setShowLoginBox(false);
        setCategoryIndex(100);
        setShowAllCategories(true);
    };

    const closeAllCategories = () => {
        setShowAllCategories(false);
        setCategoryIndex(-1);
    };

    const openLoginBox = () => {
        setShowAllCategories(false);
        setShowLoginBox(true);
    };

    const activeCategory = (() => {
        if (!pathname?.startsWith("/category/")) return null;
        const raw = decodeURIComponent(pathname.replace("/category/", ""));
        return raw.toLowerCase();
    })();

    return (
        <nav
            ref={navRef}
            className={`fixed z-30 hidden w-[100%] flex-col bg-white font-urbanist min-[1050px]:flex ${
                isScrolled ? "drop-shadow-md" : ""
            }`}
        >
            <section className="flex w-[100%] items-center justify-between bg-[#031815] px-8 py-2 text-white">
                <div className="flex gap-6">
                    <Link
                        href="mailto:hello@dukka.store?subject=Dukka%20inquiry"
                        className="text-[14px] xl:text-[18px] 2xl:text-[24px]"
                    >
                        hello@dukka.store
                    </Link>
                </div>
                <p className="text-[16px] font-medium text-[#FEB100] xl:text-[18px] 2xl:text-[24px]">
                    Shop markets worldwide
                </p>
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-1">
                        <Image
                            alt={userLocation}
                            src={flag}
                            width={14}
                            height={14}
                        />
                        <p className="font-noto_sans text-[16px] font-[400]">
                            {currency}
                        </p>
                    </div>
                    <p className="font-noto_sans text-[14px] font-[400]">
                        {language}
                    </p>
                </div>
            </section>
            <section className="relative">
                <div className="flex w-[100%] items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <Link href="/">
                        <Image
                            width={140}
                            height={36}
                            src="/logo.svg"
                            alt="Dukka"
                            priority
                        />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Image
                            width={32}
                            height={32}
                            src="/images/navigation/Location.svg"
                            alt="location icon"
                        />
                        <p className="text-[16px] xl:text-[20px] 2xl:text-[28px]">
                            Deliver to <strong>{userLocation}</strong>
                        </p>
                    </div>
                    <SearchBar />
                    <div className="relative flex gap-5">
                        <Link
                            href="/cart"
                            className="relative border border-[#ADB1B1] px-4 py-3 hover:border-[#FEB100] hover:bg-[#FEB100] xl:px-5 xl:py-4"
                        >
                            <BsCart2 className="h-5 w-5 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10" />
                        </Link>
                        {user.isAuthenticated ? (
                            <button
                                type="button"
                                onMouseEnter={openLoginBox}
                                className={`relative flex gap-3 border px-4 py-3 hover:border-[#FEB100] hover:bg-[#FEB100] xl:px-5 xl:py-4 ${
                                    showLoginBox
                                        ? "border-[#FEB100] bg-[#FEB100]"
                                        : "border-[#ADB1B1] bg-white"
                                }`}
                            >
                                <GoPerson className="h-5 w-5 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10" />
                                <p className="text-[16px] font-semibold xl:text-[22px] 2xl:text-[28px]">
                                    {user.first_name}
                                </p>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onMouseEnter={openLoginBox}
                                className={`relative flex gap-3 border px-4 py-3 hover:border-[#FEB100] hover:bg-[#FEB100] xl:px-5 xl:py-4 ${
                                    showLoginBox
                                        ? "border-[#FEB100] bg-[#FEB100]"
                                        : "border-[#ADB1B1] bg-white"
                                }`}
                            >
                                <GoPerson className="h-5 w-5 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10" />
                                <p className="text-[16px] font-semibold xl:text-[22px] 2xl:text-[28px]">
                                    Login
                                </p>
                            </button>
                        )}
                        {showLoginBox && <AuthOptions />}
                    </div>
                </div>
                <div
                    className="relative w-full border-t border-[#E4E7E7] bg-[#FAFBFA]"
                    onMouseLeave={closeAllCategories}
                >
                    <div className="mx-auto flex w-full max-w-[1600px] items-center gap-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                        <button
                            type="button"
                            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3.5 transition-colors duration-200 xl:px-4 ${
                                showAllCategories
                                    ? "border-[#FEB100] text-[#0D523F]"
                                    : "border-transparent text-[#0D523F]/80 hover:text-[#0D523F]"
                            }`}
                            onMouseEnter={openAllCategoryComponent}
                        >
                            <VscMenu className="h-4 w-4 xl:h-5 xl:w-5" />
                            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] xl:text-[14px]">
                                All
                            </span>
                        </button>
                        <div className="h-5 w-px shrink-0 bg-[#D5DADA]" />
                        <div className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto scrollbar-hide">
                            {navCategories.map((category) => {
                                const isActive =
                                    activeCategory ===
                                    category.category.toLowerCase();
                                return (
                                    <Link
                                        key={category.category}
                                        href={`/category/${encodeURIComponent(category.category)}`}
                                        onMouseEnter={closeAllCategories}
                                        className={`shrink-0 border-b-2 px-3 py-3.5 text-[14px] font-medium transition-colors duration-200 xl:px-4 xl:text-[15px] ${
                                            isActive
                                                ? "border-[#0D523F] text-[#0D523F]"
                                                : "border-transparent text-[#4B5555] hover:border-[#FEB100] hover:text-[#0D523F]"
                                        }`}
                                    >
                                        {category.category}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    {showAllCategories && <AllCategoryComponent />}
                </div>
            </section>
        </nav>
    );
};

export default DesktopNav;
