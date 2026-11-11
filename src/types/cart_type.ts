export interface CartProductTypes {
    id?: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    discount_amount?: number;
    currency?: string;
    sold_out?: boolean;
    market_variant_id?: string;
    product_specs?: Record<string, unknown>;
}

export interface CartTypes {
    cart: CartProductTypes[];
    total?: number;
    server_cart_id?: string | null;
    market_id?: string | null;
}

export interface DetailsType {
    id?: string;
    image: string;
    title: string;
    price: string;
    changeGrid?: string;
    profile?: boolean;
    market_variant_id?: string | null;
    currency?: string | null;
    sold_out?: boolean;
    promotion_amount?: number | null;
}
