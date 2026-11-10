"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGetProductQuery } from "@/redux/services/catalog_api";
import { useCartActions } from "@/hooks/use_cart_actions";
import { formatMoney } from "@/utils/format_money";
import ReviewDropdown from "@/components/products/dropdowns/review/review_dropdown";
import ProductImage, { PRODUCT_FALLBACK_IMAGE } from "@/components/ui/product_image";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import DukkaLoader from "@/components/ui/dukka_loader";

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
    const [activeImage, setActiveImage] = useState(0);

    const selectedVariant = useMemo(() => {
        if (!data?.variants?.length) return null;
        return (
            data.variants.find((variant) => variant.id === selectedVariantId) ||
            data.variants[0]
        );
    }, [data, selectedVariantId]);

    const images = useMemo(() => {
        if (data?.images?.length) return data.images;
        if (selectedVariant?.image_url) {
            return [
                {
                    id: "variant",
                    image_url: selectedVariant.image_url,
                    sort_order: 0,
                },
            ];
        }
        return [
            {
                id: "fallback",
                image_url: PRODUCT_FALLBACK_IMAGE,
                sort_order: 0,
            },
        ];
    }, [data?.images, selectedVariant?.image_url]);

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
        <main className="w-full bg-[#F0F0F0] pb-16 pt-[120px] font-urbanist sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <div className="border-b border-[#E4E7E7] bg-white px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B7373]">
                    <Link href="/" className="hover:text-[#0D523F]">
                        Home
                    </Link>
                    <span>/</span>
                    {data?.category_name && (
                        <>
                            <Link
                                href={`/category/${encodeURIComponent(data.category_name)}`}
                                className="hover:text-[#0D523F]"
                            >
                                {data.category_name}
                            </Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="max-w-[40ch] truncate text-[#0D523F]">
                        {data?.name || "Product"}
                    </span>
                </nav>
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                {!marketId && <DukkaLoader label="Finding your market" />}
                {isLoading && <DukkaLoader label="Loading product" />}
                {error && (
                    <p className="text-sm text-red-600">Product not found.</p>
                )}

                {data && (
                    <motion.section
                        className="grid grid-cols-1 gap-8 bg-white lg:grid-cols-12 lg:gap-0"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                        <div className="flex flex-col gap-4 p-4 sm:p-6 lg:col-span-7 lg:border-r lg:border-[#E8EBEB] lg:p-10">
                            <div className="flex min-h-[320px] items-center justify-center bg-[#F5F6F5] p-6 md:min-h-[460px]">
                                <ProductImage
                                    src={images[activeImage]?.image_url}
                                    alt={data.name}
                                    width={520}
                                    height={520}
                                    className="max-h-[420px] w-auto object-contain"
                                />
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                    {images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            type="button"
                                            onClick={() => setActiveImage(index)}
                                            className={`shrink-0 border p-1.5 transition-colors ${
                                                activeImage === index
                                                    ? "border-[#0D523F]"
                                                    : "border-transparent bg-[#F5F6F5]"
                                            }`}
                                        >
                                            <ProductImage
                                                src={image.image_url}
                                                alt={`${data.name} ${index + 1}`}
                                                width={72}
                                                height={72}
                                                className="h-[72px] w-[72px] object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-5 p-4 sm:p-6 lg:col-span-5 lg:p-10">
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#888B8B]">
                                    {data.category_name}
                                </p>
                                <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-[#0D523F]">
                                    {data.name}
                                </h1>
                            </div>

                            <div className="border-y border-[#E8EBEB] py-4">
                                <p className="text-[28px] font-semibold tracking-tight text-[#031815]">
                                    {formatMoney(
                                        selectedVariant?.price,
                                        selectedVariant?.currency,
                                    )}
                                </p>
                                {selectedVariant?.promotion && (
                                    <p className="mt-1 text-sm text-[#0D523F]">
                                        Promo saves{" "}
                                        {formatMoney(
                                            selectedVariant.promotion.amount,
                                            selectedVariant.currency,
                                        )}
                                    </p>
                                )}
                                {selectedVariant?.sold_out && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        Currently sold out
                                    </p>
                                )}
                            </div>

                            {data.description && (
                                <p className="text-[16px] leading-relaxed text-[#4B5555]">
                                    {data.description}
                                </p>
                            )}

                            {data.variants.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                                        Options
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.variants.map((variant) => {
                                            const label = [
                                                variant.color,
                                                variant.size,
                                                variant.variant_code,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ");
                                            const active =
                                                (selectedVariant?.id ??
                                                    data.variants[0].id) ===
                                                variant.id;
                                            return (
                                                <button
                                                    key={variant.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedVariantId(variant.id)
                                                    }
                                                    className={`border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                                                        active
                                                            ? "border-[#0D523F] bg-[#0D523F] text-white"
                                                            : "border-[#D5DADA] bg-white text-[#0D523F] hover:border-[#0D523F]"
                                                    } ${variant.sold_out ? "opacity-50" : ""}`}
                                                >
                                                    {label || "Standard"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {specEntries.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                                        Specs
                                    </p>
                                    <dl className="divide-y divide-[#E8EBEB] border border-[#E8EBEB]">
                                        {specEntries.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="grid grid-cols-2 gap-3 px-3 py-2.5 text-[14px]"
                                            >
                                                <dt className="capitalize text-[#6B7373]">
                                                    {key.replaceAll("_", " ")}
                                                </dt>
                                                <dd className="text-[#031815]">
                                                    {typeof value === "string" ||
                                                    typeof value === "number"
                                                        ? value
                                                        : JSON.stringify(value)}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            <button
                                onClick={onAdd}
                                disabled={busy || !!selectedVariant?.sold_out}
                                className="mt-2 w-full bg-[#FEB100] px-8 py-3.5 text-[15px] font-semibold text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
                            >
                                {selectedVariant?.sold_out
                                    ? "Sold out"
                                    : busy
                                      ? "Adding..."
                                      : "Add to cart"}
                            </button>
                            {message && (
                                <p className="text-sm text-[#0D523F]">{message}</p>
                            )}
                        </div>
                    </motion.section>
                )}

                {data && (
                    <section className="mt-6 border border-[#E8EBEB] bg-white p-4 sm:p-6 lg:p-8">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#888B8B]">
                            Feedback
                        </p>
                        <h2 className="mb-4 text-xl font-semibold text-[#0D523F]">
                            Reviews
                        </h2>
                        <div className="relative min-h-[160px]">
                            <ReviewDropdown
                                marketVariantId={selectedVariant?.market_variant_id}
                            />
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default ProductPage;
