import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Agenda } from '../models/agenda';
import { AgendaService } from '../service/agenda.service';
import { EditarAgendaComponent } from './editar-agenda.component';
import { ModalConfirmarComponent } from '../generic/modal-confirmar.component';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrls: ['./lista-agenda.component.css']
})
export class ListaAgendaComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Date', 'StartTime', 'EndTime', 'Salon', 'Curso', 'Acciones'];
  dataSource : MatTableDataSource<Agenda>;

  agendas: Agenda[] = [];

  constructor(private agendaService: AgendaService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarAgendas();
    this.getMensajeCambio();
    this.getAgendaCambio();
  }
  openDialog(id?: number) {
    this.dialog.open(EditarAgendaComponent, {
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

  cargarAgendas(agenda?: any): void{
    this.agendaService.list().subscribe(
      data => {
        this.agendas = data;
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        console.log(err);
      }
    )
  }
  private getAgendaCambio() {
    this.agendaService.getAgendaCambio().subscribe((data) => {
      this.cargarAgendas(data);
    });
  }

  private getMensajeCambio() {
    this.agendaService.getMensajeCambio().subscribe((data) => {
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
        this.agendaService.delete(id).pipe(switchMap(() => {
          return this.agendaService.list();
        }))
          .subscribe(data => {
            this.agendaService.setAgendaCambio(data);
            this.agendaService.setMensajeCambio('SE HA ELIMINADO CORRECTAMENTE');
          })
        }
      })

  }
}
