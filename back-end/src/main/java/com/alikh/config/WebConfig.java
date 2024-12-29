package com.alikh.config;  // Adjust the package name based on your project structure

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests from Angular frontend (running on localhost:4200)
        registry.addMapping("/api/**")  // All paths starting with /api
                .allowedOrigins("http://localhost:4200")  // Allow Angular app
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow GET, POST, PUT, DELETE methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow credentials (cookies, etc.)
    }
}

