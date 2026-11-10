import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import OrderDetails from "@/components/profile/mobile/orders/order_details";
import type { Metadata } from "next";
import { requireCustomerAuth } from "@/lib/require_auth";

type Props = {
    params: Promise<{ orderID: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const orderID = (await params).orderID;

    return {
        title: `Order #${orderID} - Dukka`,
        description: `Details and status of your order #${orderID}.`,
        robots: "noindex, nofollow",
    };
};

const ProfileOrderDetailPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <OrderDetails />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileOrderDetailPage;
