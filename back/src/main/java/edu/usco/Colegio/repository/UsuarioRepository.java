package edu.usco.Colegio.repository;

import edu.usco.Colegio.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByName(String name);
    boolean existsByName(String name);

    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}
