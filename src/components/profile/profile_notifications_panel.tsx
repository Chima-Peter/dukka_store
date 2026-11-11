"use client";

import {
    useGetNotificationsQuery,
    useMarkNotificationsReadMutation,
} from "@/redux/services/notifications_api";
import ProfileSectionShell from "./profile_section_shell";

type Props = {
    onBack?: () => void;
    backHref?: string;
};

const ProfileNotificationsPanel = ({ onBack, backHref }: Props) => {
    const { data, isLoading, isError } = useGetNotificationsQuery({ limit: 40 });
    const [markRead, { isLoading: marking }] = useMarkNotificationsReadMutation();
    const items = data?.items ?? [];
    const unreadIds = items.filter((item) => !item.has_read).map((item) => item.id);

    const markAllRead = async () => {
        if (!unreadIds.length) return;
        await markRead({ ids: unreadIds });
    };

    const markOne = async (id: string) => {
        await markRead({ ids: [id] });
    };

    return (
        <ProfileSectionShell
            title="Notifications"
            onBack={onBack}
            backHref={backHref}
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    {unreadIds.length} unread
                </p>
                <button
                    type="button"
                    disabled={!unreadIds.length || marking}
                    onClick={markAllRead}
                    className="rounded-md border border-[#ADB1B1] px-3 py-1.5 text-sm font-medium disabled:opacity-50"
                >
                    Mark all read
                </button>
            </div>

            {isLoading && <p className="text-sm text-gray-500">Loading notifications...</p>}
            {isError && (
                <p className="text-sm text-red-600">Could not load notifications.</p>
            )}
            {!isLoading && !isError && items.length === 0 && (
                <p className="text-sm text-gray-500">No notifications yet.</p>
            )}

            <ul className="flex flex-col gap-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={`rounded-lg border px-4 py-3 ${
                            item.has_read
                                ? "border-[#E4E7E7] bg-white"
                                : "border-[#FEB100] bg-[#FFF8EB]"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-medium text-[#0D3833]">{item.title}</p>
                                <p className="mt-1 text-sm text-gray-600">{item.text}</p>
                                <p className="mt-2 text-xs text-gray-500">
                                    {new Date(item.created_at).toLocaleString()} · {item.type}
                                </p>
                            </div>
                            {!item.has_read && (
                                <button
                                    type="button"
                                    disabled={marking}
                                    onClick={() => markOne(item.id)}
                                    className="shrink-0 text-sm font-medium text-[#0D523F]"
                                >
                                    Mark read
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </ProfileSectionShell>
    );
};

export default ProfileNotificationsPanel;
