import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.interface'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://grupaso5-1.onrender.com/api/productos';

  constructor(private http: HttpClient) { }

  // El GET que ya tenías para listar
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // EL MÉTODO QUE FALTA: Agrégalo completo aquí abajo
  crearProducto(nuevoProducto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, nuevoProducto);
  }
}