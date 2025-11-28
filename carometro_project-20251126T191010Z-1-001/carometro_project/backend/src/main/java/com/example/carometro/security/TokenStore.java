package com.example.carometro.security;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

@Component
public class TokenStore {
    private ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
    public String createToken(String username){
        String t = UUID.randomUUID().toString();
        map.put(t, username);
        return t;
    }
    public String getUsername(String token){
        return map.get(token);
    }
    public void revoke(String token){ map.remove(token); }
}
