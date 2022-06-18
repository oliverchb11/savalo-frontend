import { DataCreateArticle } from "../article/data-create-article";
import { DataOrders } from "../orders/data-orders";

export interface DataTable{
    name?: string;
    libre?: boolean;
    category?: string;
    articles?: string;
    img?:string;
    orders?: DataOrders
    position?: number;
    numeroSillas?: number;
    numeroClientes?: number;
    _id?: string
}
export interface DataTableOrder{
    name?: string;
    libre?: boolean;
    category?: string;
    articles?: DataCreateArticle[];
    img?:string;
    position?: number;
    orders: DataOrders
    numeroClientes?: number;
    _id?: string
}