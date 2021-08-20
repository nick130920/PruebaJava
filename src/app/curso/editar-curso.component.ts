import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Curso } from '../models/curso';
import { CursoService } from '../service/curso.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  formCurso: FormGroup;

  constructor(
    private cursoService: CursoService,
    private dialogRef: MatDialogRef<EditarCursoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number },
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.initFormCurso();
    this.cargarDatosEdicion();
  }

  initFormCurso() {
    this.formCurso = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required])
    })
  }
  public operar() {

    let curso: Curso = new Curso();
    curso.code = this.formCurso.value['code'];
    curso.description = this.formCurso.value['description'];
    curso.name = this.formCurso.value['name'];

    if (this.data.id != 0) {
      curso.id = this.data.id;
      this.cursoService.update(curso.id, curso).pipe(switchMap(() => {
        return this.cursoService.list();
      })).subscribe(res => {
        this.cursoService.setCursoCambio(res);
        this.cursoService.setMensajeCambio("Se actualizo el Curso.");
        this.dialogRef.close(true);
      });
    }
    else {
      this.cursoService.save(curso).pipe(switchMap(() => {
        return this.cursoService.list();
      })).subscribe(data => {
        this.cursoService.setCursoCambio(data);
        this.dialogRef.close(true);
        this.cursoService.setMensajeCambio("Se creo el curso.");
      });
    }
  }
  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.cursoService.detail(this.data.id).subscribe(res => {
        this.formCurso.setValue({
          id: res.id,
          code: res.code,
          description: res.description,
          name: res.name,
        })
      })
    }
  }
}
