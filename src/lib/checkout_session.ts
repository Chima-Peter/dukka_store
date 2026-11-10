export type CheckoutSessionDraft = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    whatsapp_number?: string;
    country: string;
    state: string;
    street_address: string;
    shipping_address_id?: string;
};

const KEY = "dukka_checkout_draft";

export function saveCheckoutDraft(draft: CheckoutSessionDraft) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function loadCheckoutDraft(): CheckoutSessionDraft | null {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as CheckoutSessionDraft;
    } catch {
        return null;
    }
}

export function clearCheckoutDraft() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(KEY);
}
