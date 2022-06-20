import { DataTable } from "./table/data.table";

export interface RegisterUser {
    name: string;
    firstname: string;
    age: number;
    cellphone: number;
    email: string;
    state: boolean;
    password: string;
    table?: DataTable
    rol: string | string[];
    _id?: string;
    __v? : number;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
