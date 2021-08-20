package edu.usco.Colegio.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Agenda {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private String date;
        private String start_time;
        private String end_time;
        @ManyToOne
        @JoinColumn(name = "salon_id")
        private Salon salon;
        @ManyToOne
        @JoinColumn(name = "curso_id")
        private Curso curso;
}
