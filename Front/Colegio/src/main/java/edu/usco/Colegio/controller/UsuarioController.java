package edu.usco.Colegio.controller;


import edu.usco.Colegio.dto.UsuarioDto;
import edu.usco.Colegio.dto.Mensaje;
import edu.usco.Colegio.entity.Usuario;
import edu.usco.Colegio.service.UsuarioService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/list")
    public ResponseEntity<List<Usuario>> list(){
        List<Usuario> list= usuarioService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable("id") int id){
        if(!usuarioService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe id"), HttpStatus.NOT_FOUND);
        Usuario usuario = usuarioService.getOne(id).get();
        return new ResponseEntity(usuario, HttpStatus.OK);
    }
    @GetMapping("/detailname/{name}")
    public ResponseEntity<Usuario> getByName(@PathVariable("name") String name){
        if(!usuarioService.existsByName(name))
            return new ResponseEntity(new Mensaje("No existe nombre"), HttpStatus.NOT_FOUND);
        Usuario usuario = usuarioService.getByName(name).get();
        return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UsuarioDto usuarioDto){
        if(StringUtils.isBlank(usuarioDto.getEmail()))
            return  new ResponseEntity(new Mensaje("El correo es obligatorio"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(usuarioDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(usuarioDto.getPassword()))
            return  new ResponseEntity(new Mensaje("La contraseña es obligatoria"), HttpStatus.BAD_REQUEST);

        if (usuarioService.existsByName(usuarioDto.getName()))
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);

        Usuario usuario = new Usuario(null,usuarioDto.getEmail(), usuarioDto.getName(), usuarioDto.getPassword());
        usuarioService.save(usuario);
        return new ResponseEntity(new Mensaje("Usuario Creado"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody UsuarioDto usuarioDto){
        if(!usuarioService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Usuario"), HttpStatus.NOT_FOUND);
        if (usuarioService.existsByName(usuarioDto.getName()) && usuarioService.getByName(usuarioDto.getName()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        if (usuarioService.existsByEmail(usuarioDto.getEmail()) && usuarioService.getByEmail(usuarioDto.getEmail()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese email ya existe"), HttpStatus.BAD_REQUEST);

        if(StringUtils.isBlank(usuarioDto.getName()))
            return  new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(usuarioDto.getPassword()))
            return  new ResponseEntity(new Mensaje("La Contraseña es obligatoria"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(usuarioDto.getEmail()))
            return  new ResponseEntity(new Mensaje("El email es obligatorio"), HttpStatus.BAD_REQUEST);

        Usuario usuario = usuarioService.getOne(id).get();
        usuario.setName(usuarioDto.getName());
        usuario.setPassword(usuarioDto.getPassword());
        usuarioService.save(usuario);

        return new ResponseEntity(new Mensaje("Usuario Actualizado"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!usuarioService.existsById(id))
            return new ResponseEntity(new Mensaje("No existe el Usuario"), HttpStatus.NOT_FOUND);
        usuarioService.delete(id);
        return new ResponseEntity(new Mensaje("Usuario Eliminado"), HttpStatus.OK);
    }
}
