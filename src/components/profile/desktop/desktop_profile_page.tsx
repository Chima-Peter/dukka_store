"use client"


import { useState } from "react"
import { BiMessageSquareDetail, BiEdit } from "react-icons/bi"
import { BsCartCheck, BsChevronDoubleRight } from "react-icons/bs"
import { GoHeart, GoPerson } from "react-icons/go"
import { IoMdLogOut } from "react-icons/io"
import Link from "next/link"
import { OrdersType, MessagesType } from "../../../types/profile"
import EditProfile from "./profile/edit_profile"
import FavouriteLarge from "./favourite_large"
import MessageDecider from "./message/message_decider"
import OrdersLarge from "./orders/orders_large"
import UserDetails from "./profile/user_details"
import LogoutModal from "@/components/authentication/logout_modal"


const DesktopProfilePage = () => {
    // to move through the different sections in profile
    const [step, setStep] = useState(0)

    const [logoutModal, setLogoutModal] = useState<boolean>(false)


    const data = [
        { title: "Maple-Glazed Ham", price: "4,111", image: "/images/home_page/smoked_beef.webp" },
        { title: "Wood-Fired Pizza", price: "8,534", image: "/images/home_page/kilishi.webp" },
        { title: "Chimichurri-Grilled Shrimp", price: "6,244", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Roasted Venison", price: "12,482", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Spicy Chicken Wings", price: "16,314", image: "/images/home_page/smoked_beef.webp" },
        { title: "Spicy Chicken Wings", price: "5,241", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "BBQ Pulled Pork", price: "8,539", image: "/images/home_page/smoked_beef.webp" },
        { title: "Roasted Turkey Legs", price: "11,943", image: "/images/home_page/smoked_beef.webp" },
        { title: "Peppercorn-Crusted Steak", price: "12,800", image: "/images/home_page/kilishi.webp" },
        { title: "Roasted Turkey Legs", price: "14,103", image: "/images/home_page/smoked_beef.webp" },
        { title: "Barbecued Pork", price: "3,793", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Smoked Cheese Platter", price: "5,491", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Mackerel", price: "4,182", image: "/images/home_page/smoked_beef.webp" },
        { title: "Maple-Glazed Ham", price: "9,881", image: "/images/home_page/smoked_beef.webp" },
        { title: "Charred Salmon", price: "3,282", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Goat Meat", price: "18,790", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Maple-Glazed Ham", price: "17,369", image: "/images/home_page/smoked_beef.webp" },
        { title: "Maple-Glazed Ham", price: "5,628", image: "/images/home_page/smoked_beef.webp" },
        { title: "Chimichurri-Grilled Shrimp", price: "4,222", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Cheese Platter", price: "10,135", image: "/images/home_page/kilishi.webp" },
        { title: "Charred Sweet Corn", price: "6,923", image: "/images/home_page/kilishi.webp" },
        { title: "Slow-Cooked Lamb Shank", price: "13,192", image: "/images/home_page/kilishi.webp" },
        { title: "Smoked Goat Meat", price: "5,662", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Wood-Fired Pizza", price: "19,669", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Smoked Duck", price: "19,545", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Smoked Duck", price: "4,679", image: "/images/home_page/smoked_beef.webp" },
        { title: "Smoked Guinea Fowl", price: "10,674", image: "/images/home_page/smoked_goat_meat.webp" },
        { title: "Smoked Guinea Fowl", price: "16,073", image: "/images/home_page/smoked_beef.webp" },
        { title: "Herb-Crusted Chicken", price: "12,527", image: "/images/home_page/smoked_guinea_fowl.webp" },
        { title: "Charred Salmon", price: "6,983", image: "/images/home_page/smoked_goat_meat.webp" },
    ] 


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

    const ordersList: OrdersType[] = [
        {
          "order_id": "ORD12345",
          "date": new Date("2025-01-28").toISOString(),
          "items": 3,
          "amount": 1500000.75,
          "status": "enroute"
        },
        {
          "order_id": "ORD12346",
          "date": new Date("2025-01-27").toISOString(),
          "items": 1,
          "amount": 40910.99,
          "status": "delivered"
        },
        {
          "order_id": "ORD12347",
          "date": new Date("2025-01-26").toISOString(),
          "items": 2,
          "amount": 89000.50,
          "status": "cancelled"
        },
        {
          "order_id": "ORD12348",
          "date": new Date("2025-01-25").toISOString(),
          "items": 5,
          "amount": 220900.00,
          "status": "delivered"
        },
        {
          "order_id": "ORD12349",
          "date": new Date("2025-01-24").toISOString(),
          "items": 4,
          "amount": 128000.99,
          "status": "enroute"
        },
        {
          "order_id": "ORD12350",
          "date": new Date("2025-01-23").toISOString(),
          "items": 2,
          "amount": 75000.00,
          "status": "delivered"
        },
        {
          "order_id": "ORD12351",
          "date": new Date("2025-01-22").toISOString(),
          "items": 6,
          "amount": 356000.45,
          "status": "enroute"
        },
        {
          "order_id": "ORD12352",
          "date": new Date("2025-01-21").toISOString(),
          "items": 3,
          "amount": 20000.99,
          "status": "cancelled"
        },
        {
          "order_id": "ORD12353",
          "date": new Date("2025-01-20").toISOString(),
          "items": 5,
          "amount": 170050.60,
          "status": "delivered"
        },
        {
          "order_id": "ORD12354",
          "date": new Date("2025-01-19").toISOString(),
          "items": 1,
          "amount": 30500.75,
          "status": "enroute"
        },
        {
          "order_id": "ORD12355",
          "date": new Date("2025-01-18").toISOString(),
          "items": 4,
          "amount": 145000.20,
          "status": "delivered"
        },
        {
          "order_id": "ORD12356",
          "date": new Date("2025-01-17").toISOString(),
          "items": 3,
          "amount": 110300.00,
          "status": "cancelled"
        },
        {
          "order_id": "ORD12357",
          "date": new Date("2025-01-16").toISOString(),
          "items": 7,
          "amount": 400500.90,
          "status": "delivered"
        },
        {
          "order_id": "ORD12358",
          "date": new Date("2025-01-15").toISOString(),
          "items": 2,
          "amount": 85000.30,
          "status": "enroute"
        },
        {
          "order_id": "ORD12359",
          "date": new Date("2025-01-14").toISOString(),
          "items": 5,
          "amount": 190700.75,
          "status": "cancelled"
        }
    ]

    const messagesList: MessagesType[] = [
        {
            header: "Black Friday Deal!",
            message: "Get ready for unbeatable deals this Black Friday! Explore our website for exclusive",
            hasRead: false,
            time: new Date().toISOString()
        },
        {
            header: "New Year Discounts!",
            message: "Start the year with amazing deals! Shop now and save big on your favorite items.",
            hasRead: false,
            time: "2025-01-01T08:00:00Z"
        },
        {
            header: "Limited-Time Offer!",
            message: "Flash sale alert! Don't miss out on huge discounts available only for the next 24 hours.",
            hasRead: true,
            time: "2025-02-05T14:15:00Z"
        },
        {
            header: "Valentine's Special ❤️",
            message: "Surprise your loved one with special gifts this Valentine's Day! Exclusive discounts inside.",
            hasRead: false,
            time: "2025-02-14T09:45:00Z"
        },
        {
            header: "Your Order Has Shipped!",
            message: "Good news! Your recent order has been shipped and is on its way.",
            hasRead: true,
            time: "2025-01-20T12:00:00Z"
        },
        {
            header: "Reminder: Your Cart Awaits!",
            message: "Items in your cart are still available! Checkout now before they sell out.",
            hasRead: false,
            time: "2025-02-03T18:30:00Z"
        },
        {
            header: "Spring Clearance Sale!",
            message: "Enjoy up to 50% off on select items. Shop now before the sale ends!",
            hasRead: false,
            time: "2025-03-15T11:20:00Z"
        },
        {
            header: "New Product Alert!",
            message: "Check out our latest arrivals! Be the first to get your hands on trending products.",
            hasRead: false,
            time: "2025-02-07T16:00:00Z"
        },
        {
            header: "Cyber Monday Madness!",
            message: "One day only! Extra discounts on top tech products. Grab yours now!",
            hasRead: true,
            time: "2024-12-02T13:45:00Z"
        },
        {
            header: "Loyalty Reward Unlocked!",
            message: "Thank you for being a valued customer! Claim your exclusive reward today.",
            hasRead: false,
            time: "2025-01-10T09:10:00Z"
        },
        {
            header: "Exclusive VIP Offer",
            message: "A special deal just for you! Enjoy early access to our upcoming sales event.",
            hasRead: true,
            time: "2025-01-25T20:00:00Z"
        },
        {
            header: "Mother's Day Specials 💐",
            message: "Celebrate Mom with thoughtful gifts and exclusive discounts!",
            hasRead: false,
            time: "2025-05-11T07:30:00Z"
        },
        {
            header: "Your Subscription is Expiring",
            message: "Renew now to continue enjoying premium benefits without interruption!",
            hasRead: false,
            time: "2025-02-28T15:45:00Z"
        },
        {
            header: "Holiday Deals Are Here! 🎄",
            message: "Enjoy massive discounts on gifts and essentials this holiday season!",
            hasRead: false,
            time: "2024-12-20T17:55:00Z"
        },
        {
            header: "Flash Giveaway! 🎁",
            message: "Enter now for a chance to win an exciting prize! Limited spots available.",
            hasRead: false,
            time: "2025-02-10T14:05:00Z"
        },
        {
            header: "Reminder: Your Cart Awaits!",
            message: "Items in your cart are still available! Checkout now before they sell out.",
            hasRead: false,
            time: "2025-02-03T18:30:00Z"
        },
    ];


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
                                    Esther Jones
                                </h1>
                                <button className="" onClick={() => moveToDifferentProfileSection(0)}>
                                    <BiEdit className="text-[#164D46] w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer"/>
                                </button>
                            </div>
                            <p className="text-[14px] xl:text-[16px] font-[300] tracking-wide font-mobile-nav">
                                esther@gmail.com
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