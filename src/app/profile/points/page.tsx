import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import ProfileMobileSection from "@/components/profile/mobile/profile_mobile_section";
import ProfilePointsPanel from "@/components/profile/profile_points_panel";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Points - Dukka",
    robots: "noindex, nofollow",
};

const ProfilePointsPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <ProfileMobileSection>
                    <ProfilePointsPanel backHref="/profile" />
                </ProfileMobileSection>
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage initialStep={5} />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfilePointsPage;
