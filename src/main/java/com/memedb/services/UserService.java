package com.memedb.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.User;



@Service
public interface UserService {
	
	public Page<User> findAll(Pageable pageable);
	public User create(User user);
	public User update(User user);
	public User findByUserName(String username);
	public User findById(Integer id);
	
	
} 
