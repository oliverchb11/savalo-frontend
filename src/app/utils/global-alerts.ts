import Swal from 'sweetalert2';
import { RegisterUser } from '../interfaces/register-user';


export const successAlert = (user: RegisterUser) => {
    Swal.fire({
        title: 'Usuario Creado correctamente',
        text: `El Usuario ${user.name} ${user.firstname} fue creado correctamente`,
        icon: 'success'
    });
}
export const successAlertResetPassword = (message: string) => {
    Swal.fire({
        title: message,
        icon: 'success'
    });
}
export const successAlertGlobal = (message: string) => {
    Swal.fire({
        title: message,
        icon: 'success'
    });
}
export const successAlertLogin = () => {
    Swal.fire({
        title: 'Ingresando...',
        icon: 'success',
        showConfirmButton: false,
    });
}
export const dismissAlertLogin = () => {
    Swal.close();
}

export const errorAlert = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'error'
    });
}
export const infoAlert = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'info'
    });
}


