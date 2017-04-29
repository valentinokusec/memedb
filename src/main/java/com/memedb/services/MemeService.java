package com.memedb.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.Meme;



@Service
public interface MemeService {
	
	public Page<Meme> findAll(Pageable pageable);
	public Meme create(Meme Meme);
	public Meme update(Meme Meme);
	public Meme findByName(String name);
	public Meme findById(Integer id);
	
	
} 
