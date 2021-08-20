import { Curso } from "./curso";
import { Salon } from "./salon";

export class Agenda {
  id?:number;
  date: string;
  start_time: string;
  end_time: string;
  salon: Salon;
  curso: Curso;
}


