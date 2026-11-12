"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useNavigationContext from "../../hooks/use_category_component";
import Image from "next/image";

const MobileBottomNav = () => {
    const activeLink = usePathname();
    const { showAllCategories } = useNavigationContext();

    const labelClass = (active: boolean) =>
        `text-[12px] sm:text-[13px] font-semibold tracking-wide ${
            active ? "text-dukka-forest" : "text-dukka-muted"
        }`;

    return (
        <nav
            className={`${
                showAllCategories ? "hidden" : "hidden max-[1050px]:flex"
            } fixed bottom-0 z-30 w-full justify-between gap-0 border-t border-dukka-line bg-white px-2 py-3 font-urbanist xs:px-6 sm:px-8 md:px-10 drop-shadow-nav-top`}
        >
            <Link href="/" className="flex flex-col items-center gap-1">
                {activeLink === "/" ? (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/iconamoon_home-fill.svg"
                        alt=""
                    />
                ) : (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/iconamoon_home-light.svg"
                        alt=""
                    />
                )}
                <p className={labelClass(activeLink === "/")}>Home</p>
            </Link>
            <Link href="/cart" className="flex flex-col items-center gap-1">
                {activeLink === "/cart" ? (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/mynaui_cart-solid.svg"
                        alt=""
                    />
                ) : (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/mynaui_cart.svg"
                        alt=""
                    />
                )}
                <p className={labelClass(activeLink === "/cart")}>Cart</p>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1">
                {activeLink?.startsWith("/profile") &&
                !activeLink.startsWith("/profile/messages") ? (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/healthicons_ui-user-profile.svg"
                        alt=""
                    />
                ) : (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/iconoir_profile-circle.svg"
                        alt=""
                    />
                )}
                <p
                    className={labelClass(
                        !!activeLink?.startsWith("/profile") &&
                            !activeLink.startsWith("/profile/messages"),
                    )}
                >
                    Profile
                </p>
            </Link>
            <Link href="/profile/messages" className="flex flex-col items-center gap-1">
                {activeLink === "/profile/messages" ? (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/solar_ticket-sale-bold.svg"
                        alt=""
                    />
                ) : (
                    <Image
                        width={22}
                        height={22}
                        src="/images/navigation/mobile/solar_ticket-sale-outline.svg"
                        alt=""
                    />
                )}
                <p className={labelClass(activeLink === "/profile/messages")}>
                    Notifications
                </p>
            </Link>
        </nav>
    );
};

export default MobileBottomNav;
