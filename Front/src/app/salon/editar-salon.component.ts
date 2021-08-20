import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Salon } from '../models/salon';
import { SalonService } from '../service/salon.service';

@Component({
  selector: 'app-editar-salon',
  templateUrl: './editar-salon.component.html',
  styleUrls: ['./editar-salon.component.css']
})
export class EditarSalonComponent implements OnInit {

  formSalon: FormGroup;
  constructor(
    private salonService: SalonService,
    private dialogRef: MatDialogRef<EditarSalonComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number },
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.initFormSalon();
    this.cargarDatosEdicion();
  }
  initFormSalon() {
    this.formSalon = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      aforo: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    })
  }

  public operar() {

    let salon: Salon = new Salon();
    salon.aforo = this.formSalon.value['aforo'];
    salon.description = this.formSalon.value['description'];
    salon.name = this.formSalon.value['name'];

    if (this.data.id != 0) {
      salon.id = this.data.id;
      this.salonService.update(salon.id, salon).pipe(switchMap(() => {
        return this.salonService.list();
      })).subscribe(res => {
        this.salonService.setSalonCambio(res);
        this.salonService.setMensajeCambio("Se actualizo el Salon.");
        this.dialogRef.close(true);
      });
    }
    else {
      this.salonService.save(salon).pipe(switchMap(() => {
        return this.salonService.list();
      })).subscribe(data => {
        this.salonService.setSalonCambio(data);
        this.dialogRef.close(true);
        this.salonService.setMensajeCambio("Se creo el salon.");
      });
    }
  }
  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.salonService.detail(this.data.id).subscribe(res => {
        this.formSalon.setValue({
          id: res.id,
          aforo: res.aforo,
          description: res.description,
          name: res.name,
        })
      })
    }
  }

}
