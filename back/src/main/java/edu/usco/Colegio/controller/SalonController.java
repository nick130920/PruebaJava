package edu.usco.Colegio.controller;


import edu.usco.Colegio.dto.SalonDto;
import edu.usco.Colegio.dto.Mensaje;
import edu.usco.Colegio.entity.Salon;
import edu.usco.Colegio.service.SalonService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salon")
@CrossOrigin(origins = "http://localhost:4200")
public class SalonController {

    @Autowired
    SalonService salonService;

    @GetMapping("/list")
    public ResponseEntity<List<Salon>> list(){
        List<Salon> list= salonService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Salon> getById(@PathVariable("id") int id){
        if(!salonService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe id"), HttpStatus.NOT_FOUND);
        Salon salon = salonService.getOne(id).get();
        return new ResponseEntity(salon, HttpStatus.OK);
    }
    @GetMapping("/detailname/{name}")
    public ResponseEntity<Salon> getByName(@PathVariable("name") String name){
        if(!salonService.existsByName(name))
            return new ResponseEntity(new Mensaje("No existe nombre"), HttpStatus.NOT_FOUND);
        Salon salon = salonService.getByName(name).get();
        return new ResponseEntity<Salon>(salon, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody SalonDto salonDto){
        if(StringUtils.isBlank(salonDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(salonDto.getDescription()))
            return  new ResponseEntity(new Mensaje("La Descripción es obligatoria"), HttpStatus.BAD_REQUEST);
        if(salonDto.getAforo() <= 0)
            return  new ResponseEntity(new Mensaje("El aforo debe ser mayor de cero"), HttpStatus.BAD_REQUEST);
        if (salonService.existsByName(salonDto.getName()))
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        Salon salon = new Salon(null,salonDto.getName(), salonDto.getDescription(), salonDto.getAforo());
        salonService.save(salon);
        return new ResponseEntity(new Mensaje("Salon Creado"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody SalonDto salonDto){
        if(!salonService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Salon"), HttpStatus.NOT_FOUND);
        if (salonService.existsByName(salonDto.getName()) && salonService.getByName(salonDto.getName()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(salonDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio."), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(salonDto.getDescription()))
            return  new ResponseEntity(new Mensaje("La Descripción es obligatoria."), HttpStatus.BAD_REQUEST);
        if(salonDto.getAforo() <= 0)
            return  new ResponseEntity(new Mensaje("El aforo debe ser mayor que cero."), HttpStatus.BAD_REQUEST);

        Salon salon = salonService.getOne(id).get();
        salon.setName(salonDto.getName());
        salon.setDescription(salonDto.getDescription());
        salon.setAforo(salonDto.getAforo());
        salonService.save(salon);

        return new ResponseEntity(new Mensaje("Salon Actualizado"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!salonService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Salon"), HttpStatus.NOT_FOUND);
        salonService.delete(id);
        return new ResponseEntity(new Mensaje("Salon Eliminado"), HttpStatus.OK);
    }
}
