import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaURL= 'http://localhost:8080/agenda/';
  private agendaCambio = new Subject<Agenda[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Agenda[]>{
    return this.httpClient.get<Agenda[]>(this.agendaURL + 'list');
  }
  public detail(id: number): Observable<Agenda> {
    return this.httpClient.get<Agenda>(this.agendaURL + `detail/${id}`);
  }
  public save(agenda: Agenda): Observable<any> {
    return this.httpClient.post<any>(this.agendaURL + 'create', agenda);
  }
  public update(id:number, agenda: Agenda): Observable<any> {
    return this.httpClient.put<any>(this.agendaURL + `update/${id}`, agenda);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.agendaURL + `delete/${id}`);
  }
  getAgendaCambio() {
    return this.agendaCambio.asObservable();
  }

  setAgendaCambio(lista: Agenda[]) {
    this.agendaCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
