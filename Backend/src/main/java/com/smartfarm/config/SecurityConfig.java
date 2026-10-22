package com.smartfarm.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.smartfarm.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
//	   private final JwtAuthFilter jwtAuthFilter;
//	    private final UserDetailsService userDetailsService;
//
//	    @Bean
//	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	        http
//	            .csrf(csrf -> csrf.disable())
//	            .cors()
//	            .and()
//	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//	            .authorizeHttpRequests(auth -> auth
//	                .requestMatchers("/api/auth/**").permitAll()
//	                .requestMatchers("/api/user/**").authenticated()
//	                .requestMatchers("/api/farms/**").authenticated()
//	                .requestMatchers("/api/soils/**").authenticated()
//	                .requestMatchers("/api/inventory/**").authenticated()
//	                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//	                .requestMatchers(HttpMethod.POST,"/api/scheme").hasRole("ADMIN")
//	                .requestMatchers(HttpMethod.GET,"/api/scheme/**").hasAnyRole("FARMER" , "EXPERT" , "ADMIN")
//	                .requestMatchers("api/weather/**").hasAnyRole("FARMER" , "EXPERT" , "ADMIN")
//	                .requestMatchers("/api/expert-query/**").hasRole("FARMER")
//	                .requestMatchers("api/dashboard/**").hasRole("FARMER")
//	                .requestMatchers("/api/test/hello").authenticated()// allow login/register
//	                .anyRequest().authenticated()
//	            )
//	            .authenticationProvider(authenticationProvider())
//	            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//	        return http.build();
//	    }
//
//	    @Bean
//	    public AuthenticationProvider authenticationProvider() {
//	        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//	        provider.setUserDetailsService(userDetailsService);
//	        provider.setPasswordEncoder(passwordEncoder());
//	        return provider;
//	    }
//
//	    @Bean
//	    public PasswordEncoder passwordEncoder() {
//	        return new BCryptPasswordEncoder();
//	    }
//
//	   @Bean
//	    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
//	    {
//		   return config.getAuthenticationManager();
//	}
	
	 private final JwtAuthFilter jwtAuthFilter;
	    private final UserDetailsService userDetailsService;

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	            .csrf(csrf -> csrf.disable())
	            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/api/auth/**").permitAll()
	                .requestMatchers("/h2-console/**").permitAll()
	                .requestMatchers("/api/cropguide/all").permitAll()
	                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	                .requestMatchers("/api/user/**").authenticated()
	                .requestMatchers("/api/farms/**").authenticated()
	                .requestMatchers("/api/soils/**").authenticated()
	                .requestMatchers("/api/soil-types/**").authenticated()
	                .requestMatchers(HttpMethod.POST, "/api/scheme").hasRole("ADMIN")
	                .requestMatchers(HttpMethod.GET, "/api/scheme/**").hasAnyRole("FARMER", "EXPERT", "ADMIN")
	                .requestMatchers("/api/weather/**").authenticated()
	                .requestMatchers("/api/expert-query/**").authenticated()
	                .requestMatchers("/api/cropguide/add", "/api/cropguide/update/**", "/api/cropguide/delete/**").hasRole("ADMIN")
	                .requestMatchers(HttpMethod.POST, "/api/notifications").hasRole("ADMIN")
	                .requestMatchers(HttpMethod.GET, "/api/notifications").hasRole("FARMER")
	                .requestMatchers("/api/admin/**").hasRole("ADMIN")
	                .requestMatchers("/api/dashboard/**").hasRole("FARMER")
	                .requestMatchers("/api/test/hello").authenticated()
	                .anyRequest().authenticated()
	            )
	            .authenticationProvider(authenticationProvider())
	            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	        return http.build();
	    }

	    @Bean
	    public AuthenticationProvider authenticationProvider() {
	        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	        provider.setUserDetailsService(userDetailsService);
	        provider.setPasswordEncoder(passwordEncoder());
	        return provider;
	    }

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }

	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
	        return config.getAuthenticationManager();
	    }

	    // ✅ This method enables global CORS config
	    @Bean
         public CorsConfigurationSource corsConfigurationSource()
         {
        	 CorsConfiguration config=new CorsConfiguration();
        	 config.setAllowCredentials(true);
        	 
        	 config.setAllowedOrigins(List.of("http://localhost:3000"));
        	 config.setAllowedHeaders(List.of("*"));
        	 config.setAllowedMethods(List.of("GET" , "POST" , "PUT" , "DELETE" , "OPTIONS"));
        	 
        	 
        	 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        	 source.registerCorsConfiguration("/**", config);
        	 return source;
        	 
         }
	}
