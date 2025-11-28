package com.example.carometro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.*;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    // @Override
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {
    //     Path uploadPath = Paths.get(uploadDir);
    //     String uploadAbsolute = uploadPath.toFile().getAbsolutePath();
    //     registry.addResourceHandler("/uploads/**")
    //             .addResourceLocations("file:" + uploadAbsolute + "/");
    // }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
            .addResourceLocations("file:" + Paths.get("").toAbsolutePath().toString() + "/uploads/");
    }

}
