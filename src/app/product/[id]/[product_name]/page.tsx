"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useGetProductQuery } from "@/redux/services/catalog_api";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ReviewDropdown from "@/components/products/dropdowns/review/review_dropdown";
import ProductImage, { PRODUCT_FALLBACK_IMAGE } from "@/components/ui/product_image";
import { useActiveMarketId } from "@/hooks/use_active_market_id";

const ProductPage = () => {
    const params = useParams<{ id: string; product_name: string }>();
    const marketId = useActiveMarketId();
    const { data, isLoading, error } = useGetProductQuery(
        { id: params.id, market_id: marketId! },
        { skip: !params.id || !marketId },
    );
    const { addItem } = useCartActions();
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

    const selectedVariant = useMemo(() => {
        if (!data?.variants?.length) return null;
        return (
            data.variants.find((variant) => variant.id === selectedVariantId) ||
            data.variants[0]
        );
    }, [data, selectedVariantId]);

    const images = data?.images?.length
        ? data.images
        : selectedVariant?.image_url
          ? [{ id: "variant", image_url: selectedVariant.image_url, sort_order: 0 }]
          : [{ id: "fallback", image_url: PRODUCT_FALLBACK_IMAGE, sort_order: 0 }];

    const onAdd = async () => {
        if (!selectedVariant?.market_variant_id) {
            setMessage("This product is unavailable in your market.");
            return;
        }
        setBusy(true);
        setMessage("");
        try {
            await addItem(selectedVariant.market_variant_id, 1);
            setMessage("Added to cart");
        } catch {
            setMessage("Could not add to cart");
        } finally {
            setBusy(false);
        }
    };

    const specEntries = Object.entries(data?.specs ?? {}).filter(
        ([, value]) => value !== null && value !== undefined && value !== "",
    );

    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 pb-16">
            {!marketId && <p>Resolving your market...</p>}
            {isLoading && <p>Loading product...</p>}
            {error && <p className="text-red-600">Product not found.</p>}
            {data && (
                <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <div className="bg-[#F0F0F0] rounded-xl flex items-center justify-center p-6">
                            <ProductImage
                                src={images[0].image_url}
                                alt={data.name}
                                width={420}
                                height={420}
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="bg-[#F0F0F0] rounded-lg p-2 flex-shrink-0"
                                    >
                                        <ProductImage
                                            src={image.image_url}
                                            alt={data.name}
                                            width={72}
                                            height={72}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <p className="text-sm text-[#0D523F]">{data.category_name}</p>
                        <h1 className="text-3xl md:text-4xl font-semibold text-[#0D523F]">
                            {data.name}
                        </h1>
                        <p className="text-2xl font-bold">
                            {formatMoney(
                                selectedVariant?.price,
                                selectedVariant?.currency,
                            )}
                        </p>
                        {selectedVariant?.promotion && (
                            <p className="text-sm text-[#0D523F]">
                                Promotion:{" "}
                                {formatMoney(
                                    selectedVariant.promotion.amount,
                                    selectedVariant.currency,
                                )}
                            </p>
                        )}
                        {data.description && (
                            <p className="text-base text-gray-700 leading-relaxed">
                                {data.description}
                            </p>
                        )}
                        {data.variants.length > 1 && (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-gray-700">Variants</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.variants.map((variant) => {
                                        const label = [
                                            variant.color,
                                            variant.size,
                                            variant.variant_code,
                                        ]
                                            .filter(Boolean)
                                            .join(" / ");
                                        const active =
                                            (selectedVariant?.id ?? data.variants[0].id) ===
                                            variant.id;
                                        return (
                                            <button
                                                key={variant.id}
                                                type="button"
                                                onClick={() => setSelectedVariantId(variant.id)}
                                                className={`rounded-md border px-3 py-2 text-sm ${
                                                    active
                                                        ? "border-[#0D523F] bg-[#0D523F] text-white"
                                                        : "border-gray-300 bg-white"
                                                }`}
                                            >
                                                {label || variant.id.slice(0, 8)}
                                                {variant.sold_out ? " (sold out)" : ""}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {specEntries.length > 0 && (
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-gray-700">Specs</p>
                                {specEntries.map(([key, value]) => (
                                    <p key={key} className="text-sm text-gray-600">
                                        {key}:{" "}
                                        {typeof value === "string" || typeof value === "number"
                                            ? value
                                            : JSON.stringify(value)}
                                    </p>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={onAdd}
                            disabled={busy || !!selectedVariant?.sold_out}
                            className="mt-4 w-fit rounded-lg bg-[#FEB100] border border-[#FEB100] px-8 py-3 font-medium disabled:opacity-50"
                        >
                            {selectedVariant?.sold_out
                                ? "Sold out"
                                : busy
                                  ? "Adding..."
                                  : "Add to cart"}
                        </button>
                        {message && <p className="text-sm text-gray-600">{message}</p>}
                        <div className="mt-8 relative min-h-[180px]">
                            <h2 className="text-xl font-semibold mb-3 text-[#0D523F]">
                                Reviews
                            </h2>
                            <ReviewDropdown
                                marketVariantId={selectedVariant?.market_variant_id}
                            />
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductPage;
