import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutContent from "@/components/cart/checkout/checkout_content";


export const metadata = {
    title: "Checkout - Melch.store",
    description: "Complete your purchase seamlessly with our secure checkout process."
}

const CheckoutPage = async () => {
    // load authorization token
    const authToken = (await cookies()).get("authToken")?.value

    // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    if (authToken) {
        return redirect("/")
    }
    return <CheckoutContent />
}

export default CheckoutPage