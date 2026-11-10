const STATUS_CLASS: Record<string, string> = {
    delivered: "bg-[#C5FFB7]",
    shipped: "bg-[#FFFCB7] text-[#686403]",
    processing: "bg-[#FFFCB7] text-[#686403]",
    pending: "bg-[#E8EEF2] text-[#334155]",
    cancelled: "bg-[#FFD5B7] text-[#740606]",
};

export function orderStatusClass(status: string | undefined | null): string {
    const key = (status ?? "").toLowerCase();
    return STATUS_CLASS[key] ?? "bg-[#E8EEF2] text-[#334155]";
}
