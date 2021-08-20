import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Agenda } from '../models/agenda';
import { Curso } from '../models/curso';
import { Salon } from '../models/salon';
import { AgendaService } from '../service/agenda.service';
import { CursoService } from '../service/curso.service';
import { SalonService } from '../service/salon.service';

@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.css']
})

export class EditarAgendaComponent implements OnInit {

  salon$: Observable<Salon[]>;
  curso$: Observable<Curso[]>;
  formAgenda: FormGroup;
  minDate: Date = new Date();
  constructor(
    private agendaService: AgendaService,
    private cursoService: CursoService,
    private salonService: SalonService,
    private dialogRef: MatDialogRef<EditarAgendaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number },
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log(new Date);
    this.initFormAgenda();
    this.listarCurso();
    this.listarSalon();
    this.cargarDatosEdicion();

  }
  initFormAgenda() {
    this.formAgenda = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      date: new FormControl(new Date()),
      startTime: new FormControl("", [Validators.required]),
      endTime: new FormControl("", [Validators.required]),
      salon: new FormControl(0, [Validators.required]),
      curso: new FormControl(0, [Validators.required]),
    })
  }
  private listarCurso(){
    this.curso$ = this.cursoService.list();
  }
  private listarSalon() {
    this.salon$ = this.salonService.list();
  }
  public operar() {

    let salon : Salon = new Salon();
    salon.id = this.formAgenda.controls['salon'].value;
    let curso : Curso = new Curso();
    curso.id = this.formAgenda.controls['curso'].value;


    let agenda: Agenda = new Agenda();
    agenda.date = moment(this.formAgenda.value['date']).format('DD/MM/YYYY');
    agenda.start_time = this.formAgenda.value['startTime'];
    agenda.end_time = this.formAgenda.value['endTime'];
    agenda.salon = salon;
    agenda.curso = curso;


    if (this.data.id != 0) {
      agenda.id = this.data.id;
      this.agendaService.update(agenda.id, agenda).pipe(switchMap(() => {
        return this.agendaService.list();
      })).subscribe(res => {
        this.agendaService.setAgendaCambio(res);
        this.agendaService.setMensajeCambio("Se actualizo la agenda.");
        this.dialogRef.close(true);
      });
    }
    else {
      this.agendaService.save(agenda).pipe(switchMap(() => {
        return this.agendaService.list();
      })).subscribe(data => {
        this.agendaService.setAgendaCambio(data);
        this.dialogRef.close(true);
        this.agendaService.setMensajeCambio("Se creo en la agenda.");
      });
    }

  }

  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.agendaService.detail(this.data.id).subscribe(res => {
        this.formAgenda.setValue({
          id: res.id,
          date: moment(res.date).format('DD-MM-YYYY'),
          startTime: res.start_time,
          endTime: res.end_time,
          salon: res.salon,
          curso: res.curso,
        })
      })
    }
  }

}
