package com.memedb.services;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.Tag;
import com.memedb.domains.User;
import com.memedb.repository.TagRepository;




@Service("TagService")
public class TagServiceImpl implements TagService{

	@Resource
	private TagRepository tagRepository;

	@Override
	public Page<Tag> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return tagRepository.findAll(pageable);
	}

	@Override
	public Tag create(Tag Tag) {
		// TODO Auto-generated method stub
		return tagRepository.save(Tag);
	}

	@Override
	public Tag update(Tag Tag) {
		// TODO Auto-generated method stub
		return tagRepository.save(Tag);
	}

	@Override
	public Tag findByName(String name) {
		// TODO Auto-generated method stub
		return tagRepository.findByName(name);
	}

	@Override
	public Tag findById(Integer id) {
		// TODO Auto-generated method stub
		return tagRepository.findOne(id);
	}

	@Override
	public List<Tag> findAllByNameIgnoreCaseContainingAndUser(String Tag, User user) {
		// TODO Auto-generated method stub
		return tagRepository.findAllByNameIgnoreCaseContainingAndUser(Tag, user);
	}

	@Override
	public List<Tag> findByUser(User user) {
		// TODO Auto-generated method stub
		return tagRepository.findLimit10ByUser(user);
	}

	
			
}
