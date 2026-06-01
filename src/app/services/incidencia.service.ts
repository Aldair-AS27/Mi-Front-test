import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidencia } from '../models/incidencia.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private apiUrl = 'https://grupaso5-1.onrender.com/api/incidencias';

  constructor(private http: HttpClient) { }

  // 1. GET: Listar todas las incidencias
  obtenerIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl);
  }

  // 2. POST: Crear una nueva incidencia
  crearIncidencia(nuevaIncidencia: Incidencia): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.apiUrl, nuevaIncidencia);
  }

  // 3. PUT: Actualizar solo el estado de la incidencia
  actualizarEstado(id: number, nuevoEstado: string): Observable<Incidencia> {
    // CORRECCIÓN: El backend espera un Map (JSON), no un string plano.
    const body = { estado: nuevoEstado }; 
    return this.http.put<Incidencia>(`${this.apiUrl}/${id}/estado`, body);
  }
}