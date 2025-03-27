
export interface SignUpRequest {
    full_name: string,
    email: string,
    password: string
}

export interface SignUpResponse {
    status: number,
    message: string
}

export interface LoginRequest {
    email: string,
    password: string
}


export interface LoginResponse {
    status: number,
    message: string,
}

export interface AuthenticationType {
    first_name?: string
    full_name?: string
    isAuthenticated?: boolean
    email?: string
}
