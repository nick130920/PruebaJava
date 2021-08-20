import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = 'http://localhost:8080/usuario/'
  private usuarioCambio = new Subject<Usuario[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();


  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL + 'list');
  }
  public detail(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + `detail/${id}`);
  }
  public save(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.usuarioURL + 'create', usuario);
  }
  public update(id: number, usuario: Usuario): Observable<any> {
    return this.httpClient.put<any>(this.usuarioURL + `update/${id}`, usuario);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.usuarioURL + `delete/${id}`);
  }
  getUsuarioCambio() {
    return this.usuarioCambio.asObservable();
  }

  setUsuarioCambio(lista: Usuario[]) {
    this.usuarioCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
