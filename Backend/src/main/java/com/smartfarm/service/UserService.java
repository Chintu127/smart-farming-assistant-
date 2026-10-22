package com.smartfarm.service;

import com.smartfarm.dto.UserProfileResponse;
import com.smartfarm.dto.UserProfileUpdateRequest;

public interface UserService {

	

	UserProfileResponse getUserprofile(String username);

	UserProfileResponse updateCurrentUserProfile(String username, UserProfileUpdateRequest updaterequest);

}
