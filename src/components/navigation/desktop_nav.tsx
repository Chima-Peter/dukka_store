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
import { useActiveMarket } from "@/hooks/use_active_market";

interface PropTypes {
    userLocation: string;
    flag: string;
    currency: string;
    language: string;
}

const DesktopNav = ({ userLocation, flag, currency, language }: PropTypes) => {
    const {
        market,
        currencyName,
        currencyCode,
        flagUrl,
    } = useActiveMarket();
    const displayCurrency = currencyName || currencyCode || currency;
    const displayFlag = flagUrl || flag;
    const deliverTo = market?.name || userLocation;
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
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
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
            className={`fixed z-30 hidden w-full flex-col bg-white font-urbanist min-[1050px]:flex ${
                isScrolled ? "border-b border-dukka-line shadow-sm" : "border-b border-dukka-line"
            }`}
        >
            <section className="flex w-full items-center justify-between bg-dukka-ink px-8 py-1.5 text-white/80">
                <Link
                    href="mailto:hello@dukka.store?subject=Dukka%20inquiry"
                    className="text-[12px] transition-colors hover:text-white xl:text-[13px]"
                >
                    hello@dukka.store
                </Link>
                <p className="text-[12px] font-medium text-dukka-amber xl:text-[13px]">
                    Shop markets worldwide
                </p>
                <div className="flex items-center gap-6 text-[12px] xl:text-[13px]">
                    <div className="flex items-center gap-1.5">
                        {displayFlag ? (
                            <Image
                                alt={market?.name || userLocation || "Market"}
                                src={displayFlag}
                                width={14}
                                height={14}
                                unoptimized={Boolean(flagUrl)}
                            />
                        ) : null}
                        {displayCurrency ? <span>{displayCurrency}</span> : null}
                    </div>
                    <span>{language}</span>
                </div>
            </section>

            <section className="relative">
                <div className="flex w-full items-center gap-6 px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                    <Link href="/" className="shrink-0">
                        <Image
                            width={120}
                            height={32}
                            src="/logo.svg"
                            alt="Dukka"
                            priority
                        />
                    </Link>
                    <div className="hidden items-center gap-1.5 text-[13px] text-dukka-muted xl:flex">
                        <Image
                            width={18}
                            height={18}
                            src="/images/navigation/Location.svg"
                            alt=""
                        />
                        <span>
                            Deliver to{" "}
                            <strong className="font-medium text-dukka-ink">
                                {deliverTo}
                            </strong>
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <SearchBar />
                    </div>
                    <div className="relative flex items-center gap-1">
                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative flex h-10 w-10 items-center justify-center text-dukka-ink transition-colors hover:text-dukka-forest"
                        >
                            <BsCart2 className="h-5 w-5" />
                        </Link>
                        {user.isAuthenticated ? (
                            <button
                                type="button"
                                onMouseEnter={openLoginBox}
                                className={`relative flex h-10 items-center gap-2 px-2 text-dukka-ink transition-colors hover:text-dukka-forest ${
                                    showLoginBox ? "text-dukka-forest" : ""
                                }`}
                            >
                                <GoPerson className="h-5 w-5" />
                                <span className="text-[14px] font-medium">
                                    {user.first_name}
                                </span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onMouseEnter={openLoginBox}
                                className={`relative flex h-10 items-center gap-2 px-2 text-dukka-ink transition-colors hover:text-dukka-forest ${
                                    showLoginBox ? "text-dukka-forest" : ""
                                }`}
                            >
                                <GoPerson className="h-5 w-5" />
                                <span className="text-[14px] font-medium">Login</span>
                            </button>
                        )}
                        {showLoginBox && <AuthOptions />}
                    </div>
                </div>

                <div
                    className="relative w-full border-t border-dukka-line"
                    onMouseLeave={closeAllCategories}
                >
                    <div className="mx-auto flex w-full max-w-[1600px] items-center gap-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                        <button
                            type="button"
                            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 transition-colors ${
                                showAllCategories
                                    ? "border-dukka-forest text-dukka-forest"
                                    : "border-transparent text-dukka-muted hover:text-dukka-forest"
                            }`}
                            onMouseEnter={openAllCategoryComponent}
                        >
                            <VscMenu className="h-4 w-4" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">
                                All
                            </span>
                        </button>
                        <div className="h-4 w-px shrink-0 bg-dukka-line" />
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
                                        className={`shrink-0 border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors xl:text-[14px] ${
                                            isActive
                                                ? "border-dukka-forest text-dukka-forest"
                                                : "border-transparent text-dukka-muted hover:border-dukka-amber hover:text-dukka-forest"
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
