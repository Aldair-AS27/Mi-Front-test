import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'https://grupaso5-1.onrender.com/api/cursos';

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }
}