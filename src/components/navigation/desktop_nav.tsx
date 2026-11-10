"use client"


import Image from "next/image"
import Link from "next/link"
import SearchBar from "../search/search_bar"
import { BsCart2 } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { VscMenu } from "react-icons/vsc"
import CategoryComponent from "./sub_category_component"
import useNavigationContext from "../../hooks/use_category_component"
import AuthOptions from "../authentication/auth_options"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/store"
import AllCategoryComponent from "./all_categories_component"
import { useNavCategories } from "@/hooks/use_nav_categories"


interface PropTypes { 
    userLocation: string 
    flag: string
    currency: string
    language: string
}

const DesktopNav = ({ userLocation, flag, currency, language }: PropTypes) => {
    const { setShowCategories, showCategories, setShowLoginBox, showLoginBox, setCategoryIndex, showAllCategories, setShowAllCategories, categoryIndex } = useNavigationContext()
    const navCategories = useNavCategories()


    // managing user state for either login or logout
    const user = useAppSelector(state => state.auth)
    

    const [isScrolled, setIsScrolled] = useState(false)

    // load shadow for nav onscroll event
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // control when to open category component and also set category index to display - ensure the all category and auth options boxes are closed
    const openCategoryComponent = (index: number) => {
        setShowAllCategories(false)
        setShowLoginBox(false)
        setShowCategories(true)
        setCategoryIndex(index)
    }

    // control when to open the all category component - ensure the sub category and auth options boxes are closed
    const openAllCategoryComponent = () => {
        setShowCategories(false)
        setShowLoginBox(false)
        setCategoryIndex(100)
        setShowAllCategories(true)
    }

    // control when to open the login box
    const openLoginBox = () => {
        setShowLoginBox(true)
    }


    return (
        <nav className={`bg-white z-30 hidden min-[1050px]:flex flex-col w-[100%] font-urbanist ${isScrolled ? 'drop-shadow-md' : ''} fixed`}>
            <section className="w-[100%] flex justify-between py-2 px-8 items-center bg-[#031815] text-white">
                <div className="flex gap-6">
                    <Link href="tel:+23480123456789" className="text-[14px] xl:text-[18px] 2xl:text-[24px]">
                        +234 8012 345 6789
                    </Link>
                    <Link href="mailto:hellomile12@mile12.com" className="text-[14px] xl:text-[18px] 2xl:text-[24px]">
                        hellomile12@mile12.com
                    </Link>
                </div>
                <p className="text-[16px] xl:text-[18px] text-[#FEB100] font-medium 2xl:text-[24px]">
                    Don&lsquo;t miss home
                </p>
                <div className="flex gap-12 items-center">
                    <div className="flex gap-1 items-center">
                        <Image alt={userLocation} src={flag} width={14} height={14} />
                        <p className="text-[16px] font-noto_sans font-[400]">
                            {currency}
                        </p>
                    </div>
                    <p className="text-[14px] font-noto_sans font-[400]">
                        {language}
                    </p>
                </div>
            </section>
            <section>
                <div className="w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-4 flex justify-between items-center">
                    <Link href={'/'}>
                        <Image width={205} height={47} src="/logo.svg" alt="Dukka" priority />
                    </Link>
                    <div className="flex gap-2 items-center">
                        <Image width={32} height={32} src="/images/navigation/Location.svg" alt="location icon" />
                        <p className="text-[16px] xl:text-[20px] 2xl:text-[28px]">
                            Deliver to <strong>{userLocation}</strong>
                        </p>
                    </div>
                    <SearchBar />
                    <div className="flex gap-5">
                        <Link href={'/cart'} className="border border-[#ADB1B1] rounded-md py-3 px-4 xl:py-4 xl:px-5 hover:bg-[#FEB100] hover:border-[#FEB100] relative">
                            <BsCart2 className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 " />
                        </Link>
                        {
                            user.isAuthenticated ? 
                            <button onMouseEnter={openLoginBox}  className="border border-[#ADB1B1] rounded-md py-3 px-4  xl:py-4 xl:px-5 hover:bg-[#FEB100] hover:border-[#FEB100] flex gap-3 relative">
                                <GoPerson className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                                <p className="text-[16px] xl:text-[22px] 2xl:text-[28px] font-semibold">
                                    {user.first_name}
                                </p>
                            </button> : 
                            <button onMouseEnter={openLoginBox}  className={`border  rounded-md py-3 px-4  xl:py-4 xl:px-5 hover:bg-[#FEB100] hover:border-[#FEB100] flex gap-3 relative ${showLoginBox ? 'bg-[#FEB100] border-[#FEB100]' : 'bg-white border-[#ADB1B1]'}`}>
                                <GoPerson className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                                <p className="text-[16px] xl:text-[22px] 2xl:text-[28px] font-semibold">
                                    Login
                                </p>
                            </button>
                        }
                        {showLoginBox && <AuthOptions />}
                    </div>
                </div>
                <div className="w-full border-t border-[#E4E7E7] bg-[#FAFBFA]">
                    <div className="mx-auto flex w-full max-w-[1600px] items-center gap-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                        <button
                            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3.5 transition-colors duration-200 xl:px-4 ${
                                categoryIndex === 100
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
                            {navCategories.map((category, index) => (
                                <Link
                                    key={category.category}
                                    href={`/category/${encodeURIComponent(category.category)}`}
                                    onMouseEnter={() => openCategoryComponent(index)}
                                    className={`shrink-0 border-b-2 px-3 py-3.5 text-[14px] font-medium transition-colors duration-200 xl:px-4 xl:text-[15px] ${
                                        categoryIndex === index
                                            ? "border-[#0D523F] text-[#0D523F]"
                                            : "border-transparent text-[#4B5555] hover:border-[#FEB100] hover:text-[#0D523F]"
                                    }`}
                                >
                                    {category.category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {
                showCategories && <CategoryComponent />
            }
            {
                showAllCategories && <AllCategoryComponent />
            }
        </nav>
    )
}

export default DesktopNav