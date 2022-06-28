const tipoCedula = (valor) =>{
    switch (valor) {
        case '1':
            return 'Cédula Ciudadania';
        case '2':
            return 'Cédula Extranjería';
        case '3':
            return 'Pasaporte';
        case '4':
            return 'NIT';
        case '5':
            return 'Registro Civil';
    
        default:
            return ''
    }
}

export default tipoCedula;