"use client";

import { useState } from "react";
import { DetailsType } from "../../../types/cart_type";
import SingleProductSmall from "@/components/products/single_product/small";
import Pagination from "@/components/ui/pagination";
import BackButton from "@/components/ui/back_button";

const FavoriteSmall = () => {
    const details: DetailsType[] = [];
    const [page, setPage] = useState<number>(1);
    const pageIndex = page * 10 - 10;
    const displayList = details.slice(pageIndex, pageIndex + 10);

    return (
        <main className="flex flex-col w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-8 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 py-4 flex  justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Favorite
                    </h1>
                    <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        {details.length} items
                    </p>
                </section>
                <section className="bg-white px-4 sm:px-6 md:px-8 flex w-[100%] flex-wrap gap-y-4 justify-between">
                    {displayList.length === 0 ? (
                        <p className="text-sm text-gray-600 py-6">
                            No favorites yet. Favorites will appear here once that feature is
                            connected.
                        </p>
                    ) : (
                        displayList.map((detail, index) => (
                            <SingleProductSmall
                                key={`${detail.title}-${index}`}
                                title={detail.title}
                                image={detail.image}
                                price={detail.price}
                                profile
                                market_variant_id={detail.market_variant_id}
                                id={detail.id}
                            />
                        ))
                    )}
                </section>
                {details.length > 0 && (
                    <Pagination
                        itemsPerPage={10}
                        totalItems={details.length}
                        onPageChange={setPage}
                    />
                )}
            </section>
        </main>
    );
};

export default FavoriteSmall;
