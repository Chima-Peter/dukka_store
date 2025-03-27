import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResponsiveDisplay from "@/utils/responsive_display";
import DesktopProfilePage from "@/components/profile/desktop/desktop_profile_page";
import UserProfile from "@/components/profile/mobile/user_profile/user_profile";


export const metadata = {
    title: "Your Profile - Melch",
    description: "View and update your account details, settings, and personal information.",
    robots: "noindex, nofollow",
  };


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
                <UserProfile />
            </ResponsiveDisplay>
            <ResponsiveDisplay minWidth={1001}>
                <DesktopProfilePage />
            </ResponsiveDisplay>
        </>
    )
}

export default ProfilePage