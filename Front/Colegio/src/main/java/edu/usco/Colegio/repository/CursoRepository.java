package edu.usco.Colegio.repository;

import edu.usco.Colegio.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Integer> {

    Optional<Curso> findByName(String name);
    boolean existsByName(String name);

    Optional<Curso> findByCode(String code);
    boolean existsByCode(String code);
}
