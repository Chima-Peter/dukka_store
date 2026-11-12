"use client";

import { MdClose, MdLocationOn } from "react-icons/md";
import SearchBar from "../search/search_bar";
import MobileMenuCategories from "./mobile_menu_categories";
import useNavigationContext from "../../hooks/use_category_component";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useActiveMarket } from "@/hooks/use_active_market";

const MobileTopNav = ({ userLocation }: { userLocation: string }) => {
    const { showAllCategories, setShowAllCategories } = useNavigationContext();
    const { market, currencyName, currencyCode } = useActiveMarket();
    const navRef = useRef<HTMLElement>(null);
    const deliverTo = market?.name || userLocation;
    const currency = currencyName || currencyCode;

    const toggleCategories = () => {
        setShowAllCategories(!showAllCategories);
    };

    useEffect(() => {
        document.body.style.overflow = showAllCategories ? "hidden" : "auto";
    }, [showAllCategories]);

    useEffect(() => {
        const el = navRef.current;
        if (!el) return;
        const syncHeight = () => {
            if (window.matchMedia("(max-width: 1049px)").matches) {
                document.documentElement.style.setProperty(
                    "--dukka-nav-height",
                    `${el.getBoundingClientRect().height}px`,
                );
            }
        };
        syncHeight();
        const observer = new ResizeObserver(syncHeight);
        observer.observe(el);
        window.addEventListener("resize", syncHeight);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", syncHeight);
        };
    }, [showAllCategories]);

    return (
        <nav
            ref={navRef}
            className={`fixed z-50 hidden w-full flex-col gap-2 border-b border-dukka-line bg-white pt-3 pb-2 max-[1050px]:flex ${
                showAllCategories ? "h-[100vh] overflow-y-scroll customScroll" : ""
            }`}
        >
            <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8">
                <div className="flex items-center gap-3">
                    {showAllCategories ? (
                        <button type="button" onClick={toggleCategories} aria-label="Close menu">
                            <MdClose className="h-7 w-7 text-dukka-ink" />
                        </button>
                    ) : (
                        <button type="button" onClick={toggleCategories} aria-label="Open menu">
                            <Image
                                priority
                                width={24}
                                height={24}
                                src="/images/navigation/mobile/ic_round-menu.svg"
                                alt=""
                            />
                        </button>
                    )}
                    <Link href="/">
                        <Image
                            width={90}
                            height={24}
                            src="/images/navigation/mobile/logo.svg"
                            alt="Dukka"
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-start gap-0">
                    <p className="text-[11px] font-normal text-dukka-muted sm:text-[12px]">
                        Deliver to{currency ? ` · ${currency}` : ""}
                    </p>
                    <div className="flex items-center gap-0.5">
                        <MdLocationOn className="h-3.5 w-3.5 text-dukka-forest" />
                        <p className="text-[13px] font-medium text-dukka-ink sm:text-[14px]">
                            {deliverTo}
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-6 md:px-8">
                <SearchBar />
            </div>
            <MobileMenuCategories />
        </nav>
    );
};

export default MobileTopNav;
