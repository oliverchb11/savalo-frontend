import { DataCreateArticle } from "./data-create-article";

export interface ResponseCreateArticle{
    success: boolean;
    message: string;
    articles: DataCreateArticle[];
}
export interface ResponseUpdateArticle{
    success: boolean;
    message: string;
    article: DataCreateArticle;
}
export interface ResponseArticleId{
    success: boolean;
    message: string;
    article: DataCreateArticle;
}
export interface ResponseArticleDelete{
    success: boolean;
    message: string;
}