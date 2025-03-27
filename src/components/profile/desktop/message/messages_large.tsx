"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { MessagesType } from "../../../../types/profile"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import MessageContent from "./message_content"
import Pagination from "@/components/ui/pagination"

const MessagesLarge = ({ messages }: { messages: MessagesType[] }) => {
    // state to control message box list
    const [messageType, setMessageType] = useState('Inbox')

    // state to open message box
    const [openMessage, setOpenMessage] = useState(false)

    const messageBoxList = [
        "Inbox", "Promotional Content", "Unread", "Read"
    ]


    const [page, setPage] = useState<number>(1)

    const pageIndex = (page * 10) - 10

    const displayList = messages.slice(pageIndex, pageIndex + 10)

    // method to toggle sort box - open or close
    const toggleSort = () => {
        setOpenMessage(!openMessage)
    }

    // method to change active message type option
    const changeActiveMessageType = (active: string) => {
        setMessageType(active)
    }


    return (
        <section className="w-[74%] h-fit flex flex-col gap-8 pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex justify-between py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="font-[500] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                    Messages
                </h1>
                <div className="flex items-center gap-4">
                    <button className="border border-[#ADB1B1] rounded-md bg-[#F9F9F9] w-14 h-10 flex justify-center items-center">
                        <CiSearch className="w-5 h-5" />
                    </button>
                    <button className="py-2 h-fit px-4 bg-[#FEB100] rounded-md border w-[120px] border-[#ADB1B1] text-[16px] font-[400] 2xl:text-[18px] flex items-center gap-2 justify-center tracking-wider relative" onClick={toggleSort}>
                        Inbox<IoIosArrowDown />
                        {
                            openMessage && <div className="flex flex-col bg-white shadow-lg gap-0 rounded-2xl border border-gray-200 w-[300px] absolute -top-1 -right-10 z-10">
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
                </div>
            </div>

            <section className="pt-4 pb-6 flex flex-col gap-6">
                <ul className="flex flex-col w-[100%] gap-2">
                    {
                        displayList.map((list) => (
                            <MessageContent key={list.message} list={list} />
                        ))
                    }
                </ul>                
                {
                    messages.length > 0 && <Pagination itemsPerPage={10} totalItems={messages.length} onPageChange={setPage} />
                }
            </section>
        </section>
    )
}

export default MessagesLarge