"use client"


import { useMemo, useState } from "react"
import { BiMessageSquareDetail, BiEdit } from "react-icons/bi"
import { BsCartCheck, BsChevronDoubleRight } from "react-icons/bs"
import { GoHeart, GoPerson } from "react-icons/go"
import { IoMdLogOut } from "react-icons/io"
import Link from "next/link"
import { MessagesType } from "../../../types/profile"
import EditProfile from "./profile/edit_profile"
import FavouriteLarge from "./favourite_large"
import MessageDecider from "./message/message_decider"
import OrdersLarge from "./orders/orders_large"
import UserDetails from "./profile/user_details"
import LogoutModal from "@/components/authentication/logout_modal"
import { useGetMeQuery } from "@/redux/services/customer_api"
import { useGetOrdersQuery } from "@/redux/services/orders_api"
import { toOrdersType } from "@/utils/map_order"


const DesktopProfilePage = () => {
    // to move through the different sections in profile
    const [step, setStep] = useState(0)

    const [logoutModal, setLogoutModal] = useState<boolean>(false)
    const { data: me } = useGetMeQuery()
    const { data: ordersPage } = useGetOrdersQuery()
    const ordersList = useMemo(
        () => (ordersPage?.items ?? []).map(toOrdersType),
        [ordersPage],
    )


    const data: { title: string; price: string; image: string }[] = []


    const profileOptionsList = [
        {
            name: "Favorite",
            icon: <GoHeart className="w-5 h-5" />
        },
        {
            name: "Order",
            icon: <BsCartCheck className="w-5 h-5" />
        },
        {
            name: "Messages",
            icon: <BiMessageSquareDetail className="w-5 h-5" />
        },
    ]

    const messagesList: MessagesType[] = []

    const profilePages = [
        <UserDetails setStep={setStep} key={0} />,
        <FavouriteLarge header="Favorites" caller="" details={data} key={1} />,
        <OrdersLarge orders={ordersList} key={2} />,
        <MessageDecider setStep={setStep} messages={messagesList} key={3} />,
        <div key={5}></ div>,
        <EditProfile setStep={setStep} key={5} />
    ]

    const moveToDifferentProfileSection = (index: number) => {
        setStep(index)
    }



    return (
        <main className="bg-[#F0F0F0] flex flex-col gap-8 min-lg:gap-3 w-[100%] items-center pb-12 min-lg:pb-6 pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] font-main">
            <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 py-4 w-[100%]">
                <p className="flex items-center gap-1 pb-2 border-b-[1.4px] border-b-gray-300">
                    <Link className="text-[13px] opacity-75 font-normal" href="/"> Home </Link> <strong className="opacity-65"> <BsChevronDoubleRight className="w-3 h-3" /> </strong> <Link href={'/profile'} className="text-[16px] font-[500] tracking-wide capitalize">Profile</Link>
                </p>
            </section>
            
            <section className="w-[100%] flex justify-between min-lg:py-6 px-4 sm:px-6 md:px-8 min-lg:px-12 xl:px-14 2xl:px-16 bg-white gap-2">
                <section className="w-fit h-fit flex bg-white flex-col border border-[#ADB1B1] rounded-2xl">
                    <div className={`flex w-[100%] gap-6 py-4 rounded-t-2xl px-8 border-b ${step === 0 ? 'bg-[#FEB100]' : 'bg-white'}`}>
                        <button className={`w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 flex items-center justify-center border ${step === 0 ? 'border-black' : 'border-gray-300'} rounded-full`} >
                            <GoPerson className="w-7 h-7 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12" />
                        </button>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 items-center">
                                <h1 className="text-[20px] xl:text-[22px] 2xl:text-[24px] font-[500]">
                                    {me?.name || "Customer"}
                                </h1>
                                <button className="" onClick={() => moveToDifferentProfileSection(0)}>
                                    <BiEdit className="text-[#164D46] w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer"/>
                                </button>
                            </div>
                            <p className="text-[14px] xl:text-[16px] font-[300] tracking-wide font-mobile-nav">
                                {me?.email || ""}
                            </p>
                        </div>
                    </div>

                    <ul className="flex flex-col mt-8">
                        {
                            profileOptionsList.map((option, index: number) => (
                                <button className={`flex gap-6 px-8 py-3 items-center cursor-pointer hover:bg-[#FEB100] ${step === index + 1 ? 'bg-[#FEB100]' : 'bg-white'} border-b border-b-[#ADB1B1] font-[400] last:text-[#D70404] hover:font-[500]`} key={option.name} onClick={() => moveToDifferentProfileSection(index + 1)}>
                                    {option.icon}
                                    <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-wider">
                                        {option.name}
                                    </p>
                                </button>
                            ))
                        }
                        <button className={`flex gap-6 px-8 py-3 items-center cursor-pointer hover:bg-[#FEB100] ${step === 4 ? 'bg-[#FEB100]' : 'bg-white'} border-b border-b-[#ADB1B1] font-[400] text-[#D70404] hover:font-[500]`} onClick={() => setLogoutModal(true)} >
                            <IoMdLogOut className="w-5 h-5" />
                            <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-wider">
                                Logout
                            </p>
                        </button>
                        {
                            logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />
                        }
                    </ul>

                    <div className="my-8 flex flex-col gap-2 w-[100%] justify-center items-start px-20">
                        <Link href={'/'} className="text-[18px] xl:text-[20px] 2xl:text-[22px] text-[#0D3833] font-[500]">
                            Customer care
                        </Link>
                        <Link href={'/'} className="text-[18px] xl:text-[20px] 2xl:text-[22px] text-[#0D3833] font-[500]">
                            Return policy
                        </Link>
                    </div>
                </section>

                {
                    profilePages[step]
                }
            </section>
        </main>
    )
}

export default DesktopProfilePage