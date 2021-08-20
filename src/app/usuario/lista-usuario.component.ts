import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { ModalConfirmarComponent } from '../generic/modal-confirmar.component';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { EditarUsuarioComponent } from './editar-usuario.component';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'email', 'name', 'teacher', 'Acciones'];
  dataSource: MatTableDataSource<Usuario>;

  usuario: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.getMensajeCambio();
    this.getUsuarioCambio();
  }
  openDialog(id?: number) {
    this.dialog.open(EditarUsuarioComponent, {
      disableClose: true,
      height: '550px',
      width: '700px',
      data: {
        id: id
      },
    })
  }
  applyFilter(param: string) {
    {
      this.dataSource.filter = param.trim().toLowerCase();
    }
  }
  cargarUsuarios(usuario?: any): void {
    this.usuarioService.list().subscribe(
      data => {
        this.usuario = data;
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  private getUsuarioCambio() {
    this.usuarioService.getUsuarioCambio().subscribe((data) => {
      this.cargarUsuarios(data);
    });
  }

  private getMensajeCambio() {
    this.usuarioService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }

  eliminar(id: number) {
    let dialogRef = this.dialog.open(ModalConfirmarComponent, {
      disableClose: true,
      height: "180px",
      width: "300px",
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.usuarioService.delete(id).pipe(switchMap(() => {
          return this.usuarioService.list();
        }))
          .subscribe(data => {
            this.usuarioService.setUsuarioCambio(data);
            this.usuarioService.setMensajeCambio('SE HA ELIMINADO CORRECTAMENTE');
          })
      }
    })
  }


}

