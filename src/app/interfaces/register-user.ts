export interface RegisterUser {
    name: string;
    firstname: string;
    age: number;
    cellphone: number;
    email: string;
    state: boolean;
    password: string;
    rol: string | string[];
    _id?: string;
    __v? : number;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
