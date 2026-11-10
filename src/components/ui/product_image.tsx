"use client";

import { useEffect, useState } from "react";
import {
    getProductPlaceholder,
    isProductPlaceholder,
    nextProductPlaceholder,
    PRODUCT_FALLBACK_IMAGE,
} from "@/utils/product_placeholders";

export { PRODUCT_FALLBACK_IMAGE };

type ProductImageProps = {
    src?: string | null;
    alt: string;
    width: number;
    height: number;
    className?: string;
    /** Stable seed so each product gets a consistent placeholder */
    seed?: string | null;
};

function isUsableSrc(src?: string | null): src is string {
    if (!src || !src.trim()) return false;
    if (
        src === "/logo.svg" ||
        src === "/dukka_logo.png" ||
        src === "/melch_logo.png" ||
        src.endsWith(".svg") ||
        isProductPlaceholder(src)
    ) {
        return false;
    }
    if (src.startsWith("/images/products/placeholder")) return true;
    if (src.startsWith("/")) return true;

    try {
        const url = new URL(src);
        if (url.protocol !== "http:" && url.protocol !== "https:") return false;
        if (url.hostname.endsWith(".local") || url.hostname === "localhost") {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

function resolveSrc(src?: string | null, seed?: string | null) {
    if (
        src?.startsWith("/images/products/placeholder-") &&
        (src.endsWith(".png") || src.endsWith(".webp"))
    ) {
        return src;
    }
    return isUsableSrc(src) ? src : getProductPlaceholder(seed || src || undefined);
}

const ProductImage = ({
    src,
    alt,
    width,
    height,
    className,
    seed,
}: ProductImageProps) => {
    const [currentSrc, setCurrentSrc] = useState(resolveSrc(src, seed ?? alt));

    useEffect(() => {
        setCurrentSrc(resolveSrc(src, seed ?? alt));
    }, [src, seed, alt]);

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => {
                setCurrentSrc((prev) =>
                    nextProductPlaceholder(prev, seed ?? alt),
                );
            }}
        />
    );
};

export default ProductImage;
