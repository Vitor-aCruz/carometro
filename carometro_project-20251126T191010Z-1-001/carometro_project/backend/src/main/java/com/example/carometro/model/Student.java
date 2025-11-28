package com.example.carometro.model;

import jakarta.persistence.*;

@Entity
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String series;
    private String formation; // FUND1, FUND2, MEDIO
   
    @Column(nullable = true)
    private String photoPath;

    public Student() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSeries() { return series; }
    public void setSeries(String series) { this.series = series; }
    
    public String getFormation() { return formation; }
    public void setFormation(String formation) { this.formation = formation; }
    
    public String getPhotoPath() { return photoPath; }
    public void setPhotoPath(String photoPath) { this.photoPath = photoPath; }
}
