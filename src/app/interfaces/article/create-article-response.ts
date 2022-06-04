import { DataCreateArticle } from "./data-create-article";

export interface ResponseCreateArticle{
    success: boolean;
    message: string;
    articles: DataCreateArticle[];
}