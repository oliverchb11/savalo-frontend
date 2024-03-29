import { DataOrders } from "./data-orders";

export interface ResponseOrder {
    success: boolean;
    message: string;
    orders: DataOrders
    order?: DataOrders
}
export interface ResponseOrderArray {
    success: boolean;
    message: string;
    orders: DataOrders[];
}