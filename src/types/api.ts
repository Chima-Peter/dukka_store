export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

export interface PublicCustomer {
    id: string;
    name: string;
    avatar?: string | null;
    email: string;
    date_of_birth?: string | null;
    gender?: "MALE" | "FEMALE" | "OTHER" | null;
    phone_number?: string | null;
    active_market_id: string | null;
    profile_url?: string | null;
    shipping_address?: AddressRecord[];
    billing_address?: AddressRecord[];
    points?: { balance: string | number } | null;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginData extends AuthTokens {
    customer: PublicCustomer;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ProductPromotion {
    promotion_market_id: string;
    amount: string | number;
}

export interface ProductListItem {
    id: string;
    name: string;
    image_url: string | null;
    price: string | number | null;
    currency: string | null;
    sold_out: boolean;
    promotion: ProductPromotion | null;
}

export interface ProductListPage {
    items: ProductListItem[];
    next_cursor: string | null;
}

export interface ProductVariantDetail {
    id: string;
    variant_code: string;
    color: string | null;
    size: string | null;
    variant_info: Record<string, unknown>;
    created_at: string;
    updated_at: string;
    image_url: string | null;
    market_variant_id: string | null;
    price: string | number | null;
    currency: string | null;
    sold_out: boolean;
    promotion: ProductPromotion | null;
}

export interface ProductDetail {
    id: string;
    name: string;
    description: string;
    specs: Record<string, unknown> | null;
    category_id: string;
    created_at: string;
    updated_at: string;
    category_name: string;
    images: Array<{ id: string; image_url: string; sort_order: number }>;
    variants: ProductVariantDetail[];
}

export interface CategoryItem {
    id: string;
    market_id: string;
    category_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryPage {
    items: CategoryItem[];
    next_cursor: string | null;
}

export interface MarketSearchMatch {
    id: string;
    name: string;
    code: string;
    iso2: string;
    iso3: string;
    status: string;
    currency: { id: string; code: string; name: string };
}

export interface CartItemDiscount {
    type: "FIXED" | "PERCENTAGE";
    value: string | number;
    max_discount_amount: string | number;
}

export interface CartItemView {
    id: string;
    quantity: number;
    market_variant_id: string;
    promotion_market_id: string | null;
    price: string | number;
    discount: CartItemDiscount | null;
    discount_amount: string | number;
    currency: string;
    sold_out: boolean;
    promotion_warning: string | null;
    product_name: string;
    product_image: string;
    product_specs: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface CartView {
    id: string;
    total: string | number;
    customer_id: string | null;
    market_id: string | null;
    items: CartItemView[];
    created_at?: string;
    updated_at?: string;
}

export interface AddCartItemRequest {
    market_variant_id: string;
    quantity: number;
}

export interface AddGuestCartItemRequest extends AddCartItemRequest {
    cart_id?: string;
}

export interface CreateAddressRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    whatsapp_number?: string;
    country: string;
    state: string;
    street_address: string;
    market_id?: string;
}

export interface AddressRecord {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    whatsapp_number?: string | null;
    street_address: string;
    country: string;
    state: string;
    market_id?: string;
    customer_id?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface PaymentMethod {
    id: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface MarketPaymentMethodDetail {
    id: string;
    market_id: string;
    payment_method_id: string;
    payment_method_name: string;
    market: { id: string; name: string; code: string };
    created_at?: string;
    updated_at?: string;
}

export interface CheckoutRequest {
    cart_id?: string;
    shipping_address_id: string;
    billing_address_id?: string | null;
    payment_method_id: string;
    points?: number;
}

export interface CheckoutOrder {
    id: string;
    order_number: string;
    status: string;
    currency: string;
    subtotal: string | number;
    shipping_fee: string | number;
    discount_amount: string | number;
    points_discount: string | number;
    coupon_discount: string | number;
    total_amount: string | number;
    guest_email: string | null;
    guest_name: string | null;
    guest_phone_number: string | null;
    shipping_address: OrderAddressSnapshot | null;
    billing_address: OrderAddressSnapshot | null;
    market_id: string;
    customer_id: string | null;
    created_at: string;
}

export interface CheckoutPaymentAttempt {
    id: string;
    status: string;
    payment_method_name: string;
    payment_intent_id: string | null;
    payment_intent_url: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    order_id: string;
    market_payment_method_id: string | null;
    order_number: string;
    order_status: string;
    total_amount: string | number;
    currency: string;
    customer_id: string | null;
    customer_name: string | null;
    guest_name: string | null;
    guest_email: string | null;
    market_id: string;
    warehouse_id: string;
    warehouse_name: string;
}

export interface CheckoutResult {
    order: CheckoutOrder;
    payment_attempt: CheckoutPaymentAttempt;
    authorization_url: string | null;
}

export interface OrderSummary {
    id: string;
    status: string;
    order_number: string;
    amount: string | number;
    quantity: number;
    name: string | null;
    created_at: string;
}

export interface OrderSummaryPage {
    items: OrderSummary[];
    next_cursor: string | null;
}

export interface ServiceState {
    id: string;
    market_id: string;
    state_name: string;
    status: string;
    warehouse_ids: string[];
    created_at: string;
    updated_at: string;
}

export interface ServiceStatePage {
    items: ServiceState[];
    next_cursor: string | null;
}

export interface OrderItemDetail {
    id: string;
    quantity: number;
    price: string | number;
    total: string | number;
    discount_type?: string | null;
    discount_value?: string | number | null;
    max_discount_amount?: string | number | null;
    discount_amount?: string | number | null;
    promotion_market_id?: string | null;
    product_name: string;
    product_image?: string | null;
    product_specs?: Record<string, unknown> | null;
    market_variant_id?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface OrderAddressSnapshot {
    first_name?: string;
    last_name?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    whatsapp_number?: string;
    street_address?: string;
    country?: string;
    state?: string;
    market_id?: string;
    [key: string]: unknown;
}

export interface ShipmentMovement {
    id: string;
    movement_type?: string;
    performed_by?: string | null;
    occurred_at?: string;
    recorded_at?: string;
    metadata?: Record<string, unknown> | null;
    from_location?: { id?: string; type?: string; name?: string | null } | null;
    to_location?: { id?: string; type?: string; name?: string | null } | null;
    shipment_leg_id?: string | null;
    created_at?: string;
}

export interface OrderPaymentAttempt {
    id: string;
    status: string;
    payment_method_name: string;
    payment_method: { id: string; name: string } | null;
    created_at: string;
}

export interface OrderDetail {
    id: string;
    order_number: string;
    status: string;
    currency?: string;
    subtotal?: string | number;
    shipping_fee?: string | number;
    discount_amount?: string | number;
    points_discount?: string | number;
    coupon_discount?: string | number;
    total_amount: string | number;
    guest_email?: string | null;
    guest_name?: string | null;
    guest_phone_number?: string | null;
    shipping_address?: OrderAddressSnapshot | null;
    billing_address?: OrderAddressSnapshot | null;
    market_id?: string;
    customer_id?: string | null;
    created_at: string;
    market?: { id: string; name: string; code: string };
    order_items?: OrderItemDetail[];
    order_payment_attempt?: OrderPaymentAttempt | null;
    promotion_usages?: Array<{
        id: string;
        discount_amount: string | number;
        redeemed_at: string;
        promotion_market_id: string;
        customer_id: string | null;
        created_at: string;
    }>;
    coupon_usages?: Array<{
        id: string;
        guest_email: string | null;
        coupon_id: string;
        customer_id: string | null;
        created_at: string;
        coupon: {
            id: string;
            code: string;
            type: string;
            value: string | number;
        };
    }>;
    shipment?: {
        tracking_number?: string | null;
        shipment_movements?: ShipmentMovement[];
    } | null;
}

export interface ReviewSummary {
    id: string;
    customer_name: string;
    title: string;
    review: string;
    rating: number;
    created_at: string;
    image_url: string | null;
}

export interface ReviewPage {
    items: ReviewSummary[];
    next_cursor: string | null;
}

export interface OpenMarket {
    id: string;
    name: string;
    code: string;
    status: string;
    iso2: string;
    currency_code: string;
    created_at: string;
}

export interface PointsHistoryItem {
    id: string;
    status: "EARNED" | "REDEEMED" | "EXPIRED" | string;
    description: string | null;
    count: number;
    created_at: string;
    updated_at: string;
}

export interface PointsHistoryPage {
    items: PointsHistoryItem[];
    next_cursor: string | null;
}

export interface NotificationItem {
    id: string;
    title: string;
    type: string;
    text: string;
    has_read: boolean;
    created_at: string;
    read_at: string | null;
}

export interface NotificationsPage {
    items: NotificationItem[];
    next_cursor: string | null;
}

export interface UpdateAddressRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    whatsapp_number?: string;
    country?: string;
    state?: string;
    street_address?: string;
}
