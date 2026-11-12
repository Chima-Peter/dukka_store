"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosStar } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useGetReviewsQuery } from "@/redux/services/reviews_api";
import ProductImage from "@/components/ui/product_image";
import DukkaLoader from "@/components/ui/dukka_loader";

interface ViewReviewsTypes {
    setWriteReview: React.Dispatch<React.SetStateAction<boolean>>;
    setViewReview: React.Dispatch<React.SetStateAction<boolean>>;
    marketVariantId?: string | null;
}

const ViewReviews = ({
    setWriteReview,
    setViewReview,
    marketVariantId,
}: ViewReviewsTypes) => {
    const { data, isLoading } = useGetReviewsQuery(
        { market_variant_id: marketVariantId!, limit: 50 },
        { skip: !marketVariantId },
    );
    const reviewList = data?.items ?? [];
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    const close = () => setViewReview(false);

    if (!mounted) return null;

    return createPortal(
        <section
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dukka-ink/45 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-reviews-title"
        >
            <button
                type="button"
                aria-label="Close reviews"
                className="absolute inset-0 cursor-default"
                onClick={close}
            />
            <div className="relative z-10 flex max-h-[80vh] w-full max-w-[640px] flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(3,24,21,0.2)] font-urbanist">
                <div className="flex items-center justify-between">
                    <h2
                        id="view-reviews-title"
                        className="text-xl font-semibold tracking-tight text-dukka-ink"
                    >
                        Reviews
                    </h2>
                    <button type="button" onClick={close} aria-label="Close">
                        <MdOutlineCancel className="h-7 w-7 text-[#75716F]" />
                    </button>
                </div>
                <button
                    type="button"
                    className="w-fit rounded-full bg-dukka-amber px-5 py-2 text-[14px] font-semibold text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white disabled:opacity-50"
                    onClick={() => {
                        setViewReview(false);
                        setWriteReview(true);
                    }}
                    disabled={!marketVariantId}
                >
                    Write a review
                </button>
                {isLoading && (
                    <DukkaLoader variant="inline" label="Loading reviews" />
                )}
                {!isLoading && reviewList.length === 0 && (
                    <p className="text-sm text-dukka-muted">No reviews yet.</p>
                )}
                {reviewList.map((review) => (
                    <div
                        key={review.id}
                        className="flex flex-col gap-2 rounded-xl border border-dukka-line p-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <IoIosStar
                                        key={index}
                                        className={`h-5 w-5 ${
                                            index < review.rating
                                                ? "text-[#FFA500]"
                                                : "text-[#888B8B]"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-[#888B8B]">
                                {review.customer_name || "Customer"}
                                {review.created_at
                                    ? ` ${new Date(review.created_at).toLocaleDateString()}`
                                    : ""}
                            </p>
                        </div>
                        {review.title && (
                            <h3 className="font-semibold text-dukka-ink">
                                {review.title}
                            </h3>
                        )}
                        <p className="text-dukka-muted">{review.review}</p>
                        {review.image_url && (
                            <div className="flex flex-wrap gap-2">
                                <ProductImage
                                    src={review.image_url}
                                    alt={review.title}
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-md object-cover"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>,
        document.body,
    );
};

export default ViewReviews;
