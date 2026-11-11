import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import OrdersSmall from "@/components/profile/mobile/orders/order_small";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Your Orders - Dukka",
    description: "View your past and active orders, track shipments, and manage purchases.",
    robots: "noindex, nofollow",
};

const ProfileOrdersPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <OrdersSmall />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage initialStep={2} />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileOrdersPage;
