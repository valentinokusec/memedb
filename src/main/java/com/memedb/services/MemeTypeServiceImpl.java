package com.memedb.services;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.memedb.domains.MemeType;
import com.memedb.repository.MemeTypeRepository;




@Service("MemeTypeService")
public class MemeTypeServiceImpl implements MemeTypeService{

	@Resource
	private MemeTypeRepository memeTypeRepository;

	@Override
	public Page<MemeType> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return memeTypeRepository.findAll(pageable);
	}

	@Override
	public MemeType create(MemeType MemeType) {
		// TODO Auto-generated method stub
		return memeTypeRepository.save(MemeType);
	}

	@Override
	public MemeType update(MemeType MemeType) {
		// TODO Auto-generated method stub
		return memeTypeRepository.save(MemeType);
	}

	@Override
	public MemeType findByName(String name) {
		// TODO Auto-generated method stub
		return memeTypeRepository.findByName(name);
	}

	@Override
	public MemeType findById(Integer id) {
		// TODO Auto-generated method stub
		return memeTypeRepository.findOne(id);
	}

	
	
			
}
