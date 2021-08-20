package edu.usco.Colegio.service;

import edu.usco.Colegio.entity.Usuario;
import edu.usco.Colegio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public List<Usuario> list(){
        return  usuarioRepository.findAll();
    }
    public Optional<Usuario> getOne(int id){
        return usuarioRepository.findById(id);
    }
    public Optional<Usuario> getByName(String name){
        return usuarioRepository.findByName(name);
    }
    public Optional<Usuario> getByEmail(String email){
        return usuarioRepository.findByEmail(email);
    }
    public void save(Usuario usuario){
        usuarioRepository.save(usuario);
    }
    public void delete(int id){
        usuarioRepository.deleteById(id);
    }
    public boolean existsById(int id){
        return usuarioRepository.existsById(id);
    }
    public boolean existsByName(String name){
        return usuarioRepository.existsByName(name);
    }
    public boolean existsByEmail(String email){
        return  usuarioRepository.existsByEmail(email);
    }
}
