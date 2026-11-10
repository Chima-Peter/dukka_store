const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const GUEST_CART_KEY = "guest_cart_id";
const MARKET_KEY = "active_market_id";

function setCookie(name: string, value: string, maxAgeSeconds: number) {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : undefined;
}

export function getAccessToken() {
    return getCookie(ACCESS_COOKIE);
}

export function getRefreshToken() {
    return getCookie(REFRESH_COOKIE);
}

export function setAuthTokens(accessToken: string, refreshToken: string) {
    setCookie(ACCESS_COOKIE, accessToken, 60 * 60 * 24);
    setCookie(REFRESH_COOKIE, refreshToken, 60 * 60 * 24 * 7);
}

export function clearAuthTokens() {
    clearCookie(ACCESS_COOKIE);
    clearCookie(REFRESH_COOKIE);
}

export function getGuestCartId() {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(GUEST_CART_KEY) ?? undefined;
}

export function setGuestCartId(cartId: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(GUEST_CART_KEY, cartId);
}

export function clearGuestCartId() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(GUEST_CART_KEY);
}

export function getActiveMarketId() {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(MARKET_KEY) ?? undefined;
}

export function setActiveMarketId(marketId: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(MARKET_KEY, marketId);
    window.dispatchEvent(
        new CustomEvent("dukka:active-market", { detail: { marketId } }),
    );
}
