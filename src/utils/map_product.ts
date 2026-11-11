import type { ProductListItem } from "@/types/api";
import type { DetailsType } from "@/types/cart_type";
import addCommasToInt from "@/utils/add_commas_to_int";
import { getProductPlaceholder } from "@/utils/product_placeholders";

function resolveProductImage(imageUrl?: string | null, seed?: string | null) {
    if (
        !imageUrl ||
        imageUrl === "/dukka_logo.png" ||
        imageUrl === "/melch_logo.png" ||
        imageUrl === "/logo.svg" ||
        imageUrl.endsWith(".svg")
    ) {
        return getProductPlaceholder(seed);
    }
    try {
        const url = new URL(imageUrl);
        if (url.hostname.endsWith(".local") || url.hostname === "localhost") {
            return getProductPlaceholder(seed);
        }
    } catch {
        if (!imageUrl.startsWith("/")) return getProductPlaceholder(seed);
    }
    return imageUrl;
}

export function toDetailsType(product: ProductListItem): DetailsType {
    const priceNumber = Number(product.price ?? 0);
    const seed = product.id || product.name;
    return {
        id: product.id,
        title: product.name,
        image: resolveProductImage(product.image_url, seed),
        price: addCommasToInt(Number.isFinite(priceNumber) ? priceNumber : 0),
        currency: product.currency,
        sold_out: product.sold_out,
        promotion_amount:
            product.promotion?.amount !== undefined && product.promotion?.amount !== null
                ? Number(product.promotion.amount)
                : null,
    };
}

export function normalizeList<T>(payload: { items?: T[] } | T[] | undefined | null): T[] {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    return payload.items ?? [];
}
