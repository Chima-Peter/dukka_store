"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import useNavigationContext from "../../hooks/use_category_component";
import Image from "next/image";

const MobileBottomNav = () => {
    // get the pathname in order to use active state
    const activeLink = usePathname()

    // get all categories so we hide bottom nav when all categories component is active
    const { showAllCategories } = useNavigationContext()
    
    return (
        <nav className={`${showAllCategories ? 'hidden' : 'hidden max-[1050px]:flex'} w-[100%] justify-between gap-0 fixed bottom-0 py-4 bg-white px-2 xs:px-6 sm:px-8 md:px-10 font-urbanist z-30 drop-shadow-nav-top`}>
            <Link href={'/'} className="flex flex-col gap-1 items-center">
                {
                    activeLink === '/' ? <Image width={23} height={23} src="/images/navigation/mobile/iconamoon_home-fill.svg" alt="Home"  /> : <Image width={23} height={23} src="/images/navigation/mobile/iconamoon_home-light.svg" alt="Home"  />
                }
                <p className={`text-[12px] sm:text-[14px] font-[600] tracking-wide ${activeLink === '/' ? 'text-[#164D46]' : 'text-black'}`}>
                    Home
                </p>
            </Link>
            <Link href={'/cart'} className="flex flex-col gap-1 items-center">
                {
                    activeLink === '/cart' ? <Image width={23} height={23} src="/images/navigation/mobile/mynaui_cart-solid.svg" alt="Cart"  /> : <Image width={23} height={23} src="/images/navigation/mobile/mynaui_cart.svg" alt="Cart"  />
                }
                <p className={`text-[12px] sm:text-[14px] font-[600] tracking-wide ${activeLink === '/cart' ? 'text-[#164D46]' : 'text-black'}`}>
                    Cart
                </p>
            </Link>
            <Link href={'/profile'} className="flex flex-col gap-1 items-center">
                {
                    activeLink === '/profile' ? <Image width={23} height={23} src="/images/navigation/mobile/healthicons_ui-user-profile.svg" alt="Profile"  /> : <Image width={23} height={23} src="/images/navigation/mobile/iconoir_profile-circle.svg" alt="Profile"  />
                }
                <p className={`text-[12px] sm:text-[14px] font-[600] tracking-wide ${activeLink === '/profile' ? 'text-[#164D46]' : 'text-black'}`}>
                    Profile
                </p>
            </Link>
            {/* <Link href={'/menu'} className="flex flex-col gap-1 items-center">
                {
                    activeLink === '/menu' ? <Image width={23} height={23} src="/images/navigation/mobile/ri_menu-3-line-bold.svg" alt="Menu"  /> : <Image width={23} height={23} src="/images/navigation/mobile/ri_menu-3-line.svg" alt="Menu"  />
                }
                <p className={`text-[12px] sm:text-[14px] font-[600] tracking-wide ${activeLink === '/menu' ? 'text-[#164D46]' : 'text-black'}`}>
                    Menu
                </p>
            </Link> */}
            <Link href={'/profile/messages'} className="flex flex-col gap-1 items-center">
                {
                    activeLink === '/profile/messages' ? <Image width={23} height={23} src="/images/navigation/mobile/solar_ticket-sale-bold.svg" alt="Promos"  /> : <Image width={23} height={23} src="/images/navigation/mobile/solar_ticket-sale-outline.svg" alt="Promos"  />
                }
                <p className={`text-[12px] sm:text-[14px] font-[600] tracking-wide ${activeLink === '/deals' ? 'text-[#164D46]' : 'text-black'}`}>
                    Promos
                </p>
            </Link>
        </nav>
    )
}

export default MobileBottomNav