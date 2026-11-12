"use client";

import { BiBell } from "react-icons/bi";
import { motion } from "framer-motion";
import {
    useGetNotificationsQuery,
    useMarkNotificationsReadMutation,
} from "@/redux/services/notifications_api";
import ProfileSectionShell from "./profile_section_shell";

type Props = {
    onBack?: () => void;
    backHref?: string;
};

const NotificationSkeleton = ({ index }: { index: number }) => (
    <motion.li
        className="overflow-hidden rounded-2xl border border-dukka-line/80 bg-white px-4 py-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index, duration: 0.3, ease: "easeOut" }}
        aria-hidden
    >
        <div className="flex items-start gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-dukka-soft" />
            <div className="min-w-0 flex-1 space-y-2.5 pt-0.5">
                <div className="h-3.5 w-[55%] animate-pulse rounded-full bg-dukka-soft" />
                <div className="h-3 w-full animate-pulse rounded-full bg-dukka-soft/80" />
                <div className="h-3 w-[72%] animate-pulse rounded-full bg-dukka-soft/70" />
                <div className="h-2.5 w-28 animate-pulse rounded-full bg-dukka-line" />
            </div>
        </div>
    </motion.li>
);

const ProfileNotificationsPanel = ({ onBack, backHref }: Props) => {
    const { data, isLoading, isError, isFetching } = useGetNotificationsQuery({
        limit: 40,
    });
    const [markRead, { isLoading: marking }] =
        useMarkNotificationsReadMutation();
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
            <div className="mb-5 flex items-center justify-between gap-3">
                {isLoading ? (
                    <>
                        <div className="h-4 w-24 animate-pulse rounded-full bg-dukka-soft" />
                        <div className="h-9 w-28 animate-pulse rounded-full bg-dukka-soft" />
                    </>
                ) : (
                    <>
                        <p className="text-[13px] text-dukka-muted">
                            <span className="font-semibold text-dukka-ink">
                                {unreadIds.length}
                            </span>{" "}
                            unread
                            {isFetching && !isLoading ? (
                                <span className="ml-2 inline-flex align-middle">
                                    <span className="dukka-loader-inline" aria-hidden />
                                </span>
                            ) : null}
                        </p>
                        <button
                            type="button"
                            disabled={!unreadIds.length || marking}
                            onClick={markAllRead}
                            className="rounded-full border border-dukka-line bg-white px-3.5 py-2 text-[13px] font-semibold text-dukka-forest transition-colors hover:border-dukka-amber hover:bg-dukka-amber/20 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            {marking ? "Updating..." : "Mark all read"}
                        </button>
                    </>
                )}
            </div>

            {isLoading && (
                <div role="status" aria-live="polite" aria-busy="true">
                    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-dukka-line/70 bg-dukka-soft/50 px-4 py-3.5">
                        <span className="dukka-loader-inline" aria-hidden />
                        <div>
                            <p className="text-[13px] font-semibold text-dukka-forest">
                                Checking your inbox
                            </p>
                            <p className="text-[12px] text-dukka-muted">
                                Pulling the latest updates…
                            </p>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {[0, 1, 2, 3].map((index) => (
                            <NotificationSkeleton key={index} index={index} />
                        ))}
                    </ul>
                    <span className="sr-only">Loading notifications</span>
                </div>
            )}

            {isError && (
                <div className="rounded-2xl border border-[#F5C2C2] bg-[#FFF7F7] px-5 py-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE8E8] text-[#C62828]">
                        <BiBell className="h-5 w-5" />
                    </div>
                    <p className="text-[15px] font-semibold text-dukka-ink">
                        Couldn’t load notifications
                    </p>
                    <p className="mt-1 text-[13px] text-dukka-muted">
                        Please try again in a moment.
                    </p>
                </div>
            )}

            {!isLoading && !isError && items.length === 0 && (
                <div className="rounded-2xl border border-dashed border-dukka-line bg-dukka-soft/40 px-5 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-dukka-forest shadow-[0_8px_20px_rgba(3,24,21,0.06)]">
                        <BiBell className="h-6 w-6" />
                    </div>
                    <p className="text-[16px] font-semibold text-dukka-ink">
                        You’re all caught up
                    </p>
                    <p className="mt-1 text-[13px] text-dukka-muted">
                        Order updates and account alerts will show up here.
                    </p>
                </div>
            )}

            {!isLoading && !isError && items.length > 0 && (
                <ul className="flex flex-col gap-3">
                    {items.map((item, index) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: Math.min(index * 0.03, 0.24),
                                duration: 0.28,
                                ease: "easeOut",
                            }}
                            className={`rounded-2xl border px-4 py-4 transition-colors ${
                                item.has_read
                                    ? "border-dukka-line/80 bg-white"
                                    : "border-dukka-amber/70 bg-[#FFF8EB]"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <span
                                    className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                        item.has_read
                                            ? "bg-dukka-soft text-dukka-forest"
                                            : "bg-dukka-amber/35 text-dukka-ink"
                                    }`}
                                >
                                    <BiBell className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-dukka-ink">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-[14px] leading-relaxed text-dukka-muted">
                                                {item.text}
                                            </p>
                                            <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-[#888B8B]">
                                                {new Date(
                                                    item.created_at,
                                                ).toLocaleString()}{" "}
                                                · {item.type}
                                            </p>
                                        </div>
                                        {!item.has_read && (
                                            <button
                                                type="button"
                                                disabled={marking}
                                                onClick={() => markOne(item.id)}
                                                className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-dukka-forest shadow-sm transition-colors hover:bg-dukka-forest hover:text-white disabled:opacity-50"
                                            >
                                                Mark read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
        </ProfileSectionShell>
    );
};

export default ProfileNotificationsPanel;
