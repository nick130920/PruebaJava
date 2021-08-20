import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number },
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.initFormUsuario();
    this.cargarDatosEdicion();
  }

  initFormUsuario() {
    this.formUsuario = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      email: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      teacher: new FormControl(0, [Validators.required])
    })
  }

  public operar() {

    let usuario: Usuario = new Usuario();
    usuario.email = this.formUsuario.value['email'];
    usuario.name = this.formUsuario.value['name'];
    usuario.teacher = this.formUsuario.value['teacher'];

    if (this.data.id != 0) {
      usuario.id = this.data.id;
      this.usuarioService.update(usuario.id, usuario).pipe(switchMap(() => {
        return this.usuarioService.list();
      })).subscribe(res => {
        this.usuarioService.setUsuarioCambio(res);
        this.usuarioService.setMensajeCambio("Se actualizo el UsuarioformUsuario.");
        this.dialogRef.close(true);
      });
    }
    else {
      this.usuarioService.save(usuario).pipe(switchMap(() => {
        return this.usuarioService.list();
      })).subscribe(data => {
        this.usuarioService.setUsuarioCambio(data);
        this.dialogRef.close(true);
        this.usuarioService.setMensajeCambio("Se creo el usuario.");
      });
    }
  }
  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.usuarioService.detail(this.data.id).subscribe(res => {
        this.formUsuario.setValue({
          id: res.id,
          email: res.email,
          name: res.name,
          teacher: res.teacher,
        })
      })
    }
  }

}
