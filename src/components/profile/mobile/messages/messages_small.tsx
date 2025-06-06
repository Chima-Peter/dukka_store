"use client"

import { isToday } from 'date-fns'
import { FiSearch } from "react-icons/fi"
import { useState, useEffect } from "react"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { MessagesType } from "../../../../types/profile"
import MessageContent from "../../desktop/message/message_content"
import Pagination from '@/components/ui/pagination'
import BackButton from '@/components/ui/back_button'

const MessagesSmall = () => {
    // state to collect message query
    const [messageQuery, setMessageQuery] = useState<string>("")

    // state for recent messages
    const [recentMessages, setRecentMessages] = useState<MessagesType[]>([])

    // state for older messages
    const [olderMessages, setOlderMessages] = useState<MessagesType[]>([])

    // state to control message box list
    const [messageType, setMessageType] = useState('Inbox')

    // state to open message box
    const [openMessage, setOpenMessage] = useState(false)

    const messageBoxList = [
        "Inbox", "Promotional Content", "Unread", "Read"
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

    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = messagesList.slice(pageIndex, pageIndex + 10)

    // method to collect user search for order
    const collectMessageQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageQuery(event.target.value)
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setMessageQuery("")
    }

    // method to toggle sort box - open or close
    const toggleSort = () => {
        setOpenMessage(!openMessage)
    }

    // method to change active message type option
    const changeActiveMessageType = (active: string) => {
        setMessageType(active)
    }

    // collect the older and recent messagesList from the list - effect only runs when redux updates the message list
    useEffect(() => {
        if (displayList.length > 0) {
            setRecentMessages(displayList.filter(message => isToday(message.time)))
            setOlderMessages(displayList.filter(message => !isToday(message.time)))
        }
    }, [displayList])



    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Messages
                    </h1>
                    <p className="tracking-wide font-[400] text-[#646767] text-[0.1px]">
                        null
                    </p>
                </section>

                <section className="bg-white px-4 sm:px-6 md:px-8 flex justify-between relative w-[100%] items-center">
                    <form noValidate onSubmit={handleSubmit} className="flex border rounded-lg border-[#ADB1B1] focus-within:border-gray-100 focus-within:shadow-md w-[63%] sm:w-[75%] font-urbanist relative">
                        <input onChange={collectMessageQuery} value={messageQuery} type="search" name="search" id="search" placeholder="Search for an order" autoComplete="off" className="w-[100%] text-[16px] md:text-[18px] focus:shadow-lg outline-none placeholder:tracking-wide h-[40px] md:h-[50px] px-6  rounded-l-lg" />
                        <button type="submit"  className="rounded-r-lg bg-[#F9F9F9] border-l border-l-[#ADB1B1] min-lg:py-2 px-6">
                            <FiSearch className="w-5 h-5 text-black xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                        </button>
                    </form>

                    <button className="py-2 w-[35%] sm:w-[20%] px-4 bg-[#FEB100] rounded-md border  border-[#ADB1B1] text-[16px] font-[400] 2xl:text-[18px] flex items-center gap-2 justify-center tracking-wider relative" onClick={toggleSort}>
                        Sort by<IoIosArrowDown />
                        {
                            openMessage && <div className="flex flex-col bg-white shadow-lg gap-0 rounded-2xl border border-gray-200 w-[300px] absolute -top-1 -right-2 z-10">
                                <div className="w-[100%] flex justify-between items-center p-4 px-6 shadow-md">
                                    <IoMdClose className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer" onClick={toggleSort}/>
                                </div>
                                <ul className="flex flex-col p-4 px-6 gap-2 pb-6">
                                    {
                                        messageBoxList.map((field) => (
                                            <li className="flex items-center gap-3 cursor-pointer" key={field} onClick={() => changeActiveMessageType(field)}>
                                                {
                                                    messageType === field ? <MdCheckBox className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer"  /> : <MdCheckBoxOutlineBlank className="w-6 h-6 2xl:w-7 2xl:h-7 cursor-pointer"  />
                                                }
                                                <p className="text-[14px] 2xl:text-[16px] tracking-wide font-[500]">
                                                    {field}
                                                </p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                    </button>
                </section>

                <section className="flex flex-col gap-4 px-4 sm:px-6 md:px-8">
                    {
                        recentMessages.length > 0 && <h1 className="font-[400] text-[16px] md:text-[18px]">
                            Recent
                        </h1>
                    }
                    <ul className="flex flex-col gap-4">
                        {
                            recentMessages.map((message) => (
                                <MessageContent list={message} key={message.time} />
                            ))
                        }
                    </ul>
                </section>

                <section className="flex flex-col gap-4 px-4 sm:px-6 md:px-8">
                    {
                        olderMessages.length > 0 && <h1 className="font-[400] text-[16px] md:text-[18px]">
                            Earlier
                        </h1>
                    }
                    <ul className="flex flex-col gap-4">
                        {
                            olderMessages.map((message) => (
                                <MessageContent list={message} key={message.time} />
                            ))
                        }
                    </ul>
                </section>

                {
                    messagesList.length > 0 && <Pagination itemsPerPage={10} totalItems={messagesList.length} onPageChange={setPage} />
                }
            </section>
        </main>
    )
}

export default MessagesSmall