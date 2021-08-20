package edu.usco.Colegio.dto;

import edu.usco.Colegio.entity.Curso;
import edu.usco.Colegio.entity.Salon;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.lang.String;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendaDto {

    @NotBlank
    private String date;
    @NotBlank
    private String start_time;
    private String end_time;
    private Salon salon;
    private Curso curso;
}
