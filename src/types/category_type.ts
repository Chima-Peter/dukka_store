import { DetailsType } from "./cart_type";

export interface ProductType {
    name: string;
}

export interface SubCategoryType {
    name: string;
    products: ProductType[]
}

export interface CategoryType {
    category: string;
    subcategories: SubCategoryType[]
}

export interface ByCategoryTypes {
    header: string;
    text?: string;
    caller: string;
    link?: string;
    details: DetailsType[]
}