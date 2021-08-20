package edu.usco.Colegio.service;

import edu.usco.Colegio.entity.Agenda;
import edu.usco.Colegio.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AgendaService {

    @Autowired
    AgendaRepository agendaRepository;

    public List<Agenda> list(){
        return agendaRepository.findAll();
    }
    public Optional<Agenda> getOne(int id){
        return agendaRepository.findById(id);
    }
    public Optional<Agenda> getBySalonId(int id){
        return agendaRepository.findBySalonId(id);
    }
    public Optional<Agenda> getByDate(String date){
        return agendaRepository.findByDate(date);
    }
    public void save(Agenda agenda){
        agendaRepository.save(agenda);
    }
    public void delete(int id){
        agendaRepository.deleteById(id);
    }
    public boolean existsById(int id){
        return agendaRepository.existsById(id);
    }
    public boolean existsBySalonId(int id){
        return agendaRepository.existsBySalonId(id);
    }
    public boolean existsByDate(String date){
        return agendaRepository.existsByDate(date);
    }
}
