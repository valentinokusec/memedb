package com.memedb.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.memedb.domains.Meme;
import com.memedb.domains.Tag;
import com.memedb.domains.User;

public interface MemeRepository extends JpaRepository<Meme, Integer> {

	public Meme findByName(String Meme);

	Page<Meme> findAll(Pageable pageable);
	Page<Meme> findAllByUser(Pageable pageable, User user);
	Page<Meme> findAllByTags(Pageable pageable,List<Tag> tags);

}
