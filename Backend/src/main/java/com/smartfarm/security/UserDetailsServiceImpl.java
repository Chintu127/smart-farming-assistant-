package com.smartfarm.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smartfarm.entity.User;
import com.smartfarm.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService
{    
	
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		User user= userRepository.findByUsername(username).orElseThrow(()->
		new UsernameNotFoundException("user not found"));
		
		return new org.springframework.security.core.userdetails.User(
				user.getUsername() , 
				user.getPassword() , 
				Collections.singleton(new 
				SimpleGrantedAuthority("ROLE_" + user.getRole())));
				
	}

}
