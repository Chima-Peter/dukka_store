"use client"

import {useRouter} from 'next/navigation'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = () => {
    const router = useRouter()

    return (
        <button onClick={() => router.back()}  className="h-fit w-fit">
            <BsArrowLeft className="cursor-pointer w-[38px] h-[25px] md:w-[50px] md:h-[30px]" />
        </button>
    )
}

export default BackButton