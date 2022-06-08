import { RegisterUser } from "../register-user";

export interface ResponseProfile{
    success: boolean;
    message: string;
    user: RegisterUser
}
export interface ResponseAllUsers{
    success: boolean;
    message: string;
    users: RegisterUser[]
}