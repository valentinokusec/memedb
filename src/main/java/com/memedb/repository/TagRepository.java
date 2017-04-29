package com.memedb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;


import com.memedb.domains.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

	public Tag findByName(String Tag);

	Page<Tag> findAll(Pageable pageable);

}
