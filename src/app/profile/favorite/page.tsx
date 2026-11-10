import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import FavoriteSmall from "@/components/profile/mobile/favorite_small";
import { requireCustomerAuth } from "@/lib/require_auth";

export const metadata = {
    title: "Your Favorites - Dukka",
    description: "View and manage your favorite products.",
    robots: "noindex, nofollow",
};

const ProfileFavoritePage = async () => {
    await requireCustomerAuth();
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <FavoriteSmall />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    );
};

export default ProfileFavoritePage;
