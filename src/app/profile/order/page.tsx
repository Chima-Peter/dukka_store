import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import OrdersSmall from "@/components/profile/mobile/orders/order_small";

export const metadata = {
    title: "Your Orders - Melch",
    description: "View your past and active orders, track shipments, and manage purchases.",
    robots: "noindex, nofollow",
  };
  

const ProfilePage = async () => {
    // load authorization token
    const authToken = (await cookies()).get("authToken")?.value

    // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    if (authToken) {
        redirect("/login")
    }
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <OrdersSmall />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    )
}

export default ProfilePage