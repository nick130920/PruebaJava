package edu.usco.Colegio.controller;


import edu.usco.Colegio.dto.Mensaje;
import edu.usco.Colegio.dto.AgendaDto;
import edu.usco.Colegio.entity.Agenda;
import edu.usco.Colegio.service.AgendaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agenda")
@CrossOrigin(origins = "http://localhost:4200")
public class AgendaController {

    @Autowired
    AgendaService agendaService;

    @GetMapping("/list")
    public ResponseEntity<List<Agenda>> list(){
        List<Agenda> list= agendaService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Agenda> getById(@PathVariable("id") int id){
        if(!agendaService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe id"), HttpStatus.NOT_FOUND);
        Agenda agenda = agendaService.getOne(id).get();
        return new ResponseEntity(agenda, HttpStatus.OK);
    }
    @GetMapping("/detail/salon/{id}")
    public ResponseEntity<Agenda> getBySalonId(@PathVariable("id") int id){
        if(!agendaService.existsBySalonId(id))
            return new ResponseEntity(new Mensaje("No existe salon con id"), HttpStatus.NOT_FOUND);
        Agenda agenda = agendaService.getBySalonId(id).get();
        return new ResponseEntity(agenda, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody AgendaDto agendaDto){
        if(StringUtils.isBlank(agendaDto.getDate()))
            return  new ResponseEntity(new Mensaje("La fecha es obligatoria"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(agendaDto.getStart_time()))
            return  new ResponseEntity(new Mensaje("La hora de inicio es obligatoria"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(agendaDto.getEnd_time()))
            return  new ResponseEntity(new Mensaje("La hora de fin es obligatoria"), HttpStatus.BAD_REQUEST);
        /*if(agendaDto.getSalon_id()<= 0)
            return  new ResponseEntity(new Mensaje("Debe elegir un Salon"), HttpStatus.BAD_REQUEST);
        if (agendaDto.getCurso_id() <= 0)
            return new ResponseEntity(new Mensaje("Debe elegir un Curso"), HttpStatus.BAD_REQUEST);*/
        Agenda agenda = new Agenda(null,agendaDto.getDate(), agendaDto.getStart_time(), agendaDto.getEnd_time(), agendaDto.getSalon(), agendaDto.getCurso());
        agendaService.save(agenda);
        return new ResponseEntity(new Mensaje("Agenda Creada"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody AgendaDto agendaDto){
        if(!agendaService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe Agenda con ese id"), HttpStatus.NOT_FOUND);
        if (agendaService.existsByDate(agendaDto.getDate()) && agendaService.getByDate(agendaDto.getDate()).get().getId() != id)
            return new ResponseEntity(new Mensaje("No existe agenda con esa fecha y id"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(agendaDto.getDate()))
            return  new ResponseEntity(new Mensaje("La Fecha es obligatoria."), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(agendaDto.getStart_time()))
            return  new ResponseEntity(new Mensaje("La hora de inicio es obligatoria."), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(agendaDto.getEnd_time()))
            return  new ResponseEntity(new Mensaje("La hora de fin es obligatoria."), HttpStatus.BAD_REQUEST);
        /*if(agendaDto.getSalon_id() <= 0)
            return  new ResponseEntity(new Mensaje("Debe elegir un Salón."), HttpStatus.BAD_REQUEST);
        if(agendaDto.getCurso_id() <= 0)
            return  new ResponseEntity(new Mensaje("Debe elegir un Curso."), HttpStatus.BAD_REQUEST);*/

        Agenda agenda = agendaService.getOne(id).get();
        agenda.setDate(agendaDto.getDate());
        agenda.setStart_time(agendaDto.getStart_time());
        agenda.setEnd_time(agendaDto.getEnd_time());
        agendaService.save(agenda);

        return new ResponseEntity(new Mensaje("Agenda Actualizada"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!agendaService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe la Agenda"), HttpStatus.NOT_FOUND);
        agendaService.delete(id);
        return new ResponseEntity(new Mensaje("Agenda Eliminado"), HttpStatus.OK);
    }
}
