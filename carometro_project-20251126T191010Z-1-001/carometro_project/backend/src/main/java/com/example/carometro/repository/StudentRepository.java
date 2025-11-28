package com.example.carometro.repository;

import com.example.carometro.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByFormation(String formation);
    List<Student> findBySeries(String series);
}
