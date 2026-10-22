package com.smartfarm.service;

import com.smartfarm.dto.AuthResponse;
import com.smartfarm.dto.LoginRequest;
import com.smartfarm.dto.RegisterRequest;

public interface AuthService {

	AuthResponse register(RegisterRequest request);

	AuthResponse login(LoginRequest request);

}
