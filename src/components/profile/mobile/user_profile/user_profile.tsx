"use client"


import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import { GoPerson } from "react-icons/go"
import ProfileInput from "./profile_input"
import React, { useState } from "react"
import { isAlpha, isEmpty, isMobilePhone, isStrongPassword } from "validator"


const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({
        firstname: "",
        lastname: "",
        password: "",
        mobile: "",
        alt_mobile: "",
        address: "",
        state: "",
        country: ""
    })

    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const collectInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
    }

    const checkUserDetails = () => {
    
        if (isEmpty(userDetails.firstname) || !isAlpha(userDetails.firstname)) return setIsDisabled(true)
        if (isEmpty(userDetails.lastname) || !isAlpha(userDetails.lastname)) return setIsDisabled(true)
        if (isEmpty(userDetails.password) || !isStrongPassword(userDetails.password)) return setIsDisabled(true)
        if (isEmpty(userDetails.address)) return setIsDisabled(true)
        if (isEmpty(userDetails.mobile) || !isMobilePhone(userDetails.mobile)) return setIsDisabled(true)
        if (userDetails.alt_mobile && !isMobilePhone(userDetails.alt_mobile)) return setIsDisabled(true)
        if (isEmpty(userDetails.state) || !isAlpha(userDetails.state)) return setIsDisabled(true)
        if (isEmpty(userDetails.country) || !isAlpha(userDetails.country)) return setIsDisabled(true)
    
        setIsDisabled(false); // Enable only if all checks pass
    };
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        // dispatch to redux
    }


    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <Link href={'/profile'}  className="h-fit w-fit">
                        <BsArrowLeft className="cursor-pointer w-[38px] h-[25px] md:w-[50px] md:h-[30px]" />
                    </Link>
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        User profile
                    </h1>
                    <p className="tracking-wide font-[400] text-[#646767] text-[0.1px]">
                        null
                    </p>
                </section>

                <div className={`flex w-[94%] h-[100px] rounded-lg self-center gap-6 p-6 border border-[#ADB1B1] bg-[#FFEDE3] items-center`}>
                    <div className={`w-20 h-20 bg-white flex items-center justify-center border border-white rounded-full relative`} >
                        <GoPerson className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-3 items-center">
                            <h1 className="text-[18px] md:text-[20px] font-[500]">
                                Esther Jones
                            </h1>
                        </div>
                        <p className="text-[14px] md:[16px] font-[300] tracking-wide font-mobile-nav">
                            esther@gmail.com
                        </p>
                    </div>
                </div>

                <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col gap-4 w-[100%]">
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="firstname" placeholder="First name" type="text" value={userDetails.firstname} autoComplete="given-name"  />
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="lastname" placeholder="Last name" type="text" value={userDetails.lastname} autoComplete="family-name" />
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="password" placeholder="Password" type="password" value={userDetails.password} autoComplete="new-password" />
                    </div>

                    <div className="flex flex-col gap-4 w-[100%]">
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="mobile" placeholder="Phone number" type="number" value={userDetails.mobile} autoComplete="tel" />
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="alt_mobile" placeholder="Alternate phone number" type="number" value={userDetails.alt_mobile} autoComplete="tel" />
                    </div>

                    <div className="flex flex-col gap-4 w-[100%]">
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="address" placeholder="Address" type="text" value={userDetails.address} autoComplete="address-level1" />
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="state" placeholder="State" type="text" value={userDetails.state} autoComplete="" />
                        <ProfileInput onBlur={checkUserDetails} collectInput={collectInput} name="country" placeholder="Country" type="text" value={userDetails.country} autoComplete="country-name" />
                    </div>
                    <button type="submit" className={`w-[100%] py-3 text-center bg-[#FFEDE3]`} disabled={isDisabled}>
                        Save
                    </button>
                </form>
            </section>
        </main>
    )
}

export default UserProfile