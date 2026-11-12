"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

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

    const close = () => setWriteReview(false);

    if (!mounted) return null;

    return createPortal(
        <section
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dukka-ink/45 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
        >
            <button
                type="button"
                aria-label="Close write review"
                className="absolute inset-0 cursor-default"
                onClick={close}
            />
            <div className="relative z-10 flex max-h-[90vh] w-full max-w-[640px] flex-col gap-6 overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(3,24,21,0.2)] font-urbanist">
                <div className="flex w-full items-center justify-between">
                    <h4
                        id="write-review-title"
                        className="text-[20px] font-semibold tracking-tight text-dukka-ink xl:text-[22px]"
                    >
                        Write a review
                    </h4>
                    <button type="button" onClick={close} aria-label="Close">
                        <MdOutlineCancel className="h-[30px] w-[30px] text-[#75716F]" />
                    </button>
                </div>

                <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dukka-line bg-dukka-soft">
                        <GoPerson className="h-7 w-7 text-dukka-forest" />
                    </div>
                    <div className="flex flex-col gap-0">
                        <h4 className="text-[18px] font-semibold text-dukka-ink xl:text-[20px]">
                            {me?.name || "Customer"}
                        </h4>
                        <div className="mt-4 flex gap-2">
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
                                    aria-label={`Rate ${index + 1} stars`}
                                >
                                    <IoIosStar
                                        className={`h-[26px] w-[26px] ${
                                            index + 1 <= reviewFormData.star
                                                ? "text-dukka-amber"
                                                : "text-[#888B8B]"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
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
                        className="w-full rounded-xl border border-dukka-line p-4 outline-none transition-colors focus:border-dukka-forest"
                    />
                    <textarea
                        name="review"
                        id="review"
                        className="w-full rounded-xl border border-dukka-line p-4 text-[16px] outline-none transition-colors placeholder:text-[#888B8B] focus:border-dukka-forest xl:text-[18px]"
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
                        className={`self-end rounded-full px-8 py-2.5 text-[16px] font-semibold xl:text-[18px] ${
                            disableSubmit || isLoading
                                ? "bg-[#888B8B] text-white"
                                : "bg-dukka-amber text-dukka-ink hover:bg-dukka-forest hover:text-white"
                        }`}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </section>,
        document.body,
    );
};

export default WriteReview;
