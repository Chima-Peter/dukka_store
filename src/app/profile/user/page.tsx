import ResponsiveDisplay from "@/utils/responsive_display";
import MobileProfilePage from "@/components/profile/mobile/mobile_profile_page";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Your Profile - Dukka",
    robots: "noindex, nofollow",
};

const ProfileUserPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <MobileProfilePage />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileUserPage;
