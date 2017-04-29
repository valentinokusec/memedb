package com.memedb.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.MemeType;



@Service
public interface MemeTypeService {
	
	public Page<MemeType> findAll(Pageable pageable);
	public MemeType create(MemeType MemeType);
	public MemeType update(MemeType MemeType);
	public MemeType findByName(String name);
	public MemeType findById(Integer id);
	
	
} 
