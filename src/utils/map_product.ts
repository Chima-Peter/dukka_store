import type { ProductListItem } from "@/types/api";
import type { DetailsType } from "@/types/cart_type";
import addCommasToInt from "@/utils/add_commas_to_int";
import { PRODUCT_FALLBACK_IMAGE } from "@/components/ui/product_image";

function resolveProductImage(imageUrl?: string | null) {
    if (!imageUrl) return PRODUCT_FALLBACK_IMAGE;
    try {
        const url = new URL(imageUrl);
        if (url.hostname.endsWith(".local") || url.hostname === "localhost") {
            return PRODUCT_FALLBACK_IMAGE;
        }
    } catch {
        if (!imageUrl.startsWith("/")) return PRODUCT_FALLBACK_IMAGE;
    }
    return imageUrl;
}

export function toDetailsType(product: ProductListItem): DetailsType {
    const priceNumber = Number(product.price ?? 0);
    return {
        id: product.id,
        title: product.name,
        image: resolveProductImage(product.image_url),
        price: addCommasToInt(Number.isFinite(priceNumber) ? priceNumber : 0),
        market_variant_id: product.market_variant_id,
        currency: product.currency,
        sold_out: product.sold_out,
        category_name: product.category_name,
        description: product.description,
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
