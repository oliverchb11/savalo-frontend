import { DataTable } from "./data.table";

export interface ResponseTable{
    success: boolean;
    message: string;
    tables: DataTable[];
}
export interface ResponseTableUpdate{
    success: boolean;
    message: string;
    tables: DataTable;
}