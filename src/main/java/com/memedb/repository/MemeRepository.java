package com.memedb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;


import com.memedb.domains.Meme;

public interface MemeRepository extends JpaRepository<Meme, Integer> {

	public Meme findByName(String Meme);

	Page<Meme> findAll(Pageable pageable);

}
