export const roles = (rol: string | string[]): string =>{
    switch (rol) {
        case '1':
            return 'Administrador'

        case '2':
            return 'Cajero'

        default:
            return ''
    }
}