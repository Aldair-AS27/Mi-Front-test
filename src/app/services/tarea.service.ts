import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.interface'; 

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://grupaso5-1.onrender.com/api/tareas'; // 

  constructor(private http: HttpClient) { }

  // 1. GET: Obtener todas las tareas
  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // 2. POST: Crear una tarea nueva
  crearTarea(nuevaTarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, nuevaTarea);
  }

  // 3. PUT: Actualizar una tarea (Requiere el ID en la URL)
  actualizarTarea(id: number, tareaActualizada: Tarea): Observable<Tarea> {
    // Usamos las comillas invertidas (backticks) para inyectar el ID dinámicamente en la URL
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tareaActualizada);
  }

  // 4. DELETE: Eliminar una tarea (Requiere el ID en la URL)
  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}