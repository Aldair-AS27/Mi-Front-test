export interface Producto {
    id?: number; // El símbolo '?' indica que es opcional (útil al crear un producto nuevo que aún no tiene ID)
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
}