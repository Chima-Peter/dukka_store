import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import OrderDetails from "@/components/profile/mobile/orders/order_details";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ orderID: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const orderID = (await params).orderID;

    return {
        title: `Order #${orderID} - Melch`,
        description: `Details and status of your order #${orderID}.`,
        robots: "noindex, nofollow",
    }
}

const ProfilePage = async () => {
    // // load authorization token
    // const authToken = (await cookies()).get("authToken")?.value

    // // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    // if (authToken) {
    //     redirect("/login")
    // }
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <OrderDetails />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    )
}

export default ProfilePage