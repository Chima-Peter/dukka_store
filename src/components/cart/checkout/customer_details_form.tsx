"use client"


import { useState } from "react"
import { CiCircleChevRight } from "react-icons/ci"
import { IoIosCheckmarkCircle } from "react-icons/io"
import PhoneInput from "react-phone-input-2"

const CustomerDetailsForm = () => {
    // state for controlling customer details form
    const [customerDetails, setCustomerDetails] = useState({
        first_name: '',
        last_name: '',
        phone_no: '',
        alt_phone_no: '',
        address: '',
        state: '',
        country: '',
        email: ''
    })

    // method to collect customer details form info
    const collectCustomerDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerDetails({ ...customerDetails, [event.target.name]: event.target.value })
    }    

    // method for handling phone change
    const handlePhoneChange = (value: string, name: string) => {
        setCustomerDetails({ ...customerDetails, [name]: value, });
      };



  return (
    <section className="w-[100%] flex flex-col border border-gray-400 rounded-lg">
        <div className="flex w-[100%] justify-between p-6 border-b border-gray-400">
            <div className="flex gap-4 items-center">
                <IoIosCheckmarkCircle className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
                <h1 className="text-lg min-lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide font-medium">
                    Customer Details
                </h1>
            </div>
            <CiCircleChevRight className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-gray-500" />
        </div>
        <form className="flex flex-col gap-6 w-[100%] p-6" noValidate>
            <div className="w-[100%] flex justify-between">
                <input type="text" onChange={collectCustomerDetails} value={customerDetails.first_name} name="first_name" id="first_name" className="w-[100%] sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500 focus:border-gray-700" placeholder="First name" autoFocus />
                <input type="text" onChange={collectCustomerDetails} value={customerDetails.last_name} name="last_name" id="last_name" className="w-[100%] focus:border-gray-700 sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Last name" />
            </div>
            <div className="w-[100%] flex justify-between flex-wrap gap-4">
                <label htmlFor="phone_no" className="w-[100%] sm:w-[48%]">
                    <PhoneInput
                    country={"ng"}
                    disableCountryCode={true}
                    value={customerDetails.phone_no}
                    onChange={(value) => handlePhoneChange(value, "phone_no")}
                    enableSearch={true}
                    placeholder="Phone number" 
                    disableSearchIcon={true}
                    inputProps={{
                        required: true,
                        id: "phone_no",
                        name: "phone_no",
                    }}
                    inputStyle={{
                        width: '100%', padding: '23px 50px', borderRadius: '6px', borderColor: '#ADB1B1'
                    }}
                    buttonStyle={{
                        borderRadius: '6px 0 0 6px', borderColor: '#ADB1B1'
                    }}
                    />
                </label>
                <label htmlFor="alt_phone_no" className="w-[100%] sm:w-[48%]">
                    <PhoneInput
                    country={"ng"}
                    value={customerDetails.alt_phone_no}
                    onChange={(value) => handlePhoneChange(value, "alt_phone_no")}
                    placeholder="Alternate phone number"
                    disableCountryCode={true}
                    enableSearch={true}
                    disableSearchIcon={true}
                    inputProps={{
                        required: true,
                        id: "alt_phone_no",
                        name: "alt_phone_no",
                    }}
                    inputStyle={{
                        width: '100%', padding: '23px 50px', borderRadius: '6px', borderColor: '#ADB1B1'
                    }}
                    buttonStyle={{
                        borderRadius: '6px 0 0 6px', borderColor: '#ADB1B1'
                    }}
                    />
                </label>
                </div>
            <label htmlFor="address" className="w-[100%] flex flex-col">
                <input type="text" onChange={collectCustomerDetails} value={customerDetails.address} name="address" id="address" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Address" />
                <p className="text-sm tracking-wider text-[#D70404] px-2 font-medium">
                    Add details of apartment, suites, e.t.c
                </p>
            </label>
            <div className="w-[100%] flex justify-between">
                <input type="text" onChange={collectCustomerDetails} value={customerDetails.state} name="state" id="state" className="w-[100%] sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500 focus:drop-shadow-md" placeholder="State" />
                <input type="text" onChange={collectCustomerDetails} value={customerDetails.country} name="country" id="country" className="w-[100%] focus:border-gray-700 sm:w-[48%] text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Country" />
            </div>
            <input type="email" onChange={collectCustomerDetails} value={customerDetails.email} name="email" id="email" className="w-[100%] focus:border-gray-700 text-[16px] xl:text-[18px] 2xl:text-[20px] py-3 px-4 rounded-md border-[1px] border-gray-400  placeholder:text-gray-500" placeholder="Email" />
        </form>
    </section>
  )
}

export default CustomerDetailsForm