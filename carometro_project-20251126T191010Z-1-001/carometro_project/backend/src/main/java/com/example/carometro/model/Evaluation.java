package com.example.carometro.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Evaluation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    private int assiduidade;
    private int participacao;
    private int responsabilidade;
    private int sociabilidade;
    private String observation;
    private String evaluator;
    private LocalDateTime dateTime;

    public Evaluation() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public int getAssiduidade() { return assiduidade; }
    public void setAssiduidade(int assiduidade) { this.assiduidade = assiduidade; }
    public int getParticipacao() { return participacao; }
    public void setParticipacao(int participacao) { this.participacao = participacao; }
    public int getResponsabilidade() { return responsabilidade; }
    public void setResponsabilidade(int responsabilidade) { this.responsabilidade = responsabilidade; }
    public int getSociabilidade() { return sociabilidade; }
    public void setSociabilidade(int sociabilidade) { this.sociabilidade = sociabilidade; }
    public String getObservation() { return observation; }
    public void setObservation(String observation) { this.observation = observation; }
    public String getEvaluator() { return evaluator; }
    public void setEvaluator(String evaluator) { this.evaluator = evaluator; }
    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }
}
