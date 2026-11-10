import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;
    const referrer = req.headers.get("referer") ?? "";

    // Allow Paystack (or any external) return onto the success page.
    if (url.startsWith("/cart/checkout/payment/success")) {
        return NextResponse.next();
    }

    // Soften payment entry: allow from checkout or when already in payment funnel.
    if (
        url.startsWith("/cart/checkout/payment") &&
        referrer &&
        !referrer.includes("/cart/checkout") &&
        !referrer.includes("paystack")
    ) {
        return NextResponse.redirect(new URL("/cart/checkout", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cart/checkout/payment", "/cart/checkout/payment/success"],
};
