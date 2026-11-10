import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import MessagesSmall from "@/components/profile/mobile/messages/messages_small";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Your Messages - Dukka",
    description: "Check and respond to messages from buyers and sellers.",
    robots: "noindex, nofollow",
};

const ProfileMessagesPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <MessagesSmall />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileMessagesPage;
