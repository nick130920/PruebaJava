package edu.usco.Colegio.controller;


import edu.usco.Colegio.dto.CursoDto;
import edu.usco.Colegio.dto.Mensaje;
import edu.usco.Colegio.entity.Curso;
import edu.usco.Colegio.service.CursoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/curso")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoController {

    @Autowired
    CursoService cursoService;

    @GetMapping("/list")
    public ResponseEntity<List<Curso>> list(){
        List<Curso> list= cursoService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Curso> getById(@PathVariable("id") int id){
        if(!cursoService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe id"), HttpStatus.NOT_FOUND);
        Curso curso = cursoService.getOne(id).get();
        return new ResponseEntity(curso, HttpStatus.OK);
    }
    @GetMapping("/detailname/{name}")
    public ResponseEntity<Curso> getByName(@PathVariable("name") String name){
        if(!cursoService.existsByName(name))
            return new ResponseEntity(new Mensaje("No existe nombre"), HttpStatus.NOT_FOUND);
        Curso curso = cursoService.getByName(name).get();
        return new ResponseEntity<Curso>(curso, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CursoDto cursoDto){
        if(StringUtils.isBlank(cursoDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(cursoDto.getDescription()))
            return  new ResponseEntity(new Mensaje("La Descripción es obligatoria"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(cursoDto.getCode()))
            return  new ResponseEntity(new Mensaje("El codigo es obligatorio"), HttpStatus.BAD_REQUEST);
        if (cursoService.existsByName(cursoDto.getName()))
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        if (cursoService.existsByCode(cursoDto.getCode()))
            return new ResponseEntity(new Mensaje("Ese codigo ya existe"), HttpStatus.BAD_REQUEST);
        Curso curso = new Curso(null,cursoDto.getName(), cursoDto.getDescription(), cursoDto.getCode());
        cursoService.save(curso);
        return new ResponseEntity(new Mensaje("Curso Creado"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody CursoDto cursoDto){
        if(!cursoService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Curso"), HttpStatus.NOT_FOUND);
        if (cursoService.existsByName(cursoDto.getName()) && cursoService.getByName(cursoDto.getName()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        if (cursoService.existsByCode(cursoDto.getCode()) && cursoService.getByCode(cursoDto.getCode()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese codigo ya existe"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(cursoDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(cursoDto.getDescription()))
            return  new ResponseEntity(new Mensaje("La Descripción es obligatoria"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(cursoDto.getCode()))
            return  new ResponseEntity(new Mensaje("El codigo es obligatorio"), HttpStatus.BAD_REQUEST);

        Curso curso = cursoService.getOne(id).get();
        curso.setName(cursoDto.getName());
        curso.setDescription(cursoDto.getDescription());
        cursoService.save(curso);

        return new ResponseEntity(new Mensaje("Curso Actualizado"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!cursoService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Curso"), HttpStatus.NOT_FOUND);
        cursoService.delete(id);
        return new ResponseEntity(new Mensaje("Curso Eliminado"), HttpStatus.OK);
    }
}
