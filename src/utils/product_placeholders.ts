/** Real product photo placeholders only (no brand/logo art). */
export const PRODUCT_PLACEHOLDERS = [
    "/images/products/placeholder-1.png",
    "/images/products/placeholder-2.png",
    "/images/products/placeholder-3.png",
    "/images/products/placeholder-4.png",
    "/images/products/placeholder-5.webp",
    "/images/products/placeholder-6.webp",
    "/images/products/placeholder-7.webp",
    "/images/products/placeholder-8.webp",
    "/images/products/placeholder-9.png",
    "/images/products/placeholder-10.webp",
] as const;

export const PRODUCT_FALLBACK_IMAGE = PRODUCT_PLACEHOLDERS[0];

function hashSeed(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

export function getProductPlaceholder(seed?: string | null): string {
    if (!seed) return PRODUCT_FALLBACK_IMAGE;
    const index = hashSeed(seed) % PRODUCT_PLACEHOLDERS.length;
    return PRODUCT_PLACEHOLDERS[index];
}

export function isProductPlaceholder(src?: string | null): boolean {
    if (!src) return false;
    return (
        src === "/images/products/placeholder.png" ||
        src.endsWith(".svg") ||
        PRODUCT_PLACEHOLDERS.includes(src as (typeof PRODUCT_PLACEHOLDERS)[number])
    );
}

export function nextProductPlaceholder(current?: string | null, seed?: string | null): string {
    const currentIndex = PRODUCT_PLACEHOLDERS.findIndex((item) => item === current);
    if (currentIndex >= 0) {
        return PRODUCT_PLACEHOLDERS[(currentIndex + 1) % PRODUCT_PLACEHOLDERS.length];
    }
    return getProductPlaceholder(seed);
}
