"use client"

import { useState } from "react"
import { CiCircleChevRight } from "react-icons/ci"
import { IoIosCheckmarkCircle } from "react-icons/io"
import getCardType from "@/utils/detect_card_type"
import Image from "next/image"


const CardDetailsForm = () => {
    // state for controlling card details form
    const [cardDetails, setCardDetails] = useState({
        card_no: '',
        name: '',
        expiry_date: '',
        cvv: ''
    })

    // for changing icon based on card type
    const [cardType, setCardType] = useState('')

    // method to collect card details form info
    const collectCardDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardDetails({ ...cardDetails, [event.target.name]: event.target.value })
    }   
    
    // detect card type and update state
    const collectCardNumber =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardType(getCardType(event.target.value))
        setCardDetails({ ...cardDetails, [event.target.name]: event.target.value })
    }   


  return (
    <section className="w-[100%] flex flex-col border border-gray-400 rounded-lg">
        <div className="flex w-[100%] justify-between p-6 border-b border-gray-400">
            <div className="flex gap-4 items-center">
                <IoIosCheckmarkCircle className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
                <h1 className="text-lg min-lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide font-medium">
                    Card Details
                </h1>
            </div>
            <CiCircleChevRight className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
        </div>
        <form className="flex flex-col gap-6 w-[100%] p-6" noValidate>
            <label htmlFor="card_no" className="w-[100%] relative">
                <input type="number" autoFocus onChange={collectCardNumber} value={cardDetails.card_no} name="card_no" id="card_no" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Card Number" />
                {
                    cardType === "Visa" && <Image width={32} height={24} src="/images/navigation/visa_card_icon.svg" alt="Visa card" className="w-10 aspect-square min-lg:w-fit absolute right-2 top-1" /> 
                }
                {
                    cardType === "Mastercard" && <Image width={32} height={24} src="/images/navigation/mastercard_icon.svg" alt="Mastercard" className="w-10 aspect-square min-lg:w-fit absolute right-2 top-1" />
                }
            </label>
            <input type="text" onChange={collectCardNumber} value={cardDetails.name} name="name" id="name" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Name on card" />
            <div className="w-[100%] flex justify-between">
                <input type="date" onChange={collectCardDetails} value={cardDetails.expiry_date} name="expiry_date" id="expiry_date" className="w-[100%] sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500 focus:border-gray-700" placeholder="Expiry date" autoFocus />
                <input type="number" onChange={collectCardDetails} value={cardDetails.cvv} name="cvv" id="cvv" className="w-[100%] focus:border-gray-700 sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400   placeholder:text-gray-500" placeholder="CVV" />
            </div>
        </form>
    </section>
  )
}

export default CardDetailsForm