package com.memedb.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.Tag;
import com.memedb.domains.User;



@Service
public interface TagService {
	
	public Page<Tag> findAll(Pageable pageable);
	public Tag create(Tag Tag);
	public Tag update(Tag Tag);
	public Tag findByName(String name);
	public Tag findById(Integer id);
	public List<Tag> findAllByNameIgnoreCaseContainingAndUser(String Tag,User user);
	public List<Tag> findByUser(User user);
	
	
} 
