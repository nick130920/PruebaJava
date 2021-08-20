import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoURL = 'http://localhost:8080/curso/'
  private cursoCambio = new Subject<Curso[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();



  constructor(private httpClient: HttpClient) { }
  public list(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.cursoURL + 'list');
  }
  public detail(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(this.cursoURL + `detail/${id}`);
  }
  public save(curso: Curso): Observable<any> {
    return this.httpClient.post<any>(this.cursoURL + 'create', curso);
  }
  public update(id: number, curso: Curso): Observable<any> {
    return this.httpClient.put<any>(this.cursoURL + `update/${id}`, curso);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cursoURL + `delete/${id}`);
  }
  getCursoCambio() {
    return this.cursoCambio.asObservable();
  }

  setCursoCambio(lista: Curso[]) {
    this.cursoCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
