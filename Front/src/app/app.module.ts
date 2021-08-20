import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//External
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ListaCursoComponent } from './curso/lista-curso.component';
import { EditarCursoComponent } from './curso/editar-curso.component';
import { ListaAgendaComponent } from './agenda/lista-agenda.component';
import { EditarAgendaComponent } from './agenda/editar-agenda.component';

import { ListaSalonComponent } from './salon/lista-salon.component';
import { EditarSalonComponent } from './salon/editar-salon.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';

//Material Angular
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalConfirmarComponent } from './generic/modal-confirmar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    ListaAgendaComponent,
    EditarAgendaComponent,
    ListaCursoComponent,
    EditarCursoComponent,
    ModalConfirmarComponent,
    ListaSalonComponent,
    EditarSalonComponent,
    ListaUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
