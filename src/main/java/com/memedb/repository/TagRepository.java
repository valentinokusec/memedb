package com.memedb.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.memedb.domains.Tag;
import com.memedb.domains.User;

public interface TagRepository extends JpaRepository<Tag, Integer> {

	public Tag findByName(String Tag);
	public List<Tag> findLimit10ByUser(User user);

	Page<Tag> findAll(Pageable pageable);
	public List<Tag> findAllByNameIgnoreCaseContainingAndUser(String Tag,User user);

}
