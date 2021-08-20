package edu.usco.Colegio.service;

import edu.usco.Colegio.entity.Curso;
import edu.usco.Colegio.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CursoService {

    @Autowired
    CursoRepository cursoRepository;

    public List<Curso> list(){
        return  cursoRepository.findAll();
    }
    public Optional<Curso> getOne(int id){
        return cursoRepository.findById(id);
    }
    public Optional<Curso> getByName(String name){
        return cursoRepository.findByName(name);
    }
    public Optional<Curso> getByCode(String code){
        return cursoRepository.findByCode(code);
    }
    public void save(Curso curso){
        cursoRepository.save(curso);
    }
    public void delete(int id){
        cursoRepository.deleteById(id);
    }
    public boolean existsById(int id){
        return cursoRepository.existsById(id);
    }
    public boolean existsByName(String name){
        return cursoRepository.existsByName(name);
    }
    public boolean existsByCode(String code){
        return  cursoRepository.existsByCode(code);
    }
}
