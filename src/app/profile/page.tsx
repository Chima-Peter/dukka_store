import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResponsiveDisplay from "@/utils/responsive_display";
import MobileProfilePage from "@/components/profile/mobile/mobile_profile_page";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";


export const metadata = {
    title: "Account Settings - Melch.store",
    description: "Access your profile details, update information, and customize your experience on Melch.",
    robots: "noindex, nofollow",
}

const ProfilePage = async () => {
    // load authorization token
    const authToken = (await cookies()).get("authToken")?.value

    // if user hasn't logged in, then user cart is not saved to db, so we use localstorage cart data
    if (authToken) {
        redirect("/login")
    }
    return (
        <>
            <ResponsiveDisplay maxWidth={1000}>
                <MobileProfilePage />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    )
}

export default ProfilePage