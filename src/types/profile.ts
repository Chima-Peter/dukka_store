export interface OrdersType {
    id: string;
    order_number: string;
    date: string;
    items: number;
    amount: number;
    status: string;
    name?: string | null;
    market_id?: string;
}

export interface MessagesType {
    header: string;
    message: string;
    time: string;
    hasRead: boolean;
}

export interface SingleOrderTemplateType {
    order: OrdersType;
    index?: number;
    tracker?: number;
}
