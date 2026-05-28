import { Curso } from './curso.interface';

export interface Matricula {
    id?: number;
    nombreEstudiante: string;
    codigoEstudiante: string;
    turno: string;
    fechaMatricula?: string;
    curso?: Curso; // <-- El curso anidado completo
}