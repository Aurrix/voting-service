package com.atea.servicenow.votingservice.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConf {
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOrigins("*")
            .allowedHeaders(
                "Authorization",
                "Cache-Control",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Headers",
                "Origin")
            .exposedHeaders(
                "Access-Control-Expose-Headers",
                "Authorization",
                "Cache-Control",
                "Content-Type",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Headers",
                "Origin")
            .allowedMethods("PUT", "GET", "POST", "DELETE", "OPTIONS");
      }
    };
  }
}
