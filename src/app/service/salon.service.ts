import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Agenda } from '../models/agenda';
import { Salon } from '../models/salon';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  salonURL = 'http://localhost:8080/salon/'
  agendaURL = 'http://localhost:8080/agenda/'
  private salonCambio = new Subject<Salon[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }
  public list(): Observable<Salon[]> {
    return this.httpClient.get<Salon[]>(this.salonURL + 'list');
  }
  public detail(id: number): Observable<Salon> {
    return this.httpClient.get<Salon>(this.salonURL + `detail/${id}`);
  }
  public save(salon: Salon): Observable<any> {
    return this.httpClient.post<any>(this.salonURL + 'create', salon);
  }
  public update(id: number, salon: Salon): Observable<any> {
    return this.httpClient.put<any>(this.salonURL + `update/${id}`, salon);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.salonURL + `delete/${id}`);
  }
  getSalonCambio() {
    return this.salonCambio.asObservable();
  }

  setSalonCambio(lista: Salon[]) {
    this.salonCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
