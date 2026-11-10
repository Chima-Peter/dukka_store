"use client";

import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useCreateReviewMutation } from "@/redux/services/reviews_api";
import { useGetMeQuery } from "@/redux/services/customer_api";

const WriteReview = ({
    setWriteReview,
    marketVariantId,
}: {
    setWriteReview: React.Dispatch<React.SetStateAction<boolean>>;
    marketVariantId?: string | null;
}) => {
    const { data: me } = useGetMeQuery();
    const [createReview, { isLoading }] = useCreateReviewMutation();
    const [reviewFormData, setReviewFormData] = useState<{
        star: number;
        review: string;
        title: string;
    }>({
        review: "",
        title: "",
        star: 0,
    });
    const [error, setError] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(() => {
        setDisableSubmit(
            !(
                reviewFormData.review.length > 0 &&
                reviewFormData.title.length > 0 &&
                reviewFormData.star > 0 &&
                marketVariantId
            ),
        );
    }, [reviewFormData, marketVariantId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!marketVariantId) return;
        setError("");
        try {
            await createReview({
                market_variant_id: marketVariantId,
                title: reviewFormData.title,
                review: reviewFormData.review,
                rating: reviewFormData.star,
            }).unwrap();
            setWriteReview(false);
        } catch (err) {
            const message =
                (err as { data?: { message?: string } })?.data?.message ||
                "Unable to post review. Please sign in and try again.";
            setError(message);
        }
    };

    return (
        <section className="min-h-[100vh] backdrop-brightness-50 w-[100%] z-40 fixed backdrop-blur-sm left-0 top-0 flex items-center justify-center">
            <div className="w-[90%] sm:w-[500px] md:w-[600px] min-lg:w-[700px] text-black z-50 flex flex-col gap-8 h-fit rounded-md drop-shadow-md p-6 bg-white">
                <div className="w-[100%] flex justify-between">
                    <h4 className="font-[500] text-[20px] xl:text-[22px]">
                        Write a review
                    </h4>
                    <button onClick={() => setWriteReview(false)}>
                        <MdOutlineCancel className="w-[30px] h-[30px] text-[#75716F]" />
                    </button>
                </div>

                <div className="flex gap-5 items-start">
                    <div className="w-16 h-16 flex items-center justify-center border rounded-full border-[#888B8B]">
                        <GoPerson className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-0">
                        <h4 className="font-[500] text-[20px] xl:text-[22px]">
                            {me?.name || "Customer"}
                        </h4>
                        <div className="flex gap-2 mt-5">
                            {Array.from({ length: 5 }, (_, index: number) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setReviewFormData({
                                            ...reviewFormData,
                                            star: index + 1,
                                        })
                                    }
                                >
                                    <IoIosStar
                                        className={`w-[26px] h-[26px] ${index + 1 <= reviewFormData.star ? "text-[#FEB100]" : "text-[#888B8B]"}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <form className="w-[100%] flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={reviewFormData.title}
                        onChange={(event) =>
                            setReviewFormData({
                                ...reviewFormData,
                                title: event.target.value,
                            })
                        }
                        placeholder="Review title"
                        className="w-[100%] border-[1.5px] border-[#888B8B] p-4 rounded-lg"
                    />
                    <textarea
                        name="review"
                        id="review"
                        className="w-[100%] border-[1.5px] border-[#888B8B] placeholder:text-[#888B8B] p-4 rounded-lg text-[16px] xl:text-[18px]"
                        placeholder="Your feedback helps others decide to buy or not"
                        cols={10}
                        rows={5}
                        value={reviewFormData.review}
                        onChange={(event) =>
                            setReviewFormData({
                                ...reviewFormData,
                                review: event.target.value,
                            })
                        }
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={disableSubmit || isLoading}
                        className={`text-black px-10 py-2 rounded-md text-[18px] xl:text-[20px] font-[400] ${disableSubmit || isLoading ? "bg-[#888B8B]" : "bg-[#FEB100]"} self-end`}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default WriteReview;
