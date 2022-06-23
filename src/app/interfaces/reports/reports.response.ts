import { DataOrders } from "../orders/data-orders";
import { RegisterUser } from "../register-user";

export interface ReportsResponse{
    success: boolean;
    ordersDay: DataOrders[];
    count: number;
    page: number;
    pageSize: number;


}
export interface ReportsResponse2{
    success: boolean;
    ordersMoth: DataOrders[];
    count: number;
    page: number;
    pageSize: number;
}
export interface ReportsResponse3{
    success: boolean;
    ordersweek: DataOrders[];
    count: number;
    page: number;
    pageSize: number;
}
export interface ReportsResponse4{
    success: boolean;
    ordersRange: DataOrders[];
    count: number;
    page: number;
    pageSize: number;
}