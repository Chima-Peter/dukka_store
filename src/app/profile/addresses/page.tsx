import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import ProfileMobileSection from "@/components/profile/mobile/profile_mobile_section";
import ProfileAddressesPanel from "@/components/profile/profile_addresses_panel";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Addresses - Dukka",
    robots: "noindex, nofollow",
};

const ProfileAddressesPage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <ProfileMobileSection>
                    <ProfileAddressesPanel backHref="/profile" />
                </ProfileMobileSection>
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage initialStep={6} />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileAddressesPage;
