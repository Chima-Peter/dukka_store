"use client"


import { useState } from "react"
import { CiCircleChevRight } from "react-icons/ci"
import { ImRadioChecked2 } from "react-icons/im"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { MdOutlineRadioButtonUnchecked, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import Image from "next/image"


const DeliveryDetailsForm = () => {

        // state for controlling customer details form
        const [deliveryDetails, setDeliveryDetails] = useState({
            first_name: '',
            last_name: '',
            method: 'door',
            address: '',
            state: '',
            city: '',
            postal_code: '',
            landmark: '',
            save: false
        })


    // method to collect delivery details form info
    const collectDeliveryDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryDetails({ ...deliveryDetails, [event.target.name]: event.target.value })
    }

    // method to toggle save for later
    const toggleSaveForLater = () => {
        setDeliveryDetails({ ...deliveryDetails, ['save']: !deliveryDetails.save })
    }
    
     // method to update delivery method
     const updateDeliveryMethod = (method: string) => {
        setDeliveryDetails({ ...deliveryDetails, ['method']: method })
    }
  return (
    <section className="w-[100%] flex flex-col border border-gray-400 rounded-lg">
        <div className="flex w-[100%] justify-between p-6 border-b border-gray-400">
                <div className="flex gap-4 items-center">
                    <IoIosCheckmarkCircle className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
                    <h1 className="text-lg min-lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide font-medium">
                        Delivery Details
                    </h1>
                </div>
                <CiCircleChevRight className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
            </div>
            <form className="flex flex-col gap-6 w-[100%] p-6" noValidate>
                <div className="flex w-[100% flex-col border border-gray-300 rounded-lg mb-2">
                    <div onClick={() => {updateDeliveryMethod("door")}} className={`w-[100%] flex justify-between items-center py-6 px-10 border-b border-b-gray-300 cursor-pointer rounded-t-lg ${deliveryDetails.method === "door" ? 'bg-[#FEEEDD]' : 'bg-white'}`}>
                        <div className="flex items-center gap-3">
                            {
                                (deliveryDetails.method === "door") ? <ImRadioChecked2 className="w-5 h-5 min-lg:w-7 min-lg:h-7 xl:w-10 xl:h-10" /> : <MdOutlineRadioButtonUnchecked className="w-6 h-6 min-lg:w-8 min-lg:h-8 xl:w-11 xl:h-11" />
                            }
                            <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                                Door Delivery
                            </p>
                        </div>
                        <Image width={44} height={44} src="/images/cart/door_delivery.svg" alt="Delivery to your door" />
                    </div>

                    <div onClick={() => {updateDeliveryMethod("pickup")}} className={`w-[100%] flex justify-between items-center py-6 px-10 rounded-b-lg cursor-pointer ${deliveryDetails.method === "pickup" ? 'bg-[#FEEEDD]' : 'bg-white'}`}>
                        <div  className="flex items-center gap-3">
                            {
                                (deliveryDetails.method === "pickup") ? <ImRadioChecked2 className="w-5 h-5 min-lg:w-7 min-lg:h-7 xl:w-10 xl:h-10" /> : <MdOutlineRadioButtonUnchecked className="w-6 h-6 min-lg:w-8 min-lg:h-8 xl:w-11 xl:h-11" />
                            }
                            <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black font-[400] tracking-wide">
                                Pickup
                            </p>
                        </div>
                        <Image width={44} height={44} src="/images/cart/pickup.svg" alt="Pickup at any of our stations" />
                    </div>
                </div>
                <div className="w-[100%] flex justify-between">
                    <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.first_name} name="first_name" id="first_name" className="w-[100%] sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500 focus:border-gray-700" placeholder="First name" autoFocus />
                    <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.last_name} name="last_name" id="last_name" className="w-[100%] focus:border-gray-700 sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Last name" />
                </div>
                <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.address} name="address" id="address" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Address" />
                <div className="w-[100%] flex justify-between">
                    <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.city} name="city" id="city" className="w-[100%] focus:border-gray-700 sm:w-[30%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="City" />
                    <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.state} name="state" id="state" className="w-[100%] sm:w-[30%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500 focus:drop-shadow-md" placeholder="State" />
                    <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.postal_code} name="postal" id="postal" className="w-[100%] focus:border-gray-700 sm:w-[30%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Postal code" />
                </div>
                <input type="text" onChange={collectDeliveryDetails} value={deliveryDetails.landmark} name="landmark" id="landmark" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Landmark (optional)" />
                <div className="flex  items-center gap-2 mt-2 cursor-pointer w-fit" onClick={toggleSaveForLater}>
                    {
                        deliveryDetails.save ? <MdCheckBox className="w-4 h-4 xl:w-6 xl:h-6 cursor-pointer" /> : <MdCheckBoxOutlineBlank className="w-4 h-4 xl:w-6 xl:h-6 cursor-pointer" />
                    }
                    <p className="text-[13px] min-lg:text-[15px] xl:text-[17px] font-normal">
                        Save for later
                    </p>
                </div>
            </form>
        </section>
  )
}

export default DeliveryDetailsForm