import type { OrderSummary } from "@/types/api";
import type { OrdersType } from "@/types/profile";

export function toOrdersType(order: OrderSummary): OrdersType {
    return {
        id: order.id,
        order_number: order.order_number,
        date: order.created_at,
        items: order.quantity,
        amount: Number(order.amount ?? 0),
        status: order.status,
        name: order.name,
    };
}
