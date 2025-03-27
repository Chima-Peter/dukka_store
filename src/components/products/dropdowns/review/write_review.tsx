"use client"


import React, { useEffect, useState } from "react"
import { GoPerson } from "react-icons/go"
import { IoIosStar } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"


const WriteReview = ({ setWriteReview }: { setWriteReview: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [reviewFormData, setReviewFormData] = useState<{ star: number, review: string }>({
        review: "",
        star: 0
    })

    const [disableSubmit, setDisableSubmit] = useState(true)

    const closeWriteReviewModal = () => {
        setWriteReview(false)
    }

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewFormData({ ...reviewFormData, review: event.target.value })
    }

    // enable submit only if user enters a review
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (reviewFormData.review.length > 0) ? setDisableSubmit(false) : setDisableSubmit(true)
    }, [reviewFormData.review])

    const collectStars = (value: number) => {
        setReviewFormData({ ...reviewFormData, star: value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setReviewFormData({
            review: "",
            star: 0
        })
        setWriteReview(false)
    }



    return (
        <section className="min-h-[100vh] backdrop-brightness-50 w-[100%] z-40 fixed backdrop-blur-sm left-0 top-0 flex items-center justify-center">
            <div className="w-[90%] sm:w-[500px] md:w-[600px] min-lg:w-[700px] text-black z-50 flex flex-col gap-8 h-fit rounded-md drop-shadow-md p-6 bg-white">
                <div className="w-[100%] flex justify-between">
                    <h4 className="font-[500] text-[20px] xl:text-[22px]">
                        Write a review
                    </h4>
                    <button onClick={closeWriteReviewModal}>
                        <MdOutlineCancel className="w-[30px] h-[30px] text-[#75716F]" />
                    </button>
                </div>

                <div className="flex gap-5 items-start">
                    <div className="w-16 h-16 flex items-center justify-center border rounded-full border-[#888B8B]">
                        <GoPerson className="w-7 h-7 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12" />
                    </div>
                    <div className="flex flex-col gap-0">
                        <h4 className="font-[500] text-[20px] xl:text-[22px]">
                            Esther Jones
                        </h4>
                        <p className="text-[#888B8B] text-[16px] xl:text-[18px] font-[500] tracking-wider">
                            March 27, 2024.
                        </p>
                        <div className="flex gap-2 mt-5">
                            {Array.from({ length: 5 }, (_, index: number) => (
                                <button key={index} onClick={() => collectStars(index + 1)}>
                                    <IoIosStar  className={`w-[26px] h-[26px] ${index + 1 <= reviewFormData.star ? 'text-[#FEB100]' : 'text-[#888B8B]'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <form className="w-[100%] flex flex-col gap-4" onSubmit={handleSubmit}>
                    <textarea name="review" id="review" className="w-[100%] border-[1.5px] border-[#888B8B] placeholder:text-[#888B8B] p-4 rounded-lg text-[16px] xl:text-[18px]" placeholder="Your feedback helps others decide to buy or not" cols={10} rows={5} onChange={handleReviewChange} />
                    <button type="submit" disabled={disableSubmit} className={`text-black px-10 py-2 rounded-md text-[18px] xl:text-[20px] font-[400] ${disableSubmit ? 'bg-[#888B8B]' : 'bg-[#FEB100]'} self-end`}>
                        Post
                    </button>
                </form>
            </div>
        </section>
    )
}

export default WriteReview