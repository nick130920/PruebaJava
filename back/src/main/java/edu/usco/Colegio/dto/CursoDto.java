package edu.usco.Colegio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CursoDto {

    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String code;
}
