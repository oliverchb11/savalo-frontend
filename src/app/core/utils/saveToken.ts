import { RegisterUser } from "src/app/interfaces/register-user";

export const saveToken = (token: string, user: RegisterUser) =>{
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}