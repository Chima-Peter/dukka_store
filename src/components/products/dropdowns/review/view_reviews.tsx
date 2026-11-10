"use client";

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

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-white w-[90%] max-w-[640px] max-h-[80vh] overflow-y-auto rounded-xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    <button onClick={() => setViewReview(false)}>
                        <MdOutlineCancel className="w-7 h-7" />
                    </button>
                </div>
                <button
                    className="w-fit px-5 py-2 text-white rounded-md bg-[#FEB100]"
                    onClick={() => {
                        setViewReview(false);
                        setWriteReview(true);
                    }}
                    disabled={!marketVariantId}
                >
                    Write a review
                </button>
                {isLoading && <DukkaLoader variant="inline" label="Loading reviews" />}
                {!isLoading && reviewList.length === 0 && (
                    <p className="text-sm text-gray-600">No reviews yet.</p>
                )}
                {reviewList.map((review) => (
                    <div
                        key={review.id}
                        className="border border-[#ADB1B1] rounded-lg p-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <IoIosStar
                                        key={index}
                                        className={`w-5 h-5 ${index < review.rating ? "text-[#FFA500]" : "text-[#888B8B]"}`}
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
                            <h3 className="font-semibold">{review.title}</h3>
                        )}
                        <p>{review.review}</p>
                        {(review.likes != null || review.dislikes != null) && (
                            <p className="text-sm text-[#888B8B]">
                                Likes: {review.likes ?? 0} · Dislikes:{" "}
                                {review.dislikes ?? 0}
                            </p>
                        )}
                        {!!review.review_images?.length && (
                            <div className="flex gap-2 flex-wrap">
                                {review.review_images.map((image) => (
                                    <ProductImage
                                        key={image.id}
                                        src={image.image_url}
                                        alt={review.title}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ViewReviews;
