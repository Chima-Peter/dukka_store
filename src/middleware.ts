import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const referrer = req.headers.get("referer"); // Get the previous page

  // Only allow navigation if coming from checkout
  if ((url.startsWith("/cart/checkout/payment") &&(!referrer || !referrer.includes("/cart/checkout")))) {
    return NextResponse.redirect(new URL("/", req.url)); // Send back to home page
  }

  // Only allow navigation if coming from payment
  if (url.startsWith("/cart/checkout/payment/success") &&(!referrer || !referrer.includes("/cart/checkout/payment"))) {
      return NextResponse.redirect(new URL("/", req.url)); // Send back to home page
  }

  return NextResponse.next();
}

// Apply middleware only to these paths
export const config = {
  matcher: ["/cart/checkout/payment", "/cart/checkout/payment/success"],
};
