export interface dataMes{
    mesLetras: string;
    mesNumeros: number;
    totalMes: number;
}
export interface SalesMonth{
    success: boolean;
    data: dataMes[]
}