import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { ModalConfirmarComponent } from '../generic/modal-confirmar.component';
import { Agenda } from '../models/agenda';
import { Salon } from '../models/salon';
import { AgendaService } from '../service/agenda.service';
import { SalonService } from '../service/salon.service';
import { EditarSalonComponent } from './editar-salon.component';

@Component({
  selector: 'app-lista-salon',
  templateUrl: './lista-salon.component.html',
  styleUrls: ['./lista-salon.component.css']
})
export class ListaSalonComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'aforo', 'description', 'name', 'Acciones'];
  dataSource: MatTableDataSource<Salon>;

  salon: Salon[] = [];
  agenda: Agenda[] = [];

  constructor(
    private salonService: SalonService,
    private agendaService: AgendaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarSalones();
    this.cargarAgenda();
    this.getMensajeCambio();
    this.getSalonCambio();

  }

  openDialog(id?: number) {
    this.dialog.open(EditarSalonComponent, {
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

  cargarSalones(salon?: any): void {
    this.salonService.list().subscribe(
      data => {
        this.salon = data;
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        console.log(err);
      }
    )
  }
  cargarAgenda(agenda?: any): void {
    this.agendaService.list().subscribe(
      data => {
        this.agenda = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  private getSalonCambio() {
    this.salonService.getSalonCambio().subscribe((data) => {
      this.cargarSalones(data);
    });
  }

  private getMensajeCambio() {
    this.salonService.getMensajeCambio().subscribe((data) => {
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
        this.salonService.delete(id).pipe(switchMap(() => {
          return this.salonService.list();
        }))
          .subscribe(data => {
            this.salonService.setSalonCambio(data);
            this.salonService.setMensajeCambio('SE HA ELIMINADO CORRECTAMENTE');
          })
      }
    })
  }

}
