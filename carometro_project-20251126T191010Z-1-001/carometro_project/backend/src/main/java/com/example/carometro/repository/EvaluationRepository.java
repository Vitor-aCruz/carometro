package com.example.carometro.repository;

import com.example.carometro.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    // Últimas 5 avaliações (SQLite compatível)
    @Query(value = "SELECT * FROM evaluation WHERE student_id = :studentId ORDER BY date_time DESC LIMIT 5", nativeQuery = true)
    List<Evaluation> findLast5ByStudentId(@Param("studentId") Long studentId);

    // Todas avaliações ordenadas
    List<Evaluation> findByStudentIdOrderByDateTimeDesc(Long studentId);
}
