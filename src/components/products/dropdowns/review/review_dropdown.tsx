"use client"

import { useState } from "react"
import WriteReview from "./write_review"
import { IoIosStar } from "react-icons/io"
import ViewReviews from "./view_reviews"

const ReviewDropdown = () => {
    // state to open or close write review modal
    const [writeReview, setWriteReview] = useState(false)

    // state to open or close view review modal
    const [viewReview, setViewReview] = useState(false)



    const openWriteReviewModal = () => {
        setWriteReview(true)
    }

    const openViewReviewModal = () => {
        setViewReview(true)
    }

    return (
        <div className={`w-[100%] bg-white flex flex-col gap-4 py-5 px-4 justify-between rounded-md drop-shadow-md  top-[50px] z-20 left-0 font-NotoSans ${(writeReview || viewReview) ? 'static' : 'absolute'}`}>
            <button className="w-fit h-hit px-5 py-2 text-white rounded-md bg-[#FEB100] font-[400] text-[16px] xl:text-[18px]" onClick={openWriteReviewModal}>
                Write a review
            </button>
            <div className="flex flex-col gap-4 w-[100%] rounded-lg p-4 border border-[#ADB1B1]">
                <div className="w-[100%] flex justify-between items-center">
                    <div className="flex gap-0">
                        {Array.from({ length: 5 }, (_, index) => (
                            <IoIosStar key={index} className="text-[#FFA500] w-[26px] h-[26px]" />
                        ))}
                    </div>
                    <p className="text-[16px] xl:text-[18px] font-semibold text-[#888B8B] tracking-wide">
                        Habeeb March 27,2024.
                    </p>
                </div>
                <p className="text-[16px] xl:text-[18px] font-semibold tracking-wider text-left">
                    It is super dry and crunchy. It slaps beyond recognition.
                </p>
            </div>
            <button className="font-urbanist text-[16px] xl:text-[18px] text-[#0D523F] font-[400] border-b-2 border-b-[#0D523F] rounded-md w-fit px-4 py-1" onClick={openViewReviewModal}>
                View more reviews
            </button>
            {
                writeReview && <WriteReview setWriteReview={setWriteReview} />
            }
            {
                viewReview && <ViewReviews setWriteReview={setWriteReview} setViewReview={setViewReview} />
            }
        </div>        
    )
}

export default ReviewDropdown