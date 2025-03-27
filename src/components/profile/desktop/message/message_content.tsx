"use client"

import { format, isToday, parseISO } from "date-fns"
import { useState } from "react"
import { MessagesType } from "../../../../types/profile"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"

const MessageContent = ({ list }: { list: MessagesType }) => {
    // state to select message for deletion
    const [selectMessage, setSelectMessage] = useState<boolean>(false)
    

    // formatting date to extract 12 hour time
    const formattedTime = isToday(list.time) ? format(parseISO(list.time), "hh:mm a") : format(parseISO(list.time), "d MMM")

    // method to toggle select message checkbox 
    const toggleCheckBox = () => {
        setSelectMessage(!selectMessage)
    }

    // method to change message hasRead to true
    const changeMessageStatus = () => {
        // dispatch action to redux store which will update state here too
    }

    return (
        <li className="w-[100%] px-3 md:px-6 py-3 flex justify-between items-center min-lg:border-y min-lg:border-y-[#ADB1B1] max-min-lg:border cursor-pointer max-min-lg:border-[#ADB1B1] relative max-min-lg:rounded-lg min-lg:first:border-t-0" onClick={changeMessageStatus}>
            <button onClick={toggleCheckBox} className="w-fit  h-fit max-min-lg:hidden">
                {
                    selectMessage ? <MdCheckBox className="lg:w-[25px] lg:h-[25px] rounded-md text-[#082B26]"  /> : <MdCheckBoxOutlineBlank className="lg:w-[25px] lg:h-[25px] text-[#082B26] rounded-md"  />

                }
            </button>
            {
                !list.hasRead && <div className="w-3 h-3 rounded-full bg-[#082B26] min-lg:hidden" />
            }
            <div className="flex flex-col gap-3 w-[90%]">
                <div className="w-[100%] flex justify-between min-lg:items-start">
                    <h3 className="font-[400] md:text-[18px] xl:text-[20px] w-[500px]">
                        {list.header}
                    </h3>
                    <p className="text-[#646767] max-min-lg:absolute right-2 md:right-6 whitespace-nowrap font-[400] text-[16px] md:text-[18px] xl:text-[20px]">
                        {formattedTime}
                    </p>
                </div>
                <div className="w-[100%] flex justify-between items-start">
                    <p className="font-[300] text-[#434545] md:text-[18px] xl:text-[20px] w-[500px]">
                        {list.message}
                    </p>
                    {
                        !list.hasRead && <div className="w-3 h-3 rounded-full bg-[#082B26] max-min-lg:hidden" />
                    }
                </div>
            </div>
        </li>
    )
}

export default MessageContent