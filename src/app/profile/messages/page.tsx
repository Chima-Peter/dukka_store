import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import ProfileMobileSection from "@/components/profile/mobile/profile_mobile_section";
import ProfileNotificationsPanel from "@/components/profile/profile_notifications_panel";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Notifications - Dukka",
    robots: "noindex, nofollow",
};

const ProfileMessagesPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <ProfileMobileSection>
                    <ProfileNotificationsPanel backHref="/profile" />
                </ProfileMobileSection>
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage initialStep={3} />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileMessagesPage;
