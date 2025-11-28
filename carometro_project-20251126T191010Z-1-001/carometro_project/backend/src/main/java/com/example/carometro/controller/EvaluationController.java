package com.example.carometro.controller;

import com.example.carometro.model.Evaluation;
import com.example.carometro.model.Student;
import com.example.carometro.repository.EvaluationRepository;
import com.example.carometro.repository.StudentRepository;
import com.example.carometro.security.TokenStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    @Autowired private EvaluationRepository repo;
    @Autowired private StudentRepository studentRepo;
    @Autowired private TokenStore tokenStore;

    // Criar avaliação
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Evaluation ev, @RequestHeader(value="X-Auth-Token", required=false) String token){
        String username = tokenStore.getUsername(token);
        if(username==null) return ResponseEntity.status(401).body("unauthenticated");

        Student s = studentRepo.findById(ev.getStudent().getId()).orElse(null);
        if(s==null) return ResponseEntity.badRequest().body("invalid student");

        ev.setStudent(s);
        ev.setEvaluator(username);
        ev.setDateTime(LocalDateTime.now());
        return ResponseEntity.ok(repo.save(ev));
    }

    // Últimas 5 avaliações de um aluno
    @GetMapping("/student/{studentId}/last5")
    public List<Evaluation> last5(@PathVariable Long studentId){
        return repo.findLast5ByStudentId(studentId);
    }

    // Todas avaliações de um aluno
    @GetMapping("/student/{studentId}")
    public List<Evaluation> allByStudent(@PathVariable Long studentId){
        return repo.findByStudentIdOrderByDateTimeDesc(studentId);
    }
}
