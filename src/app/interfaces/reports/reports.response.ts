import { DataOrders } from "../orders/data-orders";
import { RegisterUser } from "../register-user";

export interface ReportsResponse{
    success: boolean;
    ordersDay: DataOrders[]


}