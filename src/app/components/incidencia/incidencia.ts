import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../models/incidencia.interface';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencia.html',
})
export class IncidenciaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  private incidenciaService = inject(IncidenciaService);

  // CORRECCIÓN 1: Eliminamos el id: 0. Solo enviamos lo que el backend realmente espera
  nuevaIncidencia: Incidencia = {
    aula: '',
    equipo: '',
    tipo: '',
    descripcion: '',
    estado: 'PENDIENTE'
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

    // CORRECCIÓN 2: Eliminamos la generación manual de la fecha.
    // Dejamos que la base de datos se encargue de eso.

    this.incidenciaService.crearIncidencia(this.nuevaIncidencia).subscribe({
      next: () => {
        alert('✅ Incidencia registrada correctamente en la base de datos.');
        this.cargarIncidencias();
        
        // CORRECCIÓN 3: Eliminamos el id: 0 también en la limpieza del formulario
        this.nuevaIncidencia = { 
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