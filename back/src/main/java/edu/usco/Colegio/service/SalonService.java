package edu.usco.Colegio.service;


import edu.usco.Colegio.entity.Salon;
import edu.usco.Colegio.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SalonService {

    @Autowired
    SalonRepository salonRepository;

    public List<Salon> list(){
        return salonRepository.findAll();
    }
    public Optional<Salon> getOne(int id){
        return  salonRepository.findById(id);
    }
    public Optional<Salon> getByName(String name){
        return salonRepository.findByName(name);
    }
    public void save(Salon salon){
        salonRepository.save(salon);
    }
    public void delete(int id){
        salonRepository.deleteById(id);
    }
    public boolean existsById(int id){
        return salonRepository.existsById(id);
    }
    public boolean existsByName(String name){
        return salonRepository.existsByName(name);
    }
}
