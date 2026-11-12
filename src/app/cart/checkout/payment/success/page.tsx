import { Suspense } from "react";
import PaymentSuccessContent from "@/components/cart/checkout/payment/payment_success_content";

export const metadata = {
    title: "Payment successful - Dukka.store",
    description: "Your payment was successful! Your order is now processed.",
};

const PaymentSuccessPage = () => {
    return (
        <Suspense
            fallback={
                <main className="page-nav-offset flex min-h-[50vh] items-center justify-center bg-dukka-canvas font-urbanist">
                    <p className="text-dukka-muted">Confirming payment…</p>
                </main>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
};

export default PaymentSuccessPage;
