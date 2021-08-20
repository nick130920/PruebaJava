package edu.usco.Colegio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

    @NotBlank
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String password;
}
