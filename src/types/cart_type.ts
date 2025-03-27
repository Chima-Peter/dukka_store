export interface CartProductTypes {
    name: string;
    image: string;
    price: number;
    quantity: number;
    discount?: number;
    tax?: number;
}

export interface CartTypes {
    cart: CartProductTypes[];
    total?: number;
}



export interface DetailsType {
    image: string;
    title: string;
    price: string;
    changeGrid?: string
    profile?: boolean
}