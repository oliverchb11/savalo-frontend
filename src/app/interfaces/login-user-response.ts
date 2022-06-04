import { RegisterUser } from "./register-user";

export interface LoginUserResponse {
    success: boolean;
    token: string;
    message?: string;
    user: RegisterUser
}
