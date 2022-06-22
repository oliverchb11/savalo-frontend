import { DataOrders } from "../orders/data-orders";
import { RegisterUser } from "../register-user";

export interface ReportsResponse{
    success: boolean;
    ordersDay: DataOrders[]


}
export interface ReportsResponse2{
    success: boolean;
    ordersMoth: DataOrders[]
}
export interface ReportsResponse3{
    success: boolean;
    ordersweek: DataOrders[]
}
export interface ReportsResponse4{
    success: boolean;
    ordersRange: DataOrders[]
}