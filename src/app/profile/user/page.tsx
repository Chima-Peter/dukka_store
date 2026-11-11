import ResponsiveDisplay from "@/utils/responsive_display";
import UserProfile from "@/components/profile/mobile/user_profile/user_profile";
import DesktopProfileSettingsPage from "@/components/profile/desktop/profile/desktop_profile_settings_page";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Profile settings - Dukka",
    robots: "noindex, nofollow",
};

const ProfileUserPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <UserProfile />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfileSettingsPage />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileUserPage;
