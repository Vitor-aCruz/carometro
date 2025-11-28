package com.example.carometro.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final TokenStore tokenStore;

    public TokenFilter(TokenStore tokenStore){
        this.tokenStore = tokenStore;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader("X-Auth-Token");
        if(token != null && tokenStore.getUsername(token) != null){
            // we could set security context here; for simplicity controllers read token directly
        }
        filterChain.doFilter(request, response);
    }
}
