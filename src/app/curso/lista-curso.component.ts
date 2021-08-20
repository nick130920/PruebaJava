import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { ModalConfirmarComponent } from '../generic/modal-confirmar.component';
import { Curso } from '../models/curso';
import { CursoService } from '../service/curso.service';
import { EditarCursoComponent } from './editar-curso.component';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css']
})
export class ListaCursoComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'code', 'description', 'name', 'Acciones'];
  dataSource: MatTableDataSource<Curso>;

  curso: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarCursos();
    this.getMensajeCambio();
    this.getCursoCambio();
  }
  openDialog(id?: number) {
    this.dialog.open(EditarCursoComponent, {
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
  cargarCursos(curso?: any): void {
    this.cursoService.list().subscribe(
      data => {
        this.curso = data;
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  private getCursoCambio() {
    this.cursoService.getCursoCambio().subscribe((data) => {
      this.cargarCursos(data);
    });
  }

  private getMensajeCambio() {
    this.cursoService.getMensajeCambio().subscribe((data) => {
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
        this.cursoService.delete(id).pipe(switchMap(() => {
          return this.cursoService.list();
        }))
          .subscribe(data => {
            this.cursoService.setCursoCambio(data);
            this.cursoService.setMensajeCambio('SE HA ELIMINADO CORRECTAMENTE');
          })
      }
    })
  }


}
