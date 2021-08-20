import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarAgendaComponent } from './agenda/editar-agenda.component';
import { ListaAgendaComponent } from './agenda/lista-agenda.component';
import { EditarCursoComponent } from './curso/editar-curso.component';
import { ListaCursoComponent } from './curso/lista-curso.component';
import { EditarSalonComponent } from './salon/editar-salon.component';
import { ListaSalonComponent } from './salon/lista-salon.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';

const routes: Routes = [
  { path: '', component: ListaAgendaComponent },
  {
    path: 'agenda', component: ListaAgendaComponent, children: [
      {path: 'editar/:id', component: EditarAgendaComponent}
    ]
  },
  {
    path: 'curso', component: ListaCursoComponent, children: [
      {path: 'editar/:id', component: EditarCursoComponent}
    ]
  },
  {
    path: 'salon', component: ListaSalonComponent, children: [
      { path: 'editar/:id', component: EditarSalonComponent }
    ]
  },
  {
    path: 'usuario', component: ListaUsuarioComponent, children: [
      { path: 'editar/:id', component: EditarUsuarioComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
