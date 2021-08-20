package edu.usco.Colegio.repository;

import edu.usco.Colegio.entity.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SalonRepository extends JpaRepository<Salon, Integer> {
    Optional<Salon> findByName(String name);
    boolean existsByName(String name);
}
