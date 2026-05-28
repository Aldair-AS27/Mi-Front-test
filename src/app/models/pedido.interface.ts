import { Producto } from './producto.interface';

export interface Pedido {
    id?: number;
    nombreEstudiante: string;
    cantidad: number;
    observacion: string;
    fechaPedido?: string;
    producto?: Producto; // Nota cómo se anida el producto completo aquí
}