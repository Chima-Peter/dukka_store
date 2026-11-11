"use client";

import {
    useGetMeQuery,
    useGetPointsHistoryQuery,
} from "@/redux/services/customer_api";
import ProfileSectionShell from "./profile_section_shell";

type Props = {
    onBack?: () => void;
    backHref?: string;
};

const ProfilePointsPanel = ({ onBack, backHref }: Props) => {
    const { data: me } = useGetMeQuery();
    const { data, isLoading, isError } = useGetPointsHistoryQuery({ limit: 30 });
    const balance = Number(me?.points?.balance ?? 0);
    const items = data?.items ?? [];

    return (
        <ProfileSectionShell title="Points" onBack={onBack} backHref={backHref}>
            <div className="mb-6 rounded-lg border border-[#ADB1B1] bg-[#FFF8EB] px-5 py-4">
                <p className="text-sm text-gray-600">Available balance</p>
                <p className="mt-1 text-3xl font-semibold text-[#0D523F]">
                    {Number.isFinite(balance) ? balance.toLocaleString() : "0"}
                </p>
            </div>

            <h2 className="mb-3 text-lg font-medium text-[#0D3833]">History</h2>
            {isLoading && <p className="text-sm text-gray-500">Loading history...</p>}
            {isError && (
                <p className="text-sm text-red-600">Could not load points history.</p>
            )}
            {!isLoading && !isError && items.length === 0 && (
                <p className="text-sm text-gray-500">No points activity yet.</p>
            )}
            <ul className="flex flex-col gap-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-start justify-between gap-4 rounded-lg border border-[#E4E7E7] px-4 py-3"
                    >
                        <div>
                            <p className="font-medium text-[#0D3833]">
                                {item.description || item.status}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(item.created_at).toLocaleString()} · {item.status}
                            </p>
                        </div>
                        <p
                            className={`shrink-0 font-semibold ${
                                item.status === "REDEEMED" || item.status === "EXPIRED"
                                    ? "text-red-600"
                                    : "text-[#0D523F]"
                            }`}
                        >
                            {item.status === "REDEEMED" || item.status === "EXPIRED"
                                ? "-"
                                : "+"}
                            {item.count}
                        </p>
                    </li>
                ))}
            </ul>
        </ProfileSectionShell>
    );
};

export default ProfilePointsPanel;
