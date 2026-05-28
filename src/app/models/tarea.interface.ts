export interface Tarea {
    id?: number; // El símbolo '?' indica que es opcional (útil al crear una tarea nueva que aún no tiene ID)
    titulo: string;
    descripcion: string;
    estado: string;
    fechaVencimiento: string;
    curso: string;
    prioridad: string;
}