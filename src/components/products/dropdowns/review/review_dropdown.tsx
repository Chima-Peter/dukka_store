"use client";

import { useState } from "react";
import WriteReview from "./write_review";
import { IoIosStar } from "react-icons/io";
import ViewReviews from "./view_reviews";
import { useGetReviewsQuery } from "@/redux/services/reviews_api";
import DukkaLoader from "@/components/ui/dukka_loader";

const ReviewDropdown = ({
    marketVariantId,
}: {
    marketVariantId?: string | null;
}) => {
    const [writeReview, setWriteReview] = useState(false);
    const [viewReview, setViewReview] = useState(false);
    const { data, isLoading } = useGetReviewsQuery(
        { market_variant_id: marketVariantId!, limit: 5 },
        { skip: !marketVariantId },
    );
    const reviews = data?.items ?? [];
    const latest = reviews[0];

    return (
        <div
            className={`w-[100%] bg-white flex flex-col gap-4 py-5 px-4 justify-between rounded-md drop-shadow-md top-[50px] z-20 left-0 font-NotoSans ${writeReview || viewReview ? "static" : "absolute"}`}
        >
            <button
                className="w-fit h-hit px-5 py-2 text-white rounded-md bg-[#FEB100] font-[400] text-[16px] xl:text-[18px] disabled:opacity-50"
                onClick={() => setWriteReview(true)}
                disabled={!marketVariantId}
            >
                Write a review
            </button>
            {isLoading && <DukkaLoader variant="inline" label="Loading reviews" />}
            {!isLoading && !latest && (
                <p className="text-[16px] text-gray-600">No reviews yet.</p>
            )}
            {latest && (
                <div className="flex flex-col gap-4 w-[100%] rounded-lg p-4 border border-[#ADB1B1]">
                    <div className="w-[100%] flex justify-between items-center">
                        <div className="flex gap-0">
                            {Array.from({ length: 5 }, (_, index) => (
                                <IoIosStar
                                    key={index}
                                    className={`w-[26px] h-[26px] ${index < latest.rating ? "text-[#FFA500]" : "text-[#888B8B]"}`}
                                />
                            ))}
                        </div>
                        <p className="text-[16px] xl:text-[18px] font-semibold text-[#888B8B] tracking-wide">
                            {latest.customer_name || "Customer"}
                            {latest.created_at
                                ? ` ${new Date(latest.created_at).toLocaleDateString()}`
                                : ""}
                        </p>
                    </div>
                    <p className="text-[16px] xl:text-[18px] font-semibold tracking-wider text-left">
                        {latest.review || latest.title}
                    </p>
                </div>
            )}
            {reviews.length > 0 && (
                <button
                    className="font-urbanist text-[16px] xl:text-[18px] text-[#0D523F] font-[400] border-b-2 border-b-[#0D523F] rounded-md w-fit px-4 py-1"
                    onClick={() => setViewReview(true)}
                >
                    View more reviews
                </button>
            )}
            {writeReview && (
                <WriteReview
                    setWriteReview={setWriteReview}
                    marketVariantId={marketVariantId}
                />
            )}
            {viewReview && (
                <ViewReviews
                    setWriteReview={setWriteReview}
                    setViewReview={setViewReview}
                    marketVariantId={marketVariantId}
                />
            )}
        </div>
    );
};

export default ReviewDropdown;
