import CartUI from "@/components/cart/cart_ui";


export const metadata = {
    title: "Cart - Melch.store",
    description: "View and manage your shopping cart before checkout."
}

const CartPage = async () => {
    // let res, cart;
    // // load authorization token
    // const authToken = (await cookies()).get("authToken")?.value

    // // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    // if (authToken) {
    //     res = await fetch("api-call", {
    //         headers: { Authorization: `Bearer ${authToken}` },
    //         cache: "no-store" // data is not cached so fresh cart data whenever this page is opened
    //     })
    //     cart = await res.json() as CartTypes
    // }
    return <CartUI />
}

export default CartPage