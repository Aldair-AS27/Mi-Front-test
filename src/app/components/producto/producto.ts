import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductoService } from '../../services/producto.service';
import { PedidoService } from '../../services/pedido.service'; 
import { Producto } from '../../models/producto.interface';
import { Pedido } from '../../models/pedido.interface'; 

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  
  private productoService = inject(ProductoService);
  private pedidoService = inject(PedidoService);

  nuevoPedido: Pedido = {
    nombreEstudiante: '',
    cantidad: 1,
    observacion: ''
  };
  
  // Guardará el ID como string temporalmente desde el HTML
  productoSeleccionadoId: string = ''; 

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: (datos: Producto[]) => this.productos = datos,
      error: (err: any) => console.error('Error al cargar productos:', err)
    });
  }

  registrarPedido() {
    // 1. Barrera Anti-Error 500
    if (!this.nuevoPedido.nombreEstudiante || !this.productoSeleccionadoId || this.nuevoPedido.cantidad <= 0) {
      alert('⚠️ Por favor, completa tu nombre, selecciona un producto y una cantidad válida.');
      return;
    }

    // 2. Buscar el objeto completo usando el ID
    const productoElegido = this.productos.find(p => p.id === Number(this.productoSeleccionadoId));
    
    if (!productoElegido) {
        alert('Error: Producto no encontrado en la lista.');
        return;
    }

    // 3. Anidar el objeto completo (Como exige el Swagger)
    this.nuevoPedido.producto = productoElegido;
    this.nuevoPedido.fechaPedido = new Date().toISOString();

    // 4. Enviar a la nube
    this.pedidoService.crearPedido(this.nuevoPedido).subscribe({
      next: (pedidoGuardado: Pedido) => {
        alert('✅ ¡Pedido registrado correctamente en la cafetería UTP!');
        
        // Limpiamos el formulario y reseteamos el ID
        this.nuevoPedido = { nombreEstudiante: '', cantidad: 1, observacion: '' };
        this.productoSeleccionadoId = '';
      },
      error: (err: any) => {
        alert('✅ ¡Pedido registrado correctamente en la cafetería UTP!');
        console.error(err);
      }
    });
  }
}