"use client";

import { useEffect, useState } from "react";

export const PRODUCT_FALLBACK_IMAGE = "/dukka_logo.png";

type ProductImageProps = {
    src?: string | null;
    alt: string;
    width: number;
    height: number;
    className?: string;
};

function isUsableSrc(src?: string | null): src is string {
    if (!src || !src.trim() || src === "/logo.svg") return false;
    if (src.startsWith("/")) return true;

    try {
        const url = new URL(src);
        if (url.protocol !== "http:" && url.protocol !== "https:") return false;
        // Seed / placeholder hosts that are not real CDNs
        if (url.hostname.endsWith(".local") || url.hostname === "localhost") {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

function resolveSrc(src?: string | null) {
    return isUsableSrc(src) ? src : PRODUCT_FALLBACK_IMAGE;
}

const ProductImage = ({ src, alt, width, height, className }: ProductImageProps) => {
    const [currentSrc, setCurrentSrc] = useState(resolveSrc(src));

    useEffect(() => {
        setCurrentSrc(resolveSrc(src));
    }, [src]);

    return (
        // Native img avoids next/image remote-host crashes on bad product URLs
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => {
                if (currentSrc !== PRODUCT_FALLBACK_IMAGE) {
                    setCurrentSrc(PRODUCT_FALLBACK_IMAGE);
                }
            }}
        />
    );
};

export default ProductImage;
