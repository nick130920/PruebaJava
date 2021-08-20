package edu.usco.Colegio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalonDto {

    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @Min(0)
    private int aforo;

}
