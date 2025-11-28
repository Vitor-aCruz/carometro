package com.example.carometro.controller;

import com.example.carometro.model.Student;
import com.example.carometro.repository.StudentRepository;
import com.example.carometro.security.TokenStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private TokenStore tokenStore;

    // Caminho ABSOLUTO dentro do backend
    private static final String UPLOAD_DIR =
            Paths.get("").toAbsolutePath().toString() + "/uploads";

    // =====================================================================
    @GetMapping
    public List<Student> listAll() {
        return studentRepo.findAll();
    }

    // =====================================================================
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id) {
        return studentRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =====================================================================
    @PostMapping
    public ResponseEntity<?> createStudent(
            @RequestBody Student student,
            @RequestHeader(value = "X-Auth-Token", required = false) String token
    ) {
        String username = tokenStore.getUsername(token);
        if (username == null)
            return ResponseEntity.status(401).body("unauthenticated");

        Student saved = studentRepo.save(student);
        return ResponseEntity.ok(saved);
    }

    // =====================================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @RequestBody Student updatedData,
            @RequestHeader(value = "X-Auth-Token", required = false) String token
    ) {
        String username = tokenStore.getUsername(token);
        if (username == null)
            return ResponseEntity.status(401).body("unauthenticated");

        Student existing = studentRepo.findById(id).orElse(null);
        if (existing == null)
            return ResponseEntity.badRequest().body("invalid student");

        existing.setName(updatedData.getName());
        existing.setSeries(updatedData.getSeries());
        existing.setFormation(updatedData.getFormation());

        studentRepo.save(existing);

        return ResponseEntity.ok(existing);
    }

    // =====================================================================
    @PostMapping("/{id}/photo")
    public ResponseEntity<?> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestHeader(value = "X-Auth-Token", required = false) String token
    ) throws IOException {

        String username = tokenStore.getUsername(token);
        if (username == null)
            return ResponseEntity.status(401).body("unauthenticated");

        Student student = studentRepo.findById(id).orElse(null);
        if (student == null)
            return ResponseEntity.badRequest().body("invalid student");

        if (file.isEmpty())
            return ResponseEntity.badRequest().body("no file uploaded");

        // Cria o diretório se não existir
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        // Nome do arquivo salvo
        String fileName = id + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir, fileName);

        file.transferTo(destination);

        // Caminho público para o frontend
        String publicPath = "/uploads/" + fileName;

        student.setPhotoPath(publicPath);
        studentRepo.save(student);

        return ResponseEntity.ok(student);
    }
}
