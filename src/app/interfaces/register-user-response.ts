import { RegisterUser } from "./register-user";

export interface RegisterUserResponse {
    success: boolean;
    token: string;
    user: RegisterUser
}
