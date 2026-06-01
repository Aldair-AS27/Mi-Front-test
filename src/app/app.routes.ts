import { Routes } from '@angular/router';
// Importamos tus componentes
import { Tareas } from './components/tareas/tareas'; 
import { Matriculas } from './components/matriculas/matriculas'; 
// AQUÍ ESTÁ LA CORRECCIÓN: Importamos IncidenciaComponent
import { IncidenciaComponent } from './components/incidencia/incidencia';
import { ProductoComponent } from './components/producto/producto';

export const routes: Routes = [
  { path: 'tareas', component: Tareas },
  { path: 'matriculas', component: Matriculas },
  // AQUÍ ESTÁ LA CORRECCIÓN: Usamos IncidenciaComponent
  { path: 'incidencias', component: IncidenciaComponent },
  { path: 'productos', component: ProductoComponent },
  
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: '**', redirectTo: 'tareas', pathMatch: 'full' }
];