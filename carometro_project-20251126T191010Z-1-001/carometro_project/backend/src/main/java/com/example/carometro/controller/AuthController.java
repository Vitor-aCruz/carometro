package com.example.carometro.controller;

import com.example.carometro.model.User;
import com.example.carometro.repository.UserRepository;
import com.example.carometro.security.TokenStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private TokenStore tokenStore;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u){
        if(userRepo.findByUsername(u.getUsername())!=null){
            return ResponseEntity.badRequest().body("username exists");
        }
        userRepo.save(u);
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u){
        User found = userRepo.findByUsername(u.getUsername());
        if(found==null || !found.getPassword().equals(u.getPassword())){
            return ResponseEntity.status(401).body("invalid");
        }
        String token = tokenStore.createToken(found.getUsername());
        return ResponseEntity.ok(java.util.Map.of("token", token, "username", found.getUsername()));
    }

}
