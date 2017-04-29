package com.memedb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.memedb.domains.MemeType;

import org.springframework.data.domain.Pageable;

public interface MemeTypeRepository extends JpaRepository<MemeType, Integer> {

	public MemeType findByName(String MemeType);

	Page<MemeType> findAll(Pageable pageable);

}
