export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    id: string;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    customer: {
        id: string;
        name: string;
        email: string;
        active_market_id: string | null;
    };
}

export interface AuthenticationType {
    first_name?: string;
    full_name?: string;
    isAuthenticated?: boolean;
    email?: string;
    cart_id?: string | null;
    customer_id?: string;
}
