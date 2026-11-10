import addCommasToInt from "@/utils/add_commas_to_int";

export function formatMoney(
    amount: string | number | null | undefined,
    currency?: string | null,
): string {
    const value = Number(amount ?? 0);
    const formatted = addCommasToInt(Number.isFinite(value) ? value : 0);
    const code = currency?.toUpperCase();

    if (!code || code === "NGN") {
        return `₦${formatted}`;
    }

    return `${code} ${formatted}`;
}
