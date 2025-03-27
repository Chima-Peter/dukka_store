import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PaymentContent from "@/components/cart/checkout/payment/payment_content";


export const metadata = {
    title: "Complete your Payment - Melch.store",
    description: "Complete your payment and finalize your order."
}

const PaymentPage = async () => {
    // load authorization token
    const authToken = (await cookies()).get("authToken")?.value

    // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    if (authToken) {
        return redirect("/")
    }
    return <PaymentContent />
}

export default PaymentPage