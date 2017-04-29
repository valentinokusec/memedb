package com.memedb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;


import com.memedb.domains.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByUserName(String user);

	Page<User> findAll(Pageable pageable);

}
