import { DataCreateCategory } from "./data-create-category";

export interface ResponseCreateCategory{
    success: boolean;
    message: string;
    category: DataCreateCategory[];
}
export interface ResponseCreateCategoryId{
    success: boolean;
    message: string;
    category: DataCreateCategory;
}
export interface ResponseDelete{
    success: boolean;
    message: string;
}