import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../models/incidencia.interface';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencia.html'
})
export class IncidenciaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  private incidenciaService = inject(IncidenciaService);

  // Objeto enlazado al formulario de la vista
  nuevaIncidencia: Incidencia = {
    id: 0, 
    aula: '',
    equipo: '',
    tipo: '',
    descripcion: '',
    estado: 'PENDIENTE' // Sincronizado con las mayúsculas del Backend
  };

  ngOnInit() {
    this.cargarIncidencias();
  }

  cargarIncidencias() {
    this.incidenciaService.obtenerIncidencias().subscribe({
      next: (datos: Incidencia[]) => this.incidencias = datos,
      error: (err: any) => console.error('Error al cargar incidencias:', err)
    });
  }

  registrar() {
    if (!this.nuevaIncidencia.aula || !this.nuevaIncidencia.equipo || !this.nuevaIncidencia.tipo || !this.nuevaIncidencia.descripcion) {
      alert('⚠️ Por favor, completa todos los campos del reporte.');
      return;
    }

    // Se asigna la estampa de tiempo actual automáticamente
    this.nuevaIncidencia.fechaRegistro = new Date().toISOString();

    this.incidenciaService.crearIncidencia(this.nuevaIncidencia).subscribe({
      next: () => {
        alert('✅ Incidencia registrada correctamente en la base de datos.');
        this.cargarIncidencias();
        
        // Inicialización de limpieza del formulario manteniendo consistencia
        this.nuevaIncidencia = { 
          id: 0, 
          aula: '', 
          equipo: '', 
          tipo: '', 
          descripcion: '', 
          estado: 'PENDIENTE' 
        };
      },
      error: (err: any) => {
        alert('❌ Error al registrar la incidencia de laboratorio.');
        console.error(err);
      }
    });
  }

  cambiarEstado(id: number | undefined, nuevoEstado: string) {
    if (!id) return;
    
    this.incidenciaService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        alert(`✅ Estado actualizado a: ${nuevoEstado}`);
        this.cargarIncidencias(); 
      },
      error: (err: any) => {
        alert('❌ Error de conexión al intentar actualizar el estado.');
        console.error(err);
      }
    });
  }
}