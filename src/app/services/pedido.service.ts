import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://grupaso5-1.onrender.com/api/pedidos';

  constructor(private http: HttpClient) { }

  // POST: Enviar un nuevo pedido a la cafetería
  crearPedido(nuevoPedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, nuevoPedido);
  }
}