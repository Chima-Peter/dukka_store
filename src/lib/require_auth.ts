import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireCustomerAuth(redirectTo = "/login") {
    const accessToken = (await cookies()).get("access_token")?.value;
    if (!accessToken) {
        redirect(redirectTo);
    }
    return accessToken;
}

export async function redirectIfAuthenticated(redirectTo = "/") {
    const accessToken = (await cookies()).get("access_token")?.value;
    if (accessToken) {
        redirect(redirectTo);
    }
}
