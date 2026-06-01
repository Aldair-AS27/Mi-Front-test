import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatriculaService } from '../../services/matricula.service';
import { CursoService } from '../../services/curso.service';
import { Matricula } from '../../models/matricula.interface';
import { Curso } from '../../models/curso.interface';

@Component({
  selector: 'app-matriculas',
  standalone: true, // Asegura que es standalone
  imports: [CommonModule, FormsModule], // Necesarios para *ngFor, *ngIf y ngModel
  templateUrl: './matriculas.html',
  styleUrl: './matriculas.css',
})
export class Matriculas implements OnInit {
  listaMatriculas: Matricula[] = [];
  listaCursos: Curso[] = [];
  
  // Objeto para el formulario
  nuevaMatricula: Matricula = {
    nombreEstudiante: '',
    codigoEstudiante: '',
    turno: ''
  };
  
  // Guardaremos el ID del curso seleccionado en el combo box
  cursoSeleccionadoId: number | null = null;

  constructor(
    private matriculaService: MatriculaService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarMatriculas();
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe({
      next: (cursos) => this.listaCursos = cursos,
      error: (err) => console.error('Error al cargar cursos', err)
    });
  }

  cargarMatriculas(): void {
    this.matriculaService.obtenerMatriculas().subscribe({
      next: (matriculas) => this.listaMatriculas = matriculas,
      error: (err) => console.error('Error al cargar matrículas', err)
    });
  }

  registrarMatricula(): void {
    // Buscar el objeto curso completo basado en el ID seleccionado
    const cursoAsignado = this.listaCursos.find(c => c.id === Number(this.cursoSeleccionadoId));
    
    if (!cursoAsignado) {
      alert('Por favor, selecciona un curso válido.');
      return;
    }

    // Añadir el curso y la fecha actual antes de enviar
    this.nuevaMatricula.curso = cursoAsignado;
    this.nuevaMatricula.fechaMatricula = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    this.matriculaService.crearMatricula(this.nuevaMatricula).subscribe({
      next: (res) => {
        alert('Matrícula registrada con éxito');
        this.cargarMatriculas(); // Recargar la tabla
        this.limpiarFormulario();
      },
      error: (err) => console.error('Error al crear matrícula', err)
    });
  }

  limpiarFormulario(): void {
    this.nuevaMatricula = { nombreEstudiante: '', codigoEstudiante: '', turno: '' };
    this.cursoSeleccionadoId = null;
  }
}