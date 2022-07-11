import { DataCreateArticle } from "../article/data-create-article";
import { DataTable } from "../table/data.table";

export interface DataOrders {
    nameOrder: string;
    table: DataTable;
    articles: DataCreateArticle[];
    articles_cantidad: DataCreateArticle[];
    total: number;
    subTotal: number;
    fechaEntrega?: number;
    fechaPagado?: number;
    _id?: string;
    cajero?: string;
    metodoPago?: string;
    pedidoCancelado?: boolean;
    hourCreate?: Date;
    createdAt?: Date;
    updateAt?: Date;
    pqrs?: string;
    preparationState?: string;
}