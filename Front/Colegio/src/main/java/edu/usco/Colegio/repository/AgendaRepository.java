package edu.usco.Colegio.repository;

import edu.usco.Colegio.entity.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Integer> {

    Optional<Agenda> findByDate(String date);
    boolean existsByDate(String date);
    Optional<Agenda> findBySalonId(int id);
    boolean existsBySalonId(int id);
}
