import { Component, OnInit, inject } from '@angular/core';
import { TareaService } from '../../services/tarea.service'; 
import { Tarea } from '../../models/tarea.interface'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas', 
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './tareas.html',
  styleUrl: './tareas.css' 
})
export class Tareas implements OnInit {
  tareas: Tarea[] = [];
  private tareaService = inject(TareaService);

  nuevaTarea: Tarea = {
    titulo: '',
    descripcion: '',
    estado: 'Pendiente', 
    fechaVencimiento: '',
    curso: '',        
    prioridad: 'Baja' 
  };

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareaService.obtenerTareas().subscribe({
      next: (datos: Tarea[]) => {
        this.tareas = datos;
      },
      error: (err: any) => console.error(err)
    });
  }

  crear() {
    // Validación Anti-Error 500
    if (!this.nuevaTarea.titulo || !this.nuevaTarea.descripcion || !this.nuevaTarea.curso || !this.nuevaTarea.fechaVencimiento) {
      alert('⚠️ Por favor, completa todos los campos antes de guardar.');
      return; 
    }

    this.tareaService.crearTarea(this.nuevaTarea).subscribe({
      next: (tareaGuardada: Tarea) => {
        alert('✅ ¡Tarea guardada exitosamente en la nube!'); 
        this.cargarTareas(); 
        
        // Reseteo del formulario
        this.nuevaTarea = { 
            titulo: '',
            descripcion: '',
            estado: 'Pendiente',
            fechaVencimiento: '',
            curso: '',        
            prioridad: 'Baja' 
        };
      },
      error: (err: any) => {
        alert('❌ Error al guardar la tarea. Revisa la consola.');
        console.error('Error al guardar:', err);
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return; 

    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (!confirmar) return;

    this.tareaService.eliminarTarea(id).subscribe({
      next: () => {
        alert('🗑️ Tarea eliminada correctamente de la nube.');
        this.cargarTareas(); 
      },
      error: (err: any) => {
        alert('❌ Error al eliminar la tarea.');
        console.error(err);
      }
    });
  }
}