package com.memedb.services;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.Meme;
import com.memedb.domains.Tag;
import com.memedb.domains.User;
import com.memedb.repository.MemeRepository;




@Service("MemeService")
public class MemeServiceImpl implements MemeService{

	@Resource
	private MemeRepository memeRepository;

	@Override
	public Page<Meme> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return memeRepository.findAll(pageable);
	}

	@Override
	public Meme create(Meme Meme) {
		// TODO Auto-generated method stub
		return memeRepository.save(Meme);
	}

	@Override
	public Meme update(Meme Meme) {
		// TODO Auto-generated method stub
		return memeRepository.save(Meme);
	}

	@Override
	public Meme findByName(String name) {
		// TODO Auto-generated method stub
		return memeRepository.findByName(name);
	}

	@Override
	public Meme findById(Integer id) {
		// TODO Auto-generated method stub
		return memeRepository.findOne(id);
	}

	@Override
	public Page<Meme> findAllByTags(Pageable pageable, List<Tag> tags) {
		// TODO Auto-generated method stub
		return memeRepository.findAllByTags(pageable, tags);
	}

	@Override
	public Page<Meme> findAllByUser(Pageable pageable, User user) {
		// TODO Auto-generated method stub
		return memeRepository.findAllByUser(pageable, user);
	}

	
	
	
			
}
