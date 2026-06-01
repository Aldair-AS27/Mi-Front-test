import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula.interface';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  // Asumo esta URL basándome en tu CursoService. ¡Cámbiala si es diferente!
  private apiUrl = 'https://grupaso5-1.onrender.com/api/matriculas';

  constructor(private http: HttpClient) {}

  obtenerMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  crearMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, matricula);
  }
}