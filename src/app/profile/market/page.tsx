import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import ProfileMobileSection from "@/components/profile/mobile/profile_mobile_section";
import ProfileMarketPanel from "@/components/profile/profile_market_panel";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Market - Dukka",
    robots: "noindex, nofollow",
};

const ProfileMarketPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <ProfileMobileSection>
                    <ProfileMarketPanel backHref="/profile" />
                </ProfileMobileSection>
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage initialStep={7} />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileMarketPage;
