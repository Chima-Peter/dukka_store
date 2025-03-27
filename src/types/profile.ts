export interface OrdersType {
    order_id: string;
    date: string;
    items: number;
    amount: number;
    status: string
}


export interface MessagesType {
    header: string,
    message: string,
    time: string,
    hasRead: boolean,
}


export interface SingleOrderTemplateType {
    order: OrdersType;
    index?: number;
    tracker?: number
}